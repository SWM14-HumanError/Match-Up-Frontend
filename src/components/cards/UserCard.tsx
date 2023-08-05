import {useNavigate} from "react-router-dom";
import TierSvg from "../svgs/Tier/TierSvg.tsx";
import StackImage from "../StackImage.tsx";
import {IMember} from "../../constant/interfaces.ts";

import '../../styles/components/UserCard.scss';

function UserCard({userID, profileImageURL, memberLevel, nickname, position, stacks}: IMember) {
  const navigate = useNavigate();

  return (
    <div className="user_card" onClick={() => navigate(`/profile/${userID}`)}>
      <div className="user_info_body">
        <div className="image_layout">
          <img src={profileImageURL} alt='user image'/>
        </div>

        <div className="user_info_layout">
          <div className="user_info_header">
            <TierSvg width={15} height={20} tier={parseInt(memberLevel[6])} />
            <h3>{nickname}</h3>
          </div>

          <div className='user_tag_layout'>
            <h5>직무</h5>
            <p>{position.positionName}</p>
          </div>
          <div className="user_tag_layout">
            <h5>경력</h5>
            <p>{position.positionLevel}</p>
          </div>
        </div>
      </div>

      <h4>프로젝트 스택</h4>
      <ul className="user_tech_layout">
        {stacks.map((stack, index) => (
          <li key={index}><StackImage stack={stack}/></li>
        ))}
      </ul>
    </div>
  );
}

export default UserCard;