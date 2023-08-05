import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import MentorCard from '../../components/cards/MentorCard.tsx';
import UserCard from '../../components/cards/UserCard.tsx';
import StackImage from '../../components/StackImage.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';

import {ProjectDetail} from '../../dummies/dummyData.ts';
import {InitProjectDetail} from '../../constant/initData.ts';
import {
  IProjectInfo,
  IProjectMeetingSpot,
  IProjectMember,
  IProjectMentoring
} from '../../constant/interfaces.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';

function ProjectDetailPage() {
  // Todo: 프로젝트 정보 받아오기 수정된 API 에 맞게 수정
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState<IProjectInfo>(InitProjectDetail.info);
  const [members, setMembers] = useState<IProjectMember[]>([]);
  const [meetingSpot, setMeetingSpot] = useState<IProjectMeetingSpot>(InitProjectDetail.spot);
  const [mentors, setMentors] = useState<IProjectMentoring[]>([]);
  const [stacks, setStacks] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const [memberSelect, setMemberSelect] = useState<number>(0);
  const [stackSelect, setStackSelect] = useState<number>(0);

  useEffect(() => {
    if (!projectId) return;

    fetch(`api/v1/team/${projectId}/info`)
      .then(res => res.json())
      .then(data => setProjectInfo(data))
      .catch(() => setProjectInfo(ProjectDetail.info));

    fetch(`api/v1/team/${projectId}/member`)
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        getRoles(data);
      })
      .catch(() => {
        setMembers(ProjectDetail.members);
        getRoles(ProjectDetail.members);
      });

    fetch(`api/v1/team/${projectId}/spot`)
      .then(res => res.json())
      .then(data => setMeetingSpot(data))
      .catch(() => setMeetingSpot(ProjectDetail.spot));

    fetch(`api/v1/team/${projectId}/mentoring`)
      .then(res => res.json())
      .then(data => setMentors(data))
      .catch(() => setMentors(ProjectDetail.mentoring));

    fetch(`api/v1/team/${projectId}/stacks`)
      .then(res => res.json())
      .then(data => setStacks(data))
      .catch(() => setStacks(ProjectDetail.stacks));

  }, []);

  function getRoles(members: IProjectMember[]) {
    const roleSet = new Set<string>();
    members.forEach(member => {
      roleSet.add(member.role);
    });
    setRoles(Array.from(roleSet));
  }

  function searchMemberByRole(role: string) {
    if (role == '전체') {
      return members;
    } else {
      return members.filter(member => member.role == role);
    }
  }

  function searchStackByRole(role: string) {
    if (role == '전체') {
      return stacks;
    } else {
      return stacks.filter(stack => stack == role);
    }
  }

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
          <ul className='tech_stack_list scroll_layout'>
            <li><button
              className={memberSelect == 0 ? 'selected' : ''}
              onClick={() => setMemberSelect(0)}>
              전체
            </button></li>
            {roles.map((role, index) => (
              <li>
                <button
                  className={memberSelect == index+1 ? 'selected' : ''}
                  onClick={() => setMemberSelect(index+1)}>
                {role}
              </button></li>
            ))}
          </ul>

          <div className='contents_border'>
            <ul className='team_member scroll_layout'>
              { searchMemberByRole(['전체', ...roles][memberSelect]).map((member) => (
                <li className='project_detail_team_member'>
                  <UserCard key={member.userID}
                            {...member}
                            position={{
                              positionName: member.position.positionName,
                              positionLevel: member.position.level,
                            }}
                  />
                </li>
              ))}
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
                    <span>{meetingSpot.onOffline}</span>
                  </li>
                  <li>
                    <h5>시간</h5>
                    <span>{meetingSpot.city}</span>
                  </li>
                  <li>
                    <h5>기타</h5>
                    <span>{meetingSpot.detailSpot}</span>
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
            <ul className='scroll_layout'>
              {mentors.map((mentor) => (
                <MentorCard key={mentor.mentoringID}
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
            <ul className='tech_stack_list scroll_layout'>
              <li><button
                className={stackSelect == 0 ? 'selected' : ''}
                onClick={() => setStackSelect(0)}>
                전체
              </button></li>
              {roles.map((role, index) => (
                <li><button
                  className={stackSelect == index+1 ? 'selected' : ''}
                  onClick={() => setStackSelect(index + 1)}>
                  {role}
                </button></li>
              ))}
            </ul>
            <ul className='scroll_layout'>
              {searchStackByRole(['전체', ...stacks][stackSelect]).map((stack) => (
                <li>
                  <StackImage stack={stack}/>
                </li>
              ))}
            </ul>
          </div>
        </DetailToggleBox>

        <div className='modify_button_layout'>
          <Link to={`/update/project/${projectId}`}
                className='button'>
            수정히기
          </Link>
          <button className='danger'>
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailPage;