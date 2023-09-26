import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import UserImage from '../UserImage.tsx';
import {ManageType} from '../dialogLayout/MenteeManageDialog.tsx';
import {IProjectMember} from '../../constant/interfaces.ts';

import '../../styles/components/UserCard.scss';

interface IUserCard extends IProjectMember{
  leaderID?: number;
  teamID?: number;
  myID?: number;
  openApplicationDialog?: (manageType: ManageType) => void;
}

function MemberCard({userID, profileImageURL, memberLevel, nickname, position, techStacks, role, approve,
                      teamID, leaderID, myID, openApplicationDialog}: IUserCard) {
  const navigate = useNavigate();

  function ApproveButton() {
    if (!openApplicationDialog) return null;
    
    if (myID === leaderID) { // 내가 리더일 때
      if (userID === leaderID) return null;

      return approve ? (
        <>
          <button disabled>승인됨</button>
          <button className='cancel'
                  onClick={() => openApplicationDialog(ManageType.KICK)}>
            탈퇴하기
          </button>
        </>
      ) : (
        <>
          <button onClick={() => openApplicationDialog(ManageType.APPLY)}>
            승인하기
          </button>
          <button className='cancel'
                  onClick={() => openApplicationDialog(ManageType.REJECT)}>
            거절하기
          </button>
        </>
      );
    }

    return myID === userID ? (
      <button className='cancel' onClick={e => e.stopPropagation()}>탈퇴하기</button>
    ) : null;
  }

  return (
    <div className='user_card' onClick={() => navigate(`/profile/${userID}`)}>
      <div className='user_info_body'>
        <div className='image_layout'>
          <UserImage profileImageURL={profileImageURL}/>
        </div>

        <div className='user_info_layout'>
          <div className='user_info_header'>
            <TierSvg width={15} height={20} tier={memberLevel} />
            <h3>{nickname}</h3>
          </div>

          <div className='user_tag_layout'>
            <h5>직무</h5>
            <p>{position.positionName}</p>
          </div>
          <div className='user_tag_layout'>
            <h5>경력</h5>
            <p>{position.level}</p>
          </div>
        </div>
      </div>

      {techStacks.length > 0 && (
        <>
          <h4>프로젝트 스택</h4>
          <ul className='user_tech_layout'>
            {techStacks.map((stack, index) => (
              <li key={index}><StackImage stack={stack}/></li>
            ))}
          </ul>
        </>
      )}

      {leaderID && teamID && myID !== undefined && (
        <div className='user_position_layout'>
          <span>{role}</span>
          <div>
            <ApproveButton/>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberCard;