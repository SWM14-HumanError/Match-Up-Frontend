import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import {IMyPageDetail} from '../../constant/interfaces.ts';
import {InitMyPageDetail} from '../../constant/initData.ts';
import {MyUserDetailDummy} from '../../dummies/dummyData.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';

function MyGroup() {
  const [myPageDetail, setMyPageDetail] = useState<IMyPageDetail>(InitMyPageDetail);
  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${myID}`)
      .then(res => setMyPageDetail(res))
      .catch(() => setMyPageDetail(MyUserDetailDummy));
  }, []);

  return (
    <>
      <Navigation/>

      <div className='main_layout mypage_team_layout'>
        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>내 프로젝트</h2>
            </div>

            <Link to='/create/team'>모임 만들기</Link>
          </div>

          <div className='card_layout'>
            {!myPageDetail.projects?.length ? (
              <div className='list_no_contents'>
                <p>아직 참여한 프로젝트가 없습니다.</p>
              </div>
            ) : (
              <div>
                {myPageDetail.projects.map((project) => project && (
                  <ProjectCard key={project.id} {...project}/>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>내 스터디</h2>
            </div>

            <Link to='/create/team'>모임 만들기</Link>
          </div>

          <div className='card_layout'>
            {!myPageDetail.studies?.length ? (
              <div className='list_no_contents'>
                <p>아직 참여한 스터디가 없습니다.</p>
              </div>
            ) : (
              <div>
                {myPageDetail.studies.map((project) => project && (
                  <ProjectCard key={project.id} {...project}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default MyGroup;
