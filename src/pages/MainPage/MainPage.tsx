import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import {IProjectList} from '../../constant/interfaces.ts';
import {InitProject} from '../../constant/initData.ts';
import '../../styles/MainProjectPage.scss';

import {projects as projectsDummy, studies as studiesDummy} from '../../dummies/dummyData.ts';

function MainPage() {
  const [projects, setProjects] = useState<IProjectList>(InitProject);
  const [studies, setStudies] = useState<IProjectList>(InitProject);

  useEffect(() => {
    fetch('/api/v1/list/team?type=0&page=0')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
        setProjects(projectsDummy);
      });

    fetch('/api/v1/list/team?type=1&page=0')
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
      <Navigation/>
      <div className='banner'>
        <div>
          <h1>
            우리 스터디 진행합니다! <br/>
            멘티 ・ 멘토분 모여주세요
          </h1>
          <p>
            MatchUp은 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 멘티와 멘토를 구해보세요!
          </p>
          <div className='banner_button_layout'>
            <Link className='button' to='/mentee'>
              팀원 구하기
            </Link>
            <Link className='button' to='/mentor'>
              멘토 구하기
            </Link>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        <div className='hot_project'>
          <div className='header_layout'>
            <h2>금주의 프로젝트</h2>
            <span>금주의 가장 핫한 프로젝트에요 🔥</span>
          </div>

          <div className='card_layout'>
            <div>
              {projects.teamSearchResponseList.slice(0, 3).slice(0, 3).map((project) => project && (
                <ProjectCard key={project.id} {...project}/>
              ))}
            </div>
          </div>
        </div>

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>프로젝트</h2>
              <span>지금 새로 생긴 핫한 프로젝트에요 🔥</span>
            </div>

            <Link to='/project'>전체 더보기</Link>
          </div>

          <div className='card_layout'>
            <div>
              {projects.teamSearchResponseList.slice(0, 6).map((project) => project && (
                <ProjectCard key={project.id} {...project}/>
              ))}
            </div>
          </div>
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>스터디</h2>
              <span>지금 새로 생긴 핫한 스터디에요 🔥</span>
            </div>

            <Link to='/study'>전체 더보기</Link>
          </div>

          <div className='card_layout'>
            <div>
              {studies.teamSearchResponseList.slice(0, 6).map((study) => study && (
                <ProjectCard key={study.id} {...study}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default MainPage;