import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import ProjectCard from '@components/cards/ProjectCard.tsx';
import UserCard from '@components/cards/UserCard.tsx';
import MentorCard from '@components/cards/MentorCard.tsx';
import MainFeedCard from '@components/cards/MainFeedCard.tsx';
import Footer from '@components/Footer.tsx';
import MentorDialog from '@components/dialogLayout/MentorDialog.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import useMentoringPopup from '@hooks/useMentoringPopup.ts';
import {IMainFeedsList, IMainMentorList, IProjectList, IUser, IUserCardList} from '@constant/interfaces.ts';
import {InitProject} from '@constant/initData.ts';
import Api from '@constant/Api.ts';
import '@styles/MainProjectPage.scss';

import {
  projects as projectsDummy,
  studies as studiesDummy,
  mentors as mentorsDummy,
  mentees as menteesDummy,
  feeds as feedsDummy,
} from '../../dummies/dummyData.ts';
import RecommendJobs from '@components/jobs/RecommendJobs.tsx';

// Todo: 리스트 가지고 오는 컴포넌트 만들기
// Todo: 리스트 API 정리해서 일관하도록 만들기
function MainPage() {
  const [projects, setProjects] = useState<IProjectList>(InitProject);
  const [studies, setStudies] = useState<IProjectList>(InitProject);
  const [users, setUsers] = useState<IUserCardList>(
    {userCardResponses: [], size: 0, hasNextSlice: false});
  const [mentorings, setMentorings] = useState<IMainMentorList>(
    {mentoringSearchResponses: [], size: 0, hasNextSlice: false});
  const [feeds, setFeeds] = useState<IMainFeedsList>(
    {feedSearchResponses: [], size: 0, hasNextSlice: false});
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const mentoringPopup = useMentoringPopup(mentorings.mentoringSearchResponses);

  useEffect(() => {
    Api.fetch2Json('/api/v1/list/team?type=0&page=0')
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error(err);
        setProjects(Api.isLocalhost() ? projectsDummy : InitProject);
      });

    Api.fetch2Json('/api/v1/list/team?type=1&page=0')
      .then((data) => setStudies(data))
      .catch((err) => {
      console.error(err);
      setStudies(Api.isLocalhost() ? studiesDummy : InitProject);
    });

    Api.fetch2Json('/api/v1/list/user?orderBy=likes&page=0')
      .then((data) => setUsers(data))
      .catch((err) => {
      console.error(err);
      setUsers(Api.isLocalhost() ? menteesDummy :
        {userCardResponses: [], size: 0, hasNextSlice: false});
    });

    Api.fetch2Json('/api/v1/mentorings?page=0')
      .then((data) => {
        setMentorings(data);
      }).catch((err) => {
      console.error(err);
      setMentorings(Api.isLocalhost() ? mentorsDummy :
        {mentoringSearchResponses: [], size: 0, hasNextSlice: false});
    });

    Api.fetch2Json('/api/v1/feeds?page=0')
      .then((data) => {
        setFeeds(data);
      }).catch((err) => {
      console.error(err);
      setFeeds(Api.isLocalhost() ? feedsDummy :
        {feedSearchResponses: [], size: 0, hasNextSlice: false});
    });

  }, []);

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <MentorDialog {...mentoringPopup} hideMentorCard={() => {}}/>
      <Navigation/>

      <div className='banner'>
        <div>
          <h1>
            기업 프로젝트로 취업 준비 <br/>
            커리어를 성장시키는 기회
          </h1>
          <p>
            SideMatch는 실제 기업 프로젝트를 매칭해주는 서비스입니다 <br/>
            기업 프로젝트에 참여하여 여러분의 취업 경쟁력을 강화하세요
          </p>
          {/*<div className='banner_button_layout'>*/}
          {/*  <Link className='button' to='/mentee'>*/}
          {/*    팀원 구하기*/}
          {/*  </Link>*/}
          {/*  <Link className='button' to='/mentor'>*/}
          {/*    멘토 구하기*/}
          {/*  </Link>*/}
          {/*</div>*/}
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

            <Link to='/project'>프로젝트 더보기</Link>
          </div>

          <div className={'card_layout' + (!projects.teamSearchResponseList.length ? ' no_contents' : '')}>
            <div>
              {!projects.teamSearchResponseList.length ? (
                  <div className='list_no_contents'>
                    <p>프로젝트가 없습니다</p>
                  </div>
                ) :
                projects.teamSearchResponseList.slice(0, 3).map((project) => project && (
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

            <Link to='/study'>프로젝트 더보기</Link>
          </div>

          <div className={'card_layout' + (!studies.teamSearchResponseList.length ? ' no_contents' : '')}>
            <div>
              {!studies.teamSearchResponseList.length ? (
                  <div className='list_no_contents'>
                    <p>프로젝트가 없습니다</p>
                  </div>
                ) :
                studies.teamSearchResponseList.slice(0, 3).map((study) => study && (
                  <ProjectCard key={study.id} {...study} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
            </div>
          </div>
        </div>

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>인재풀</h2>
              <span>나에게 맞는 인재를 구해보세요 🔥</span>
            </div>

            <Link to='/mentee'>인재 더보기</Link>
          </div>

          <div
            className={'card_layout' + (!users.userCardResponses.length || !users.userCardResponses[0] ? ' no_contents' : ' user_card_layout')}>
            <div>
              {!users.userCardResponses.length || !users.userCardResponses[0] ? (
                  <div className='list_no_contents'>
                    <p>팀원이 없습니다</p>
                  </div>
                ) :
                users.userCardResponses.slice(0, 4).map((mentee: IUser | null | undefined, index: number) => mentee && (
                  <UserCard key={index} {...mentee} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
            </div>
          </div>
        </div>


        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>멘토</h2>
              <span>나에게 맞는 멘토를 구해보세요 🔥</span>
            </div>

            <Link to='/mentor'>멘토 더보기</Link>
          </div>

          <div
            className={'card_layout' + (!mentorings.mentoringSearchResponses.length || !mentorings.mentoringSearchResponses[0] ? ' no_contents' : '')}>
            <div>
              {!mentorings.mentoringSearchResponses.length || !mentorings.mentoringSearchResponses[0] ? (
                  <div className='list_no_contents'>
                    <p>멘토가 없습니다</p>
                  </div>
                ) :
                mentorings.mentoringSearchResponses.slice(0, 3).map((mentor: any | null | undefined) => mentor && (
                  <MentorCard key={mentor.mentoringId}
                              {...mentor}
                              setLoginDialog={setIsLoginDialogOpen}/>
                ))}
            </div>
          </div>
        </div>

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>피드</h2>
              <span>최신 소식을 확인하세요 🔥</span>
            </div>

            <Link to='/feed'>피드 더보기</Link>
          </div>

          <div
            className={'card_layout' + (!feeds.feedSearchResponses.length || !feeds.feedSearchResponses[0] ? ' no_contents' : '')}>
            <div>
              {!feeds.feedSearchResponses.length || !feeds.feedSearchResponses[0] ? (
                  <div className='list_no_contents'>
                    <p>피드가 없습니다</p>
                  </div>
                ) :
                feeds.feedSearchResponses.slice(0, 3).map((feed: any | null | undefined) => feed && (
                  <MainFeedCard key={feed.id}
                                {...feed}
                                setLoginDialog={setIsLoginDialogOpen}/>
                ))}
            </div>
          </div>
        </div>

        {/*  채용 공고 탭 넣어보기 */}

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>채용공고</h2>
              <span>최신 채용 소식을 확인하세요 🔥</span>
            </div>

            <Link to='/jobs'>채용 더보기</Link>
          </div>

          <RecommendJobs/>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default MainPage;