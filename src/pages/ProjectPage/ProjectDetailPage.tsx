import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../../components/Navigation.tsx";
import MentorCard from "../../components/cards/MentorCard.tsx";
import UserCard from "../../components/cards/UserCard.tsx";
import StackImage from "../../components/StackImage.tsx";
import DetailToggleBox from "../../components/DetailToggleBox.tsx";
import {ProjectDetail} from "../../dummies/dummyData.ts";
import {IProjectDetail} from "../../constant/interfaces.ts";
import {InitProjectDetail} from "../../constant/initData.ts";

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState<IProjectDetail>(InitProjectDetail);

  useEffect(() => {
    if (!projectId) return;

    fetch(`api/v1/team/${projectId}`)
      .then(res => res.json())
      .then(data => setProjectInfo(data))
      .catch(() => setProjectInfo(ProjectDetail));
  }, []);

  return (
    <>
      <Navigation isLogin={false}/>

      <div className='main_layout project_detail_page'>
        <div className='project_detail_header'>
          <h1>{projectInfo.title}</h1>

          <div className='project_thumbnail_layout'>
            <img src='' alt='project_thumbnail'/>
          </div>
        </div>

        <DetailToggleBox title='프로젝트 요약'>
          <div className='contents_border'>
            <p>{projectInfo.description}</p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='팀 맴버'
                         buttonName='팀원 초대하기'>
          <ul className='tech_stack_list'>
            <li><button>전체</button></li>
            <li><button>프론트엔드</button></li>
            <li><button>백엔드</button></li>
            <li><button>UI/UX</button></li>
          </ul>

          <div className='contents_border'>
            <ul className='team_member'>
              <li className='project_detail_team_member'>
                <UserCard/>
              </li>
              <li className='project_detail_team_member'>
                <UserCard/>
              </li>
            </ul>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
            <div className='position_layout'>
              <img src="" alt="지도"/>
              <div>
                <ul className='position_info_layout'>
                  <li>
                    <h5>주소</h5>
                    <span>{projectInfo.meetingSpot.onOffline}</span>
                  </li>
                  <li>
                    <h5>시간</h5>
                    <span>{projectInfo.meetingSpot.city}</span>
                  </li>
                  <li>
                    <h5>기타</h5>
                    <span>{projectInfo.meetingSpot.detailSpot}</span>
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

        <DetailToggleBox title='기여한 멘토링'
                         buttonName='멘토링 추가하기'>
          <div className='contents_border'>
            <ul>
              {projectInfo.mentoringList.map((mentor) => (
                <MentorCard key={mentor.id}
                            mentorId={mentor.id}
                            mentorDescription={mentor.mentorProfileURL}
                            mentorImage={mentor.thumbnailURL}
                            mentorName={mentor.mentorNickname}
                            heart={mentor.like}
                            star={mentor.score}/>
              ))}
            </ul>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='프로젝트 스택'>
          <div className='contents_border'>
            <ul className='tech_stack_list'>
              <li><button>전체</button></li>
              <li><button>프론트엔드</button></li>
              <li><button>백엔드</button></li>
              <li><button>UI/UX</button></li>
            </ul>
            <ul>
              {projectInfo.stacks.map((stack) => (
                <li>
                  <StackImage stack={stack}/>
                </li>
              ))}
            </ul>
          </div>
        </DetailToggleBox>

        <div className='modify_button_layout'>
          <button>수정히기</button>
          <button className='cancel'>삭제하기</button>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailPage;