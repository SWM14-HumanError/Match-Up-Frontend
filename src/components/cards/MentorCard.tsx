import React from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
import UserImage from '../UserImage.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import Like from '../svgs/Like.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import {IProjectMentoring} from '../../constant/interfaces.ts';
import {getTechListKor} from '../inputs/SelectStackLevel.tsx';
import authControl from '../../constant/authControl.ts';
import '../../styles/components/MentorCard.scss';

interface IMentorCard extends IProjectMentoring {
  onClick?: () => void;
  setLoginDialog: (bool:boolean) => void;
}

function MentorCard({thumbnailUrl, mentoringId, title, roleType, career, likes, stars,
                      nickname, userLevel, userPictureUrl, likeMentoring, mentorId, /*availableReview,*/ onClick, setLoginDialog }: IMentorCard) {
  const navigate = useNavigate();
  const {like, likeCount, setLike} = useLikeQuery(id => `/api/v1/team/${id}/like`, mentoringId, likes, likeMentoring);

  const myID = authControl.getUserIdFromToken();
  
  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (myID === 0) setLoginDialog(true);
    else setLike(prev => !prev);
  }

  function clickMentorCard(e: React.MouseEvent | Event) {
    e.stopPropagation();
    
    if (onClick) onClick();
    navigate(`/mentor?mentoringId=${mentoringId}`);
  }

  function redirectMentorUserDetail(e: React.MouseEvent | Event) {
    e.stopPropagation();
    navigate(`/profile/${mentorId}`);
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
            <UserImage profileImageURL={userPictureUrl}/>
            <TierSvg width={15} height={20} tier={userLevel} />
            <h4>{nickname}</h4>
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