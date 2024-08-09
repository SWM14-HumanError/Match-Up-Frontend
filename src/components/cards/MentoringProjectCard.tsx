import React from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
// import UserImage from '../UserImage.tsx';
// import HeartCount from '../svgs/HeartCount.tsx';
// import StarCount from '../svgs/StarCount.tsx';
// import TierSvg from '../svgs/Tier/TierSvg.tsx';
import Like from '../svgs/Like.tsx';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import {IMentoring} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';
import '@styles/components/MentorCard.scss';

interface IMentorCard extends IMentoring {
  setLoginDialog: (bool: boolean) => void;
  hideMentoring?: () => void;
}

function MentoringProjectCard({
                                thumbnailUrl,
                                mentoringId,
                                title,
                                likes,
                                // stars,
                                teamMentoringId,
                                // nickname,
                                // userLevel,
                                // userPictureUrl,
                                likeMentoring,
                                // mentorId,
                                teamId,
                                teamTitle,
                                leaderName,
                                setLoginDialog,
                                hideMentoring = () => {
                                }
                              }: IMentorCard) {
  const navigate = useNavigate();
  const {
    like,
    // likeCount,
    setLike
  } = useLikeQuery(id => `/api/v1/mentoring/${id}/like`, mentoringId, likes, likeMentoring);

  const myID = authControl.getUserIdFromToken();

  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (myID === 0) setLoginDialog(true);
    else setLike(prev => !prev);
  }

  function clickMentorCard(e: React.MouseEvent | Event) {
    e.stopPropagation();
    navigate(`/team/${teamId}`);
  }

  // function redirectMentorUserDetail(e: React.MouseEvent | Event) {
  //   e.stopPropagation();
  //   navigate(`/profile/${mentorId}`);
  // }

  function showMentoringInfo(e: React.MouseEvent | Event) {
    e.stopPropagation();
    navigate(`?mentoringId=${mentoringId}`);
  }

  function doneMentoring(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (!confirm('멘토링을 완료하시겠습니까?\n완료되면 취소할 수 없습니다'))
      return;

    Api.fetch(`/api/v1/mentoring/${teamMentoringId}/done`, 'POST')
      .then()
      .finally(() => {
        Alert.show('멘토링이 완료 처리 되었습니다');
        if (hideMentoring) hideMentoring();
      });
  }

  return (
    <div className='mentor_card' onClick={clickMentorCard}>
      <Image src={thumbnailUrl} dummyTitle={title}/>

      <div className='mentor_body_layout'>
        <div className='name_layout'>
          <h3>{title}</h3>
          <button className='image_button' onClick={clickLike}>
            <Like enable={like}/>
          </button>
        </div>

        <div className='mentor_tag_layout'>
          <h5>팀 이름</h5>
          <p>{teamTitle}</p>
        </div>

        <div className='mentor_tag_layout'>
          <h5>팀장</h5>
          <p>{leaderName}</p>
        </div>

        {/*<div className='baseline_layout'>*/}
        {/*  <div className='mentor_info_layout'*/}
        {/*       onClick={redirectMentorUserDetail}>*/}
        {/*    <UserImage profileImageURL={userPictureUrl}/>*/}
        {/*    <TierSvg width={20} height={20} tier={userLevel}/>*/}
        {/*    <h4>{nickname}</h4>*/}
        {/*  </div>*/}

        {/*  <div className='score_layout'>*/}
        {/*    <HeartCount count={likeCount}/>*/}
        {/*    <StarCount count={stars}/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='review_layout'>
          <button className='stack'
                  onClick={showMentoringInfo}>
            멘토링 정보
          </button>
          <button className='stack'
                  onClick={doneMentoring}>
            멘토링 끝내기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MentoringProjectCard;