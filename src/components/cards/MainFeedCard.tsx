import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '@components/Image.tsx';
import Like from '@components/svgs/Like.tsx';
import UserImage from '@components/UserImage.tsx';
import TierSvg from '@components/svgs/Tier/TierSvg.tsx';
import HeartCount from '@components/svgs/HeartCount.tsx';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import useUserInfo from '@hooks/useUserInfo.ts';
import {IMainFeeds} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

interface IFeedCard extends IMainFeeds{
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainFeedCard({id, userId, title, content, thumbnailUrl, createdDate, nickname, userPictureUrl, positionLevel, isLiked, setLoginDialog}: IFeedCard) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState<number>(0);
  const {like, likeCount, setLike} = useLikeQuery(id => `/api/v1/feed/${id}/like`, id, likes, isLiked);

  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(nickname, positionLevel);

  const myID = authControl.getUserIdFromToken();
  const myuser = myID === userId;

  useEffect(() => {
    if (myID === 0) return;

    Api.fetch(`/api/v1/feed/${id}/like`)
      .then(res => res?.text())
      .then(count => setLikes(isNaN(Number(count)) ? -1 : Number(count)))
      .catch(() => setLikes(-1));
  }, [id]);


  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();

    if (myID === 0)
      return setLoginDialog(true);
    if (myuser)
      return Alert.show('자신의 글에는 좋아요를 누를 수 없습니다');

    setLike(prev => !prev);
  }

  return (
    <div className='project_card mentor_card' onClick={() => navigate(`/feed`)}>
      <Image src={thumbnailUrl} dummyTitle={title}/>

      <div className='info_layout mentor_body_layout'>
        <div className='project_info_detail_layout'>
          <div className='name_layout'>
            <h3>{title}</h3>
            <button className='image_button' onClick={clickLike}>
              <Like enable={like}/>
            </button>
          </div>

          <p>{createdDate}</p>

          <p className='max_line5'>{content}</p>

        </div>

        <div className='baseline_layout'>
          <div className='mentor_info_layout'
               onClick={event => {
                 event.stopPropagation();
                 navigate(isAvailableUser ? `/profile/${userId}` : '');
               }}>

            <UserImage profileImageURL={userPictureUrl} isAvailableUser={isAvailableUser}/>
            <TierSvg width={20} height={20} tier={fixedPositionLevel}/>
            <h4>{fixedNickname}</h4>
          </div>

          <HeartCount count={likeCount}/>
        </div>

      </div>
    </div>
  );
}

export default MainFeedCard;