import {useEffect, useState} from 'react';
import Navigation from '../components/Navigation.tsx';
import ProjectCard from '../components/ProjectCard.tsx';
import SelectBox from '../components/SelectBox.tsx';
import '../styles/MainProjectPage.scss';

import {projects as projectsDummy, studies as studiesDummy} from '../dummies/dummyData.ts';

interface IProject {
  id: number;
  title: string;
  description: string;
  likes: number;
  thumbnailUrl: string;
}

function MainProjectPage() {
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [studies, setStudies] = useState<Array<IProject>>([]);

  useEffect(() => {
    fetch('/api/v1/team?type=0&page=0')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
        setProjects(projectsDummy);
      });

    fetch('/api/v1/team?type=1&page=0')
      .then((res) => res.json())
      .then((data) => {
        setStudies(data);
      }).catch((err) => {
        console.log(err);
        setStudies(studiesDummy);
      });

  }, []);

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
              <ProjectCard key={project.id}
                           teamId={project.id}
                           teamDescription={project.description}
                           teamImage={project.thumbnailUrl}
                           teamName={project.title}
                           teamStar={project.likes}/>
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
              <ProjectCard key={study.id}
                           teamId={study.id}
                           teamDescription={study.description}
                           teamImage={study.thumbnailUrl}
                           teamName={study.title}
                           teamStar={study.likes}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainProjectPage;