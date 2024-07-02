import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import {IProjectList} from '../../constant/interfaces.ts';
import {InitProject} from '../../constant/initData.ts';
import Api from '../../constant/Api.ts';
import '../../styles/MainProjectPage.scss';

import {projects as projectsDummy, studies as studiesDummy} from '../../dummies/dummyData.ts';

function MainPage() {
  const [projects, setProjects] = useState<IProjectList>(InitProject);
  const [studies, setStudies] = useState<IProjectList>(InitProject);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    Api.fetch2Json('/api/v1/list/team?type=0&page=0')
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
        setProjects(Api.isLocalhost() ? projectsDummy : InitProject);
      });

    Api.fetch2Json('/api/v1/list/team?type=1&page=0')
      .then((data) => {
        setStudies(data);
      }).catch((err) => {
      console.log(err);
      setStudies(Api.isLocalhost() ? studiesDummy : InitProject);
    });

  }, []);

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>

      <div className='banner'>
        <div>
          <h1>
            주니어 개발자가 해주는 <br/>
            무료 코드 리뷰 서비스
          </h1>
          {/*<p>*/}
          {/*  SideMatch는 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>*/}
          {/*  하고 싶은 프로젝트/스터디를 정해서 멘티와 멘토를 구해보세요!*/}
          {/*</p>*/}
          <div className='banner_button_layout wide_top_margin'>
            <Link className='button' to='/mentor?mentoringId=2'>
              리뷰 받으러 가기
            </Link>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        {/*<div className='hot_project'>*/}
        {/*  <div className='header_layout'>*/}
        {/*    <h2>금주의 프로젝트</h2>*/}
        {/*    <span>금주의 가장 핫한 프로젝트에요 🔥</span>*/}
        {/*  </div>*/}

        {/*  <div className={'card_layout' + (!projects.teamSearchResponseList.length ? ' no_contents' : '')}>*/}
        {/*    <div>*/}
        {/*      { !projects.teamSearchResponseList.length ? (*/}
        {/*        <div className='list_no_contents'>*/}
        {/*          <p>프로젝트가 없습니다</p>*/}
        {/*        </div>*/}
        {/*      ) :*/}
        {/*      projects.teamSearchResponseList.slice(0, 3).slice(0, 3).map((project) => project && (*/}
        {/*        <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>기업 프로젝트</h2>
              <span>지금 새로 생긴 핫한 기업 프로젝트에요 🔥</span>
            </div>

            <Link to='/project'>전체 더보기</Link>
          </div>

          <div className={'card_layout' + (!projects.teamSearchResponseList.length ? ' no_contents' : '')}>
            <div>
              { !projects.teamSearchResponseList.length ? (
                <div className='list_no_contents'>
                  <p>프로젝트가 없습니다</p>
                </div>
              ) :
              projects.teamSearchResponseList.slice(0, 6).map((project) => project && (
                <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
              ))}
            </div>
          </div>
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>개인 프로젝트</h2>
              <span>지금 새로 생긴 핫한 개인 프로젝트에요 🔥</span>
            </div>

            <Link to='/study'>전체 더보기</Link>
          </div>

          <div className={'card_layout' + (!studies.teamSearchResponseList.length ? ' no_contents' : '')}>
            <div>
              { !studies.teamSearchResponseList.length ? (
                <div className='list_no_contents'>
                  <p>프로젝트가 없습니다</p>
                </div>
              ) :
              studies.teamSearchResponseList.slice(0, 6).map((study) => study && (
                <ProjectCard key={study.id} {...study} setLoginDialog={setIsLoginDialogOpen}/>
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