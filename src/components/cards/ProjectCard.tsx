import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Like from '../svgs/Like.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import '../../styles/components/ProjectCard.scss';

interface IProjectCard {
  teamId: number,
  teamName: string,
  teamImage: string,
  teamDescription: string,
  teamStar: number,
}

function ProjectCard({teamId, teamName, teamImage, teamDescription, teamStar}: IProjectCard) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  return (
    <div className='project_card' onClick={() => navigate(`/project/${teamId}`)}>
      <img src={teamImage} alt='team image'/>

      <div className='info_layout'>
        <div className='name_layout'>
          <h3>{teamName}</h3>
          <button className='image_button' onClick={event => {
            event.stopPropagation();
            setLike(prev => !prev);
            //todo: like
          }}>
            <Like enable={like}/>
          </button>
        </div>

        <p>{teamDescription}</p>

        <h4>프로젝트 스택</h4>
        <ul>
          <li><StackImage stack={{tagName:'React'}}/></li>
        </ul>

        <div className='project_user_layout'>
          <div className='user_layout'
               onClick={event => {
                  event.stopPropagation();
                  navigate(`/profile/1`);
               }}>
            <TierSvg width={15} height={20} tier={1}/>
            <p>김민수</p>
          </div>

          <HeartCount count={teamStar}/>
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;