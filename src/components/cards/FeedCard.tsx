import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import Like from '../svgs/Like.tsx';
import Edit from '../svgs/Edit.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import useInfScroll4Widget from '../../hooks/useInfScroll4Widget.ts';
import {IMainFeedComment, IMainFeeds} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';
import { JSX } from 'react/jsx-runtime';
import DeleteIcon from "../svgs/DeleteIcon.tsx";

interface IFeedCard extends IMainFeeds{
  getUserNickname: (userId: number) => Promise<string>;
}

const dummy = {
  comments: [],
  size: 0,
  hasNextSlice: false
}

function FeedCard({id, userId, title, content, thumbnailUrl, createdDate, nickname, userPictureUrl, positionLevel, isLiked, getUserNickname}: IFeedCard) {
  const navigate = useNavigate();
  const infScrollRef = useRef(null);

  const [modifyId, setModifyId] = useState(-1);
  const [chat, setChat] = useState('');
  // const [follow, setFollow] = useState(false);

  const myID = authControl.getUserIdFromToken();
  const myuser = myID === userId;

  const {like, likeCount, setLike} = useLikeQuery('feed', id, isLiked);

  const {data, setReqParams} = useInfScroll4Widget(`/api/v1/feed/${id}/comment`, 'comments', infScrollRef, dummy, {page: 0});

  // async function handleShareClick() {
  //   try {
  //     // Todo: shareData 수정
  //     const shareData = {
  //       title: document.title,
  //       text: '이 웹 페이지를 공유합니다.',
  //       url: window.location.href,
  //     };
  //
  //     if (navigator.share) {
  //       await navigator.share(shareData);
  //       console.log('공유 성공');
  //     } else {
  //       console.error('공유하기를 지원하지 않는 브라우저입니다.');
  //     }
  //   } catch (error) {
  //     console.error('공유 실패: ', error);
  //   }
  // }

  function addComment(chatString: string, setChat: React.Dispatch<React.SetStateAction<string>>) {
    (modifyId <= 0 ?
      Api.fetch(`/api/v1/feed/${id}/comment`, 'POST', {content: chatString}) :
      Api.fetch(`/api/v1/feed/${id}/comment/${modifyId}`, 'PUT', {content: chatString})
    )
      .then(res => res?.text())
      .then(() => {
        setChat('');
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
          <UserImage profileImageURL={userPictureUrl}/>

          <div>
            <h3>{title}</h3>
            <TierSvg width={15} height={19.446} tier={positionLevel}/>
            <span>{nickname} ・ {createdDate}</span>
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
                {likeCount}
              </span>
              좋아요
            </button>
          )}

          {/*<button className='image_button'*/}
          {/*        onClick={handleShareClick}>*/}
          {/*  <Sharing width={24} height={24}/>*/}
          {/*  공유하기*/}
          {/*</button>*/}
        </div>
      </div>

      <div className='card_body_layout'>
        <div>
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt='feed_img'/>
          ) : (
            <div className='no_image'>
              <h2>{title}</h2>
            </div>
          )}
        </div>

        <div className='card_body'>
          <p className='card_text'>{content}</p>

          <div className='comment_header'>
            <h5>댓글</h5>
            {/*<button className='link'>댓글 더보기</button>*/}
          </div>
          <ul className='comment_layout' ref={infScrollRef}>
            {data.comments.map((item: JSX.IntrinsicAttributes & IMainFeedComment, index: React.Key | null | undefined) => item && (
              <FeedComment key={index}
                           {...item}
                           feedId={id}
                           getUserNickname={getUserNickname}
                           setEditMode={setEditMode}
                           refresh={refresh}/>
            ))}
          </ul>
        </div>
      </div>

      <div className='card_comment_layout'>
        <input type='text'
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
  getUserNickname: (userId: number) => Promise<string>;
  setEditMode: (commentId: number) => void;
  refresh: () => void;
}
function FeedComment({feedId, commentId, userId, commentWriter, createdAt, content, getUserNickname, setEditMode, refresh}: IFeedComment) {
  const [nickname, setNickname] = useState(commentWriter ? commentWriter : '');
  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    // console.log(commentId, userId, createdAt, content);
    if (!commentWriter)
      getUserNickname(userId)
      .then(res => setNickname(res));
  }, [commentId, userId]);

  function deleteComment() {
    if (!confirm('댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다')) return;

    Api.fetch(`/api/v1/feed/${feedId}/comment/${commentId}`, 'DELETE')
      .then(res => {
        if (res?.status === 200) refresh();
      });
  }

  return (
    <li className='card_comment'>
      <div className='card_comment_header'>
        <div>
          <TierSvg width={15} height={20} tier={3}/>
          <h6>{nickname} ・ {createdAt}</h6>
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