import Navigation from '../components/Navigation.tsx';
import '../styles/MainProjectPage.scss';
import SelectBox from '../components/SelectBox.tsx';
import {projects} from '../dummies/dummyData.ts';
import ProjectCard from '../components/ProjectCard.tsx';

function MainMenteePage() {
  return (
    <div>
      <Navigation isLogin={false}/>

      <div className='banner'>
        <div>
          <h2>
            우리 모임과 함께할 <br/>
            멘티분을 구해요
          </h2>
          <p>
            MatchUp은 프로젝트/스터디의 팀원과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 팀원을 구해보세요!
          </p>

        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <h2>팀원</h2>
          <div className='selector_title_layout'>
            <SelectBox/>
            <SelectBox/>
            <button>검색</button>
          </div>
          <div className='card_layout'>
            {projects.map((project) => (
              <ProjectCard key={project.id}
                           teamId={project.id}
                           teamDescription={project.description}
                           teamImage={project.thumbnailUrl}
                           teamName={project.title}
                           teamStar={project.likes}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainMenteePage;