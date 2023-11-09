import React from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
import UserImage from '../UserImage.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import Like from '../svgs/Like.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import useUserInfo from '../../hooks/useUserInfo.ts';
import {IMentoring} from '../../constant/interfaces.ts';
import {getTechListKor} from '../inputs/SelectStackLevel.tsx';
import authControl from '../../constant/authControl.ts';
import Alert from '../../constant/Alert.ts';
import Api from '../../constant/Api.ts';

import '../../styles/components/MentorCard.scss';
import '../../styles/components/ProjectCard.scss';

interface IMentorCard extends IMentoring {
  onClick?: () => void;
  setLoginDialog: (bool:boolean) => void;
  openMentorReview?: (mentoringId: number) => void;
  hideMentoring?: () => void;
}

function MentorCard({thumbnailUrl, mentoringId, title, roleType, career, likes, stars, teamMentoringId,
                      nickname, userLevel, userPictureUrl, likeMentoring, mentorId, availableReview, onClick,
                      setLoginDialog, openMentorReview=()=>{}, hideMentoring=()=>{} }: IMentorCard) {
  const navigate = useNavigate();
  const {like, likeCount, setLike} = useLikeQuery(id => `/api/v1/mentoring/${id}/like`, mentoringId, likes, likeMentoring);
  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(nickname, userLevel);

  const myID = authControl.getUserIdFromToken();
  
  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (myID === 0) setLoginDialog(true);
    else setLike(prev => !prev);
  }

  function clickMentorCard(e: React.MouseEvent | Event) {
    e.stopPropagation();
    
    if (onClick) onClick();
    navigate(`?mentoringId=${mentoringId}`);
  }

  function redirectMentorUserDetail(e: React.MouseEvent | Event) {
    e.stopPropagation();
    navigate(`/profile/${mentorId}`);
  }

  function doneMentoring(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (!confirm('멘토링을 완료하시겠습니까?\n완료되면 취소할 수 없습니다'))
      return;
    
    Api.fetch(`/api/v1/mentoring/${teamMentoringId}/done`, 'POST')
      .then()
      .finally(() => {
        Alert.show('멘토링이 완료 처리 되었습니다');
        if(hideMentoring) hideMentoring();
      });
  }

  return (
    <div className='mentor_card project_card' onClick={clickMentorCard}>
      <Image src={thumbnailUrl} dummyTitle={title}>
        {!!teamMentoringId && (
          <button className='stack'
                  onClick={doneMentoring}>
            멘토링 끝내기
          </button>
        )}
        {!!availableReview && (
          <button className='stack'
                  onClick={e => {
                    e.stopPropagation();
                    openMentorReview(mentoringId);
                  }}>
            평가하기
          </button>
        )}
      </Image>

      <div className='mentor_body_layout'>
        <div className='name_layout'>
          <h3>{title}</h3>
          <button className='image_button' onClick={clickLike}>
            <Like enable={like}/>
          </button>
        </div>

        <div className='mentor_tag_layout'>
          <h5>직무</h5>
          <p>{getTechListKor(roleType)}</p>
        </div>

        <div className='mentor_tag_layout'>
          <h5>경력</h5>
          <p>{career}</p>
        </div>

        <div className='baseline_layout'>
          <div className='mentor_info_layout'
               onClick={redirectMentorUserDetail}>
            <UserImage profileImageURL={userPictureUrl} isAvailableUser={isAvailableUser}/>
            <TierSvg width={20} height={20} tier={fixedPositionLevel} />
            <h4>{fixedNickname}</h4>
          </div>

          <div className='score_layout'>
            <HeartCount count={likeCount}/>
            <StarCount count={stars}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;