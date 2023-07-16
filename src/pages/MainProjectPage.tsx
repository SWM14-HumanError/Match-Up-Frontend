import Navigation from '../components/Navigation.tsx';
import {projects, studies} from '../dummies/dummyData.ts';
import ProjectCard from '../components/ProjectCard.tsx';
import SelectBox from '../components/SelectBox.tsx';
import '../styles/MainProjectPage.scss';

function MainProjectPage() {
  return (
    <>
      <Navigation isLogin={false}/>
      <div className='banner'>
        <div>
          <h2>
            우리 스터디 진행합니다 <br/>
            멘티/멘토분 모여주세요
          </h2>
          <p>
            MatchUp은 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 멘티와 멘토를 구해보세요!
          </p>
          <div>
            <button>팀원 구하기</button>
            <button>멘토 구하기</button>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <h2>프로젝트</h2>
          <div className='selector_title_layout'>
            <SelectBox/>
            <SelectBox/>
            <button>검색</button>
          </div>
          <div className='card_layout'>
            {projects.map((project) => (
              <ProjectCard key={project.teamId} {...project} />
            ))}
          </div>
        </div>

        <div className='study'>
          <h2>스터디</h2>
          <div className='selector_title_layout'>
            <SelectBox/>
            <SelectBox/>
            <button>검색</button>
          </div>
          <div className='card_layout'>
            {studies.map((study) => (
              <ProjectCard key={study.teamId} {...study} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainProjectPage;