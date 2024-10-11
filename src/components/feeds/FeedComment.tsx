import {Link} from 'react-router-dom';
import Edit from '@components/svgs/Edit.tsx';
import DeleteIcon from '@components/svgs/DeleteIcon.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import {IMainFeedComment} from '@constant/interfaces.ts';
import authControl from '@constant/authControl.ts';
import Api from '@constant/Api.ts';


interface IFeedComment extends IMainFeedComment {
  feedId: number;
  setEditMode: (commentId: number) => void;
  refresh: () => void;
}

function FeedComment({
                       feedId,
                       commentId,
                       userId,
                       commentWriter,
                       createdAt,
                       content,
                       setEditMode,
                       refresh
                     }: IFeedComment) {
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
    <li className="card_comment">
      <div className="card_comment_header">
        <div>
          <h6><Link to={isAvailableUser ? `/profile/${userId}` : ''}>{fixedNickname}</Link> ・ {createdAt}</h6>
        </div>

        {myID === userId && (
          <div>
            <button className="image_button" onClick={() => setEditMode(commentId)}>
              <Edit width={18} height={18}/>
            </button>
            <button className="image_button" onClick={deleteComment}>
              <DeleteIcon width={18} height={18}/>
            </button>
          </div>
        )}
      </div>
      <p>{content}</p>
    </li>
  );
}

export default FeedComment;