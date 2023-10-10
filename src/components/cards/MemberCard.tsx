import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import UserImage from '../UserImage.tsx';
import Like from '../svgs/Like.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import {ManageType} from '../dialogLayout/MenteeManageDialog.tsx';
import {IProjectMember} from '../../constant/interfaces.ts';
import dataGen from '../../constant/dateGen.ts';
import Api from '../../constant/Api.ts';

import '../../styles/components/UserCard.scss';

interface IUserCard extends IProjectMember{
  leaderID?: number;
  teamID?: number;
  myID: number;
  openApplicationDialog?: (manageType: ManageType, recruitId: number, userId: number) => void;
  openFeedbackDialog?: (userId: number) => void;
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function MemberCard({userID, profileImageURL, memberLevel, nickname, position, score, like, techStacks, role, approve, recruitID, toFeedbackAt,
                      teamID, leaderID, myID, openApplicationDialog, openFeedbackDialog, setLoginDialog}: IUserCard) {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const likeQuery = useLikeQuery(id => `/api/v1/likes/user/${id}`, userID, like, isLiked);
  const {likeCount, setLike} = likeQuery;
  const liked = likeQuery.like;

  useEffect(() => {
    if (!myID || myID <= 0) return;

    Api.fetch2Json(`/api/v1/likes/check/${userID}`)
      .then(res => setIsLiked(res.check))
      .catch(() => {});
  }, []);

  function clickLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (myID === 0 && setLoginDialog) setLoginDialog(true);
    else setLike(prev => !prev);
  }

  function openDialog(e: React.MouseEvent, manageType: ManageType) {
    e.stopPropagation();

    if (openApplicationDialog)
      openApplicationDialog(manageType, recruitID, userID);
  }

  function ApproveButton() {
    if (!openApplicationDialog) return null;
    
    if (myID === leaderID) { // 내가 리더일 때
      if (userID === leaderID) return null;

      return approve ? (
        <>
          <button disabled>승인됨</button>
          <button className='cancel'
                  onClick={e => openDialog(e, ManageType.KICK)}>
            탈퇴하기
          </button>
        </>
      ) : (
        <>
          <button onClick={e => openDialog(e, ManageType.APPLY)}>
            승인하기
          </button>
          <button className='cancel'
                  onClick={e => openDialog(e, ManageType.REJECT)}>
            거절하기
          </button>
        </>
      );
    }

    return myID === userID ? (
      <button disabled>승인됨</button>
      // <button className='cancel' onClick={e => e.stopPropagation()}>탈퇴하기</button>
    ) : null;
  }

  function FeedbackButton() {
    if (!myID || myID <= 0 || myID === userID) return null;
    if (!toFeedbackAt || !openFeedbackDialog) return null;

    const now = new Date();
    const toFeedbackDate = new Date(toFeedbackAt);
    if (now < toFeedbackDate) return null;

    return (
      <div className='user_feedback_layout'>
        <button className='link' onClick={e => {
          e.stopPropagation();
          openFeedbackDialog(userID);
        }}>평가하기</button>
      </div>
    );
  }

  return (
    <div className='user_card' onClick={() => navigate(`/profile/${userID}`)}>
      <div className='user_header_contents_layout'>
        <div className='user_info_body'>
          <div className='image_layout'>
            <UserImage profileImageURL={profileImageURL}/>
          </div>

          <div className='user_info_layout'>
            <div className='user_info_header'>
              <div className='user_nickname_layout'>
                <TierSvg width={15} height={20} tier={memberLevel} />
                <h3>{nickname}</h3>
              </div>

              { userID !== myID && (
                <button className='image_button' onClick={clickLike}>
                  <Like enable={liked}/>
                </button>
              )}
            </div>

            <div className='user_tag_layout'>
              <h5>직무</h5>
              <p>{position.positionName}</p>
            </div>
            <div className='user_tag_layout'>
              <h5>온도</h5>
              <p>{score} ºC</p>
            </div>
          </div>
        </div>

        <h4>프로젝트 스택</h4>
        {techStacks.length <= 0 ? (
          <p>프로젝트 스택이 없습니다.</p>
        ) : (
          <>
            <ul className='user_tech_layout'>
              {dataGen.getUniqueTechStacks(techStacks).slice(0, 12).map((stack, index) => (
                <li key={index}><StackImage stack={stack}/></li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className='user_heart_layout'>
        <HeartCount count={likeCount}/>
      </div>

      {leaderID && teamID && myID !== undefined && (
        <div className='user_position_layout'>
          <span>{role}</span>
          <div>
            <ApproveButton/>
          </div>
        </div>
      )}

      <FeedbackButton/>
    </div>
  );
}

export default MemberCard;