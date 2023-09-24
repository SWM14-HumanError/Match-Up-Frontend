import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import UserImage from '../UserImage.tsx';
import {IProjectMember} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

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

  function acceptMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    if (loadingAccept) return;

    setLoadingAccept(true);
    Api.fetch(`/api/v1/team/${teamID}/acceptUser`, 'POST',{
        recruitUserID: userID,
        role: role
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;
        
        setMembers(prev => [
          ...prev.map(member =>
            member.userID === userID ? {...member, role: role, approve: true} : member
          )
        ]);
      })
      .catch(e => console.error('팀원 추가에 실패했습니다.', e))
      .finally(() => setLoadingAccept(false));
  }

  function rejectMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    if (loadingAccept) return;

    setLoadingAccept(true);
    Api.fetch(`/api/v1/team/${teamID}/refuseUser`, 'DELETE', {
        recruitUserID: userID,
        role: role
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;
        
        setMembers(prev =>
          [...prev.filter(member => member.userID !== userID)]
        );
      })
      .catch(e => console.error('팀원 거절에 실패했습니다.', e))
      .finally(() => setLoadingAccept(false));
  }

  function kickMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    Api.fetch(`/api/v1/team/${teamID}/kickUser`, 'DELETE', {
        recruitUserID: userID,
        role: role
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;

        setMembers(prev =>
          [...prev.filter(member => member.userID !== userID)]
        );
      })
      .catch(e => console.error('팀원 거절에 실패했습니다', e))
      .finally(() => setLoadingAccept(false));
  }

  function ApproveButton() {
    if (myID === leaderID) { // 내가 리더일 때
      if (userID === leaderID) return null;

      return approve ? (
        <>
          <button disabled>승인됨</button>
          <button className='cancel'
                  onClick={kickMember}
                  disabled={loadingAccept}>
            탈퇴하기
          </button>
        </>
      ) : (
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