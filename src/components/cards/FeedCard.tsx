import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import Sharing from '../svgs/Sharing.tsx';
import Like from '../svgs/Like.tsx';
import Edit from '../svgs/Edit.tsx';
import authControl from '../../constant/authControl.ts';
import {IMainFeedComment, IMainFeeds} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

function FeedCard({id, userId, title, content, thumbnailUrl, createdDate, userName, userPictureUrl, positionLevel}: IMainFeeds) {
  const navigate = useNavigate();

  const [chat, setChat] = useState('');
  const [like, setLike] = useState(false);
  const [prevLike, setPrevLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const tokenData = authControl.getInfoFromToken();
  const myID = tokenData ? tokenData.id : 0;
  const myuser = myID === userId;

  useEffect(() => {
    Api.fetch2Json(`/api/v1/feed/${id}/like`)
      .then(res => setLikeCount(res.data))
      .catch(() => setLikeCount(-1));
  }, [id]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (prevLike === like) return;

      setPrevLike(like);
      if (like) {
        Api.fetch2Json(`/api/v1/feed/${id}/like`, 'POST').then();
      } else {
        Api.fetch2Json(`/api/v1/feed/${id}/like`, 'DELETE').then();
      }
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [like]);

  async function handleShareClick() {
    try {
      // Todo: shareData 수정
      const shareData = {
        title: document.title,
        text: '이 웹 페이지를 공유합니다.',
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        console.log('공유 성공');
      } else {
        console.error('공유하기를 지원하지 않는 브라우저입니다.');
      }
    } catch (error) {
      console.error('공유 실패: ', error);
    }
  }

  return (
    <div className='feed_card'>
      <div className='feed_header'>
        <div className='feed_title_layout'>
          <img src={userPictureUrl || ''} alt='user image'/>

          <div>
            <h3>{title}</h3>
            <TierSvg width={15} height={19.446} tier={positionLevel} />
            <span>{userName} ・ {createdDate}</span>
          </div>
        </div>
        <div className='image_button_layout'>
          {myuser ? (
            <button className='image_button'
                    onClick={() => navigate(`/update/feed/${id}`)}>
              <Edit width={24} height={24}/>
              수정하기
            </button>
          ) : (
            <button className='image_button'
                    onClick={() => setLike(prev => !prev)}>
              <Like enable={like} width={24} height={24}/>
              <span className=''>
                {likeCount + Number(like)}
              </span>
              좋아요
            </button>
          )}

          <button className='image_button'
                  onClick={handleShareClick}>
            <Sharing width={24} height={24}/>
            공유하기
          </button>
        </div>
      </div>

      <div className='card_body_layout'>
        <img src={thumbnailUrl || ''} alt='feed_img'/>

        <div className='card_body'>
          <p className='card_text'>{content}</p>

          <div className='comment_header'>
            <h5>댓글</h5>
            <button className='link'>댓글 더보기</button>
          </div>
          <ul className='comment_layout'>

            <FeedComment commentId={1} userId={0} createdAt={'작성일'} content={'댓글 내용'}/>
            <FeedComment commentId={1} userId={0} createdAt={'작성일'} content={'댓글 내용'}/>
          </ul>
        </div>
      </div>

      <div className='card_comment_layout'>
        <input type='text'
               value={chat}
               onChange={e => setChat(e.target.value)}/>

        <button disabled={!chat.length}>
          댓글 작성
        </button>

        <button className={follow ? 'following' : 'follow'}
                onClick={()=> setFollow(prev => !prev)}>
          {follow ? '구독 중' : '구독 하기'}
        </button>
      </div>

    </div>
  );
}

function FeedComment({commentId, userId, createdAt, content}: IMainFeedComment) {
  useEffect(() => {
    // console.log(commentId, userId, createdAt, content);
  }, [commentId, userId]);

  return (
    <li className='card_comment'>
      <div className='card_comment_header'>
        <TierSvg width={15} height={20} tier={3}/>
        <h6>작성자 ・ {createdAt}</h6>
      </div>
      <p>{content}</p>
    </li>
  );
}

export default FeedCard;