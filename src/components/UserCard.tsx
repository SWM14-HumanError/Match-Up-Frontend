import {useNavigate} from "react-router-dom";
import '../styles/components/UserCard.scss';
import TierSvg from "./svgs/TierSvg.tsx";
import StackImage from "./StackImage.tsx";

function UserCard() {
  const navigate = useNavigate();

  return (
    <div className="user_card" onClick={() => navigate(`/profile/}`)}>
      <div className="user_info_body">
        <div className="image_layout">
          <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='rank image'/>
        </div>

        <div className="user_info_layout">
          <div className="user_info_header">
            <TierSvg width={15} height={20} tier={1} />
            <h3>김민수</h3>
          </div>

          <div className='user_tag_layout'>
            <h5>직무</h5>
            <p>프론트엔드 개발자</p>
          </div>
          <div className="user_tag_layout">
            <h5>경력</h5>
            <p>미들 (4~8년)</p>
          </div>
        </div>
      </div>

      <h4>프로젝트 스택</h4>
      <ul className="user_tech_layout">
        <li><StackImage stack="React"/></li>
        <li><StackImage stack="Spring"/></li>
      </ul>
    </div>
  );
}

export default UserCard;