import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import {IProjectList} from '../../constant/interfaces.ts';
import {InitProject} from '../../constant/initData.ts';
import '../../styles/MainProjectPage.scss';

import {projects as projectsDummy, studies as studiesDummy} from '../../dummies/dummyData.ts';

function MyGroup() {
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

      <div className='main_layout'>
        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>내 프로젝트</h2>
            </div>

            <Link to='/create/project'>모임 만들기</Link>
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
              <h2>내 스터디</h2>
            </div>

            <Link to='/create/project'>모임 만들기</Link>
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

export default MyGroup;
