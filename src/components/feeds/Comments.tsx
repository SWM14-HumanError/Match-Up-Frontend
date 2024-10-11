import React, {useRef, useState} from 'react';
import {JSX} from 'react/jsx-runtime';
import {IMainFeedComment} from '@constant/interfaces.ts';
import FeedComment from '@components/feeds/FeedComment.tsx';
import useInfScroll4Widget from '@hooks/useInfScroll4Widget.ts';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

interface IComments {
  id: number;
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const dummy = {
  comments: [],
  size: 0,
  hasNextSlice: false
}

function Comments({id, setLoginDialog}: IComments) {
  const [modifyId, setModifyId] = useState(-1);
  const [chat, setChat] = useState('');

  const infScrollRef = useRef(null);
  const {data, setReqParams, hideData} = useInfScroll4Widget(`/api/v1/feed/${id}/comment`, 'comments', infScrollRef, dummy, {page: 0});

  const myID = authControl.getUserIdFromToken();

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
      .catch(() => {
        Alert.show('댓글 작성에 실패했습니다');
        console.error('댓글 작성 실패');
      });
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
    <div className='card_comment_layout'>
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

      <div className='comment_input_layout'>
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

export default Comments;