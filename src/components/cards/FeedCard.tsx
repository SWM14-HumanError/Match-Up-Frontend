import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import DeleteIcon from '../svgs/DeleteIcon.tsx';
import Like from '../svgs/Like.tsx';
import Edit from '../svgs/Edit.tsx';
import useLikeQuery from '@hooks/useLikeQuery.ts';
import useInfScroll4Widget from '@hooks/useInfScroll4Widget.ts';
import useUserInfo from '@hooks/useUserInfo.ts';
import useMobile from '@hooks/useMobile.ts';
import {IMainFeedComment, IMainFeeds} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';
import { JSX } from 'react/jsx-runtime';

interface IFeedCard extends IMainFeeds{
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const dummy = {
  comments: [],
  size: 0,
  hasNextSlice: false
}

function FeedCard({id, userId, title, content, thumbnailUrl, createdDate, nickname, userPictureUrl, positionLevel, isLiked, setLoginDialog}: IFeedCard) {
  const navigate = useNavigate();
  const infScrollRef = useRef(null);

  const [modifyId, setModifyId] = useState(-1);
  const [chat, setChat] = useState('');
  // const [follow, setFollow] = useState(false);

  const myID = authControl.getUserIdFromToken();
  const myuser = myID === userId;

  const [likes, setLikes] = useState<number>(0);
  const {like, likeCount, setLike} = useLikeQuery(id => `/api/v1/feed/${id}/like`, id, likes, isLiked);

  const {data, setReqParams, hideData} = useInfScroll4Widget(`/api/v1/feed/${id}/comment`, 'comments', infScrollRef, dummy, {page: 0});
  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(nickname, positionLevel);
  const {isMobile} = useMobile();

  useEffect(() => {
    Api.fetch(`/api/v1/feed/${id}/like`)
      .then(res => res?.text())
      .then(count => setLikes(isNaN(Number(count)) ? -1 : Number(count)))
      .catch(() => setLikes(-1));
  }, [id]);


  function clickLike() {
    if (myID === 0)
      return setLoginDialog(true);
    if (myuser)
      return Alert.show('자신의 글에는 좋아요를 누를 수 없습니다');
    
    setLike(prev => !prev);
  }

  function addComment(chatString: string, setChat: React.Dispatch<React.SetStateAction<string>>) {
    if (myID === 0) {
      setLoginDialog(true);
      return;
    }

    (modifyId <= 0 ?
      Api.fetch(`/api/v1/feed/${id}/comment`, 'POST', {content: chatString}) :
      Api.fetch(`/api/v1/feed/${id}/comment/${modifyId}`, 'PUT', {content: chatString})
    )
      .then(res => res?.text())
      .then(() => {
        setChat('');
        setModifyId(-1);
        Api.fetch2Json(`/api/v1/feed/${id}/comment`)
          .then(() => refresh())
          .catch(() => console.error('댓글 불러오기 실패'));
      })
      .catch(() => console.error('댓글 작성 실패'));
  }

  function refresh() {
    setReqParams({page:0});
  }

  function setEditMode(commentId: number) {
    setModifyId(commentId);
    const comment = data.comments.find((item: { commentId: number; }) => item.commentId === commentId);
    if (comment) setChat(comment.content);
  }

  function cancelEditMode() {
    setModifyId(-1);
    setChat('');
  }

  return (
    <div className='feed_card'>
      <div className='feed_header'>
        <div className='feed_title_layout'>
          <UserImage profileImageURL={userPictureUrl} isAvailableUser={isAvailableUser}/>

          <div>
            <h3>{title}</h3>
            <div className='user_info_layout'>
              <TierSvg width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} tier={fixedPositionLevel}/>
              <span><Link to={isAvailableUser ? `/profile/${userId}` : ''}>{fixedNickname}</Link> ・ {createdDate}</span>
            </div>
          </div>
        </div>
        <div className='image_button_layout'>
          {myuser && (
            <button className='image_button'
                    onClick={() => navigate(`/update/feed/${id}?title=${title}&content=${encodeURI(content)}&imageUrl=${thumbnailUrl}`)}>
              <Edit width={24} height={24}/>
              수정하기
            </button>
          )}
          <button className='image_button'
                  onClick={clickLike}>
            <Like enable={like} width={24} height={24}/>
            <span className=''>
                {likeCount}
              </span>
            {!isMobile && '좋아요'}
          </button>

          {/*<button className='image_button'*/}
          {/*        onClick={handleShareClick}>*/}
          {/*  <Sharing width={24} height={24}/>*/}
          {/*  공유하기*/}
          {/*</button>*/}
        </div>
      </div>

      <div className='card_body_layout'>
        <div>
          <Image src={thumbnailUrl} dummyTitle={title} />
        </div>

        <div className='card_body'>
          <p className='card_text'>{dataGen.text2Dom(content)}</p>

          <div className='comment_header'>
            <h5>댓글</h5>
            {/*<button className='link'>댓글 더보기</button>*/}
          </div>
          <ul className='comment_layout' ref={infScrollRef}>
            {data.comments.length === 0 && (
              <li className='card_comment'>
                <p>댓글이 없습니다</p>
              </li>

            )}
            {data.comments.map((item: JSX.IntrinsicAttributes & IMainFeedComment, index: number) => item && (
              <FeedComment key={index}
                           {...item}
                           feedId={id}
                           setEditMode={setEditMode}
                           refresh={() => hideData(index)}/>
            ))}
          </ul>
        </div>
      </div>

      <div className='card_comment_layout'>
        <input type='text'
               placeholder='댓글을 입력해주세요'
               maxLength={49}
               value={chat}
               onChange={e => setChat(e.target.value)}/>

        <button disabled={!chat.length}
                onClick={() => addComment(chat, setChat)}>
          {modifyId > 0 ? '댓글 수정' : '댓글 작성'}
        </button>

        {modifyId > 0 && (
          <button className='cancel' onClick={cancelEditMode}>취소</button>
        )}

        {/*<button className={follow ? 'following' : 'follow'}*/}
        {/*        onClick={()=> setFollow(prev => !prev)}>*/}
        {/*  {follow ? '구독 중' : '구독 하기'}*/}
        {/*</button>*/}
      </div>

    </div>
  );
}

interface IFeedComment extends IMainFeedComment{
  feedId: number;
  setEditMode: (commentId: number) => void;
  refresh: () => void;
}
function FeedComment({feedId, commentId, userId, commentWriter, createdAt, content, setEditMode, refresh}: IFeedComment) {
  const {isAvailableUser, fixedNickname} = useUserInfo(commentWriter, 0);
  const myID = authControl.getUserIdFromToken();

  function deleteComment() {
    if (!confirm('댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다')) return;

    Api.fetch(`/api/v1/feed/${feedId}/comment/${commentId}`, 'DELETE')
      .then(res => {
        if (res && res?.ok) refresh();
      });
  }

  return (
    <li className='card_comment'>
      <div className='card_comment_header'>
        <div>
          <h6><Link to={isAvailableUser ? `/profile/${userId}` : ''}>{fixedNickname}</Link> ・ {createdAt}</h6>
        </div>

        { myID === userId && (
          <div>
            <button className='image_button' onClick={() => setEditMode(commentId)}>
              <Edit width={18} height={18}/>
            </button>
            <button className='image_button' onClick={deleteComment}>
              <DeleteIcon width={18} height={18}/>
            </button>
          </div>
        )}
      </div>
      <p>{content}</p>
    </li>
  );
}

export default FeedCard;