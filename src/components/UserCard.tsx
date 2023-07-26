import {useNavigate} from "react-router-dom";
import HeartCount from "./svgs/HeartCount.tsx";
import '../styles/components/UserCard.scss';

function UserCard() {
  const navigate = useNavigate();

  return (
    <div className="user_card" onClick={() => navigate(`/profile/}`)}>
      <div className="user_info_body">
        <div className="image_layout">
          <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='rank image'/>
          <HeartCount count={3}/>
        </div>

        <div className="user_info_layout">
          <h3>김민수</h3>
          <div className="user_tag_layout">
            <h5>학력</h5>
            <p>프론트엔드 개발자</p>
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

      <ul className="user_tech_layout">
        <li>React</li>
        <li>React</li>

      </ul>
    </div>
  );
}

export default UserCard;