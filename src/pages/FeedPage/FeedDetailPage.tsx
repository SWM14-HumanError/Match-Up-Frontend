import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Navigation from '@components/navigation/Navigation.tsx';
import FeedUserInfoCard from '@components/feeds/FeedUserInfoCard.tsx';
import RecommendFeeds from '@components/feeds/RecommendFeeds.tsx';
import Comments from '@components/feeds/Comments.tsx';
import Footer from '@components/Footer.tsx';
import HeartCount from '@components/svgs/HeartCount.tsx';
import Sharing from '@components/svgs/Sharing.tsx';
import Like, {LikeType} from '@components/svgs/Like.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import {IFeedDetail} from '@constant/interfaces.ts';
import {InitFeedDetail} from '@constant/initData.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/pages/FeedDetailPage.scss';

function FeedDetailPage() {
  const {feedId} = useParams();
  const navigate = useNavigate();

  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [feedDetail, setFeedDetail] = useState<IFeedDetail>(InitFeedDetail);
  const {fixedNickname, isAvailableUser} = useUserInfo(feedDetail.nickname, feedDetail.positionLevel);

  const [likes, setLikes] = useState<number>(0);
  const {
    like,
    likeCount,
    setLike
  } = useLikeQuery(id => `/api/v1/feed/${id}/like`, Number(feedId), likes, !!feedDetail.isLiked);

  const myID = authControl.getUserIdFromToken();
  const myuser = myID === feedDetail.userId;

  useEffect(() => {
    if (!feedId) return;

    Api.fetch2Json(`/api/v1/feed/${feedId}`)
      .then(data => setFeedDetail(data))
      .catch((e) => {
        if (!Api.goto404(navigate, e)) return;
      });

    Api.fetch(`/api/v1/feed/${feedId}/like`)
      .then(res => res?.text())
      .then(count => setLikes(isNaN(Number(count)) ? -1 : Number(count)))
      .catch(() => setLikes(-1));
  }, [feedId]);

  useEffect(() => {
    console.log(feedDetail);
  }, [feedDetail]);

  function clickLike() {
    if (myID === 0)
      return setLoginDialog(true);
    if (myuser)
      return Alert.show('자신의 글에는 좋아요를 누를 수 없습니다');

    setLike(prev => !prev);
  }

  return (
    <>
      <LoginRecommendDialog isOpen={loginDialog} setIsOpen={setLoginDialog}/>
      <Navigation/>

      <div className='feed_detail_page'>
        <div className='feed_detail_header'>
          <p className='domain'>{feedDetail.projectDomain}</p>
          <h1>{feedDetail.title}</h1>

          <span>{fixedNickname}</span> | <span>{feedDetail.createdDate}</span>

          {myuser && (
            <div>
              <Link to={`/update/feed/${feedId}`}>수정하기</Link>
            </div>
          )}

          <div className='user_heart_layout'>
            <HeartCount count={likeCount}/>
          </div>
        </div>

        <div className='contents_box'>
          {feedDetail.thumbnailUrl && (
            <img src={feedDetail.thumbnailUrl} alt=''/>
          )}

          <p>{dataGen.text2Dom(feedDetail.content)}</p>
        </div>

        <div className='feed_footer'>
          <div>
            <button className='image_button' aria-label='좋아요' title='좋아요'
                    onClick={clickLike}>
              <Like enable={like} type={LikeType.STROKE} width={24} height={24}/>
            </button>
            <span>{likeCount}</span>
          </div>
          <button className='image_button' aria-label='공유하기' title='공유하기'>
            <Sharing width={24} height={24}/>
          </button>
        </div>

        <h2>작성자</h2>
        <FeedUserInfoCard id={feedDetail.userId}
                          fixedNickname={fixedNickname}
                          userPictureUrl={feedDetail.userPictureUrl}
                          isAvailableUser={isAvailableUser}
                          setLoginDialog={setLoginDialog}/>

        <h2>댓글</h2>
        <Comments id={Number(feedId)} setLoginDialog={setLoginDialog}/>

        <h2>작성자의 다른 글</h2>
        <RecommendFeeds userNickname={feedDetail.nickname} setLoginDialog={setLoginDialog}/>

        <div className='submit_button_layout'>
          <Link to='/feed' className='button'>목록으로</Link>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default FeedDetailPage;