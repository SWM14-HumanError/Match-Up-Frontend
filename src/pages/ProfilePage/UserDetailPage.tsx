import Navigation from '../../components/Navigation.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';

import {projects as projectsDummy} from '../../dummies/dummyData.ts';
import {Link} from 'react-router-dom';

function UserDetailPage() {
  return (
    <>
      <Navigation isLogin={false}/>

      <div className='main_layout project_detail_page'>
        <h1>채현우</h1>
        <div className='user_detail_header'>
          <img src='' alt='user_image'/>
          <div className='user_detail_info'>
            <TierSvg width={15} height={20} tier={1}/>
            <h3>채현우</h3>
          </div>
        </div>

        <hr/>

        <DetailToggleBox title='소개'>
          <div className='contents_border'>
            <p>
              안녕하세요! 저는 채현우입니다. <br/>
              저는 열정적인 개발자로서 소프트웨어 개발과 인공지능 분야에 흥미를 가지고 있습니다. 컴퓨터 과학에 대한 끊임없는 탐구와 창의적인 문제 해결에 힘쓰며, 사용자들에게 가치 있는 경험을 제공하기 위해 노력하고 있습니다.  <br/>
              제 개발 경험은 다양한 프로젝트와 협업을 통해 쌓아왔습니다. 웹 개발, 모바일 애플리케이션 개발, 데이터베이스 관리 및 인공지능 알고리즘 개발 등 다양한 분야에서의 경험을 가지고 있습니다. 현대의 기술 트렌드를 따라가며 항상 새로운 도전을 즐기고, 최신 도구와 기술을 습득하여 프로젝트에 적용하려고 노력합니다. <br/>
              제가 개발한 소프트웨어를 설계하고 구현할 때, 사용자 경험에 특별한 주의를 기울입니다. 사용자가 직관적이고 편리하게 소프트웨어를 사용할 수 있도록 신경 쓰는 것이 저의 핵심 가치 중 하나입니다. 또한, 유지 보수 가능하고 확장 가능한 코드 작성을 중요하게 여기며, 효율성과 안정성을 고려하여 개발합니다.  <br/>
              제 목표는 사용자들에게 가치 있는 소프트웨어를 제공하여 일상 생활을 향상시키고, 혁신적인 기술로 사회에 기여하는 것입니다. 사용자들의 요구 사항을 이해하고, 문제를 해결하기 위해 최선을 다하는 것이 저의 목표입니다. <br/>
              제가 개발한 소프트웨어나 프로젝트에 대해 궁금한 점이 있으시다면 언제든지 저에게 물어보세요. 제가 도움을 드릴 수 있도록 최선을 다하겠습니다. 감사합니다!
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='기술 능력치'>
          <div className='contents_border'>
            <ul>
              <li>
                <TierSvg width={15} height={20} tier={1}/>
                <h3>백엔드</h3>
              </li>
              <li>
                <TierSvg width={15} height={20} tier={2}/>
                <h3>프론트엔드</h3>
              </li>
              <li>
                <TierSvg width={15} height={20} tier={4}/>
                <h3>UI/UX</h3>
              </li>
            </ul>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
            <div className='position_layout'>
              <img src='' alt='지도'/>
              <div>
                <ul className='position_info_layout'>
                  <li>
                    <h5>주소</h5>
                    <span>이곳에서</span>
                  </li>
                  <li>
                    <h5>시간</h5>
                    <span>이 시간에</span>
                  </li>
                  <li>
                    <h5>기타</h5>
                    <span>함 모여봅시다</span>
                  </li>
                </ul>
                <ul>
                  <li><button>오픈채팅 링크</button></li>
                  <li><button>디스코드 링크</button></li>
                </ul>
              </div>
            </div>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='진행한 프로젝트'>
          <div className='contents_border'>
            <ul className='project_list'>
              { projectsDummy.teamSearchResponseList.slice(0,2).map(project => (
                <ProjectCard key={project.id}
                             teamDescription={project.description}
                             teamImage={project.thumbnailUrl}
                             teamName={project.title}
                             teamStar={project.like}
                             teamId={project.id} />
              ))}
            </ul>
          </div>
        </DetailToggleBox>

        <div className='modify_button_layout'>
          <Link to='/update/profile' className='button'>수정히기</Link>
          <button className='cancel'>멘토인증</button>
        </div>

      </div>
    </>
  );
}

export default UserDetailPage;