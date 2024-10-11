import {Link} from 'react-router-dom';
import UserImage from '@components/UserImage.tsx';
import React, {useEffect, useState} from 'react';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import authControl from '@constant/authControl.ts';
import Api from '@constant/Api.ts';
import Like from '@components/svgs/Like.tsx';

interface IFeedUserInfoCard {
  id: number;
  fixedNickname: string;
  userPictureUrl: string|null;
  isAvailableUser: boolean;
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function FeedUserInfoCard({id, fixedNickname, userPictureUrl, isAvailableUser, setLoginDialog}: IFeedUserInfoCard) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const {setLike, like: liked} = useLikeQuery(id => `/api/v1/likes/user/${id}`, id, -1, isLiked)

  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    if (!myID || myID <= 0 || id <= 0) return;

    Api.fetch2Json(`/api/v1/likes/check/${id}`)
      .then(res => setIsLiked(res.check))
      .catch(() => {});
  }, []);

  function clickLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (myID === 0 && setLoginDialog) setLoginDialog(true);
    else setLike(prev => !prev);
  }

  return (
    <div className='feed_user_card'>
      <div>
        <UserImage profileImageURL={userPictureUrl} isAvailableUser={isAvailableUser}/>
        <h3>
          <Link to={`/profile/${id}`}>{fixedNickname}</Link>
        </h3>
      </div>
      <div>
        <button className='image_button' onClick={clickLike}>
          <Like enable={liked}/>
        </button>
      </div>
    </div>
  );
}

export default FeedUserInfoCard;