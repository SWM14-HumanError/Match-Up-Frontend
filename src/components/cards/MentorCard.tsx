import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import '../../styles/components/MentorCard.scss';

interface IMentorCard {
  mentorName: string,
  mentorImage: string|null,
  mentorDescription: string,
  heart: number,
  star: number,
  onClick?: () => void;
}

function MentorCard({mentorName, mentorImage, star, heart, onClick}: IMentorCard) {
  // const navigate = useNavigate();

  return (
    <div className='mentor_card' onClick={onClick}>
      {mentorImage ? (
        <img src={mentorImage} alt='mentor name'/>
      ) : (
        <div className='no_image'>
          <h2>{mentorName}</h2>
        </div>
      )}

      <div className='mentor_body_layout'>
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
          <div className='mentor_info_layout'
               onClick={e => e.stopPropagation()}>
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