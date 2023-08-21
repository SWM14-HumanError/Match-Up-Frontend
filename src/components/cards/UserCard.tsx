import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import UserImage from '../UserImage.tsx';
import {IUser} from '../../constant/interfaces.ts';

import '../../styles/components/UserCard.scss';

interface IUserCard extends IUser{
  teamID?: number;
  leaderID?: number;
  myID?: number;
  isMember?: boolean;
}

function UserCard({userID, profileImageURL, memberLevel, nickname, position, techStacks,
                    teamID, leaderID, myID, isMember}: IUserCard) {
  const navigate = useNavigate();
  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);

  function acceptMember() {
    if (loadingAccept) return;

    setLoadingAccept(true);
    fetch(`api/v1/team/${teamID}/acceptUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recruitUserID: userID,
      })
    }).then(res => {
      if (res.status === 201) {
        alert('승인되었습니다.');
        window.location.reload();
      }
    })
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

      {leaderID && (
        <div className='user_position_layout'>
          <span>
            {position.positionName}
          </span>
          <div>
            { myID === leaderID ?
              isMember ? (
                <>
                  <button onClick={acceptMember} disabled={!loadingAccept}>승인하기</button>
                  <button className='cancel'>탈퇴하기</button>
                </>
                ) : (
                  <>
                    <button disabled>승인됨</button>
                    <button className='cancel'>탈퇴하기</button>
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

export default UserCard;