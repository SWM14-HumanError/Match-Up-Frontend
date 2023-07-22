import {Link} from "react-router-dom";

interface IProjectCard {
  teamId: number,
  teamName: string,
  teamImage: string,
  teamDescription: string,
  teamStar: number,
}

function ProjectCard({teamId, teamName, teamImage, teamDescription, teamStar}: IProjectCard) {

  return (
    <div className='project_card'>
      <div className='info_layout'>
        <img src={teamImage} alt='team image'/>
        <div className='description_layout'>
          <div className='name_layout'>
            <h3>{teamName}</h3>
            <button>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png'
                alt='heart'/>
            </button>
          </div>
          <p>{teamDescription}</p>
        </div>
      </div>

      <div className='project_links'>
        <div className='project_likes'>
          <button>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png'
              alt='star'/>
          </button>
          <p>{teamStar}</p>
        </div>
        <Link to={'/project/'+teamId}>모임 바로가기</Link>
      </div>
    </div>
  );
}

export default ProjectCard;