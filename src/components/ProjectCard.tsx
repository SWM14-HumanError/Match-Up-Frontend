import {useNavigate} from "react-router-dom";
import Like from "./svgs/Like.tsx";
import HeartCount from "./svgs/HeartCount.tsx";
import '../styles/components/ProjectCard.scss';

interface IProjectCard {
  teamId: number,
  teamName: string,
  teamImage: string,
  teamDescription: string,
  teamStar: number,
}

function ProjectCard({teamId, teamName, teamImage, teamDescription, teamStar}: IProjectCard) {
  const navigate = useNavigate();

  return (
    <div className='project_card' onClick={() => navigate(`/project/${teamId}`)}>
      <img src={teamImage} alt='team image'/>

      <div className='info_layout'>
        <div className='name_layout'>
          <h3>{teamName}</h3>
          <button>
            <Like enable={false}/>
          </button>
        </div>

        <p>{teamDescription}</p>

        <div className='project_user_layout'>
          <div className='user_layout'>
            <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='user image'/>
            <p>김민수</p>
          </div>

          <HeartCount count={teamStar}/>
        </div>

        <h4>프로젝트 스택</h4>
        <ul>
          <li>React</li>
        </ul>

      </div>
    </div>
  );
}

export default ProjectCard;