import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import UserImage from '../UserImage.tsx';
import {IProjectMember} from '../../constant/interfaces.ts';

import '../../styles/components/UserCard.scss';

interface IUserCard extends IProjectMember{
  leaderID?: number;
  teamID?: number;
  myID?: number;
  setMembers?: React.Dispatch<React.SetStateAction<IProjectMember[]>>;
}

function MemberCard({userID, profileImageURL, memberLevel, nickname, position, techStacks, role, approve,
                      teamID, leaderID, myID, setMembers}: IUserCard) {
  const navigate = useNavigate();
  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);

  function acceptMember() {
    if (loadingAccept) return;

    setLoadingAccept(true);
    fetch(`/api/v1/team/${teamID}/acceptUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recruitUserID: userID,
        role: role
      })
    })
      .then(res => {
        alert(res.statusText);

        if (res.status < 300 && setMembers) {
          setMembers(prev =>
            prev.map(member => {
              if (member.userID === userID)
                return {...member, role: role, approved: true};
              return member;
            }));
        }
      })
      .catch(e => alert(`팀원 추가에 실패했습니다.\n${e}`))
      .finally(() => setLoadingAccept(false));
  }

  function rejectMember() {
    if (loadingAccept) return;

    setLoadingAccept(true);
    fetch(`/api/v1/team/${teamID}/rejectUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recruitUserID: userID,
        role: role
      })
    })
      .then(res => {
        alert(res.statusText);

        if (res.status < 300 && setMembers) {
          setMembers(prev =>
            prev.filter(member => member.userID !== userID));
        }
      })
      .catch(e => alert(`팀원 거절에 실패했습니다.\n${e}`))
      .finally(() => setLoadingAccept(false));
  }

  function kickMember() {
    fetch(`/api/v1/team/${teamID}/kickUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recruitUserID: userID,
        role: role
      })
    })
      .then(res => {
        alert(res.statusText);

        if (res.status < 300 && setMembers) {
          setMembers(prev =>
            prev.filter(member => member.userID !== userID));
        }
      })
      .catch(e => alert(`팀원 거절에 실패했습니다.\n${e}`))
      .finally(() => setLoadingAccept(false));
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

      <h4>프로젝트 스택</h4>
      <ul className='user_tech_layout'>
        {techStacks.map((stack, index) => (
          <li key={index}><StackImage stack={stack}/></li>
        ))}
      </ul>

      {leaderID && teamID && myID !== undefined && (
        <div className='user_position_layout'>
          <span>{role}</span>
          <div>
            { myID === leaderID ?
              approve ? (
                <>
                  <button onClick={acceptMember}
                          disabled={loadingAccept}>
                    승인하기
                  </button>
                  <button className='cancel'
                          onClick={rejectMember}
                          disabled={loadingAccept}>
                    거절하기
                  </button>
                </>
              ) : (
                <>
                  <button disabled>승인됨</button>
                  <button className='cancel'
                          onClick={kickMember}
                          disabled={loadingAccept}>
                    탈퇴하기
                  </button>
                </>
              ) :
              myID === userID ? (
                <button className='cancel'>탈퇴하기</button>
              ) : null }
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberCard;