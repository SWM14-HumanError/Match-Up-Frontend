import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Like from '../svgs/Like.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import {ITeamProjectSummary} from '../../constant/interfaces.ts';
import '../../styles/components/ProjectCard.scss';

function ProjectCard({id, title, description, like, thumbnailUrl, techStacks, leaderID, leaderName, leaderLevel}: ITeamProjectSummary) {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);

  return (
    <div className='project_card' onClick={() => navigate(`/project/${id}`)}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt='team image'/>
      ) : (
        <div className='no_image'>
          <h2>{title}</h2>
        </div>
      )}


      <div className='info_layout'>
        <div className='project_info_detail_layout'>
          <div className='name_layout'>
            <h3>{title}</h3>
            <button className='image_button' onClick={event => {
              event.stopPropagation();
              setHeart(prev => !prev);
              // Todo: like
            }}>
              <Like enable={heart}/>
            </button>
          </div>

          <p>{description}</p>

          <h4>프로젝트 스택</h4>
          <ul>
            {techStacks.map((stack, index) => (
              <li key={index}><StackImage stack={stack}/></li>
            ))}
          </ul>
        </div>

        <div className='project_user_layout'>
          <div className='user_layout'
               onClick={event => {
                  event.stopPropagation();
                  navigate(`/profile/${leaderID}`);
               }}>
            <TierSvg width={15} height={20} tier={leaderLevel}/>
            <p>{leaderName}</p>
          </div>

          <HeartCount count={(like ? like : 0) + Number(heart)}/>
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;