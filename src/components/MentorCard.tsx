import {useNavigate} from "react-router-dom";
import HeartCount from "./svgs/HeartCount.tsx";
import StarCount from "./svgs/StarCount.tsx";
import '../styles/components/MentorCard.scss';
import TierSvg from "./svgs/TierSvg.tsx";

interface IMentorCard {
  mentorId: number,
  mentorName: string,
  mentorImage: string,
  mentorDescription: string,
  heart: number,
  star: number,
}

function MentorCard({mentorId, mentorName, mentorImage, star, heart}: IMentorCard) {
  const navigate = useNavigate();

  return (
    <div className="mentor_card" onClick={() => navigate(`/profile/${mentorId}`)}>
      <img src={mentorImage} alt="mentor name" />

      <div className="mentor_body_layout">
        <h3>{mentorName}</h3>

        <div className='mentor_tag_layout'>
          <h5>직무</h5>
          <p>프론트엔드 개발자</p>
        </div>

        <div className='mentor_tag_layout'>
          <h5>경력</h5>
          <p>미들 (4~8년)</p>
        </div>

        <div className='baseline_layout'>
          <div className='mentor_info_layout'>
            <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='user image'/>
            <TierSvg width={15} height={20} tier={3} />
            <h4>김민수</h4>
          </div>

          <div className='score_layout'>
            <HeartCount count={heart}/>
            <StarCount count={star}/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MentorCard;