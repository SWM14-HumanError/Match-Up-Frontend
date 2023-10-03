import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import MemberCard from '../../components/cards/MemberCard.tsx';
import StackImage from '../../components/StackImage.tsx';
import OnlineSvg from '../../../assets/Online.svg';
import MapRouter from '../../components/svgs/maps/MapRouter.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';
import ApplyDialog from '../../components/dialogLayout/ApplyDialog.tsx';
import MenteeEvaluationDialog from '../../components/dialogLayout/MenteeEvaluationDialog.tsx';
import MenteeManageDialog, {ManageType} from '../../components/dialogLayout/MenteeManageDialog.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '../../components/Footer.tsx';

import Alert from '../../constant/Alert.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';
import {ProjectDetail} from '../../dummies/dummyData.ts';
import {InitEditProjectInfo, InitProjectDetail} from '../../constant/initData.ts';
import {IProjectInfo, IProjectMeetingSpot, IProjectMember, IProjectRecruitment} from '../../constant/interfaces.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';

// const meetingTypeKr = {
//   ONLINE: '온라인',
//   OFFLINE: '오프라인',
//   FREE: '온/오프라인',
//   null: '온/오프라인',
// }

function ProjectDetailPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [projectInfo, setProjectInfo] = useState<IProjectInfo>(InitProjectDetail.info);
  const [members, setMembers] = useState<IProjectMember[]>([]);
  const [meetingSpot, setMeetingSpot] = useState<IProjectMeetingSpot>(InitProjectDetail.spot);
  // const [mentors, setMentors] = useState<IProjectMentoring[]>([]);
  const [recruitInfo, setRecruitInfo] = useState<IProjectRecruitment>(InitEditProjectInfo.recruitMemberInfo);
  const [stacks, setStacks] = useState<string[]>([]);
  const [memberRoles, setMemberRoles] = useState<string[]>([]);
  const [stackRoles, setStackRoles] = useState<string[]>([]);

  const [memberSelect, setMemberSelect] = useState<number>(0);
  const [stackSelect, setStackSelect] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMenteeManageOpen, setIsMenteeManageOpen] = useState<boolean>(false);
  const [manageType, setManageType] = useState<ManageType>(ManageType.READ);
  const [manageRecuritId, setManageRecuritId] = useState(-1);
  const [isMenteeEvaluationOpen, setIsMenteeEvaluationOpen] = useState<boolean>(false);
  const [evaluateUserId, setEvaluateUserId] = useState<number>(0);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    if (!teamId) return;
    Api.fetch2Json(`/api/v1/team/${teamId}/info`)
      .then(data => setProjectInfo(data))
      .catch(() => {
        if (!Api.goto404(navigate))
          setProjectInfo(ProjectDetail.info);
      });

    Api.fetch2Json(`/api/v1/team/${teamId}/member`)
      .then(data => setMembers(data))
      .catch(() => setMembers(ProjectDetail.members));

    Api.fetch2Json(`/api/v1/team/${teamId}/spot`)
      .then(data => setMeetingSpot(data))
      .catch(() => setMeetingSpot(ProjectDetail.spot));

    // Api.fetch2Json(`/api/v1/team/${teamId}/mentoring`)
    //   .then(data => setMentors(data))
    //   .catch(() => setMentors(ProjectDetail.mentoring));

    Api.fetch2Json(`/api/v1/team/${teamId}/stacks`)
      .then(data => setStacks(data))
      .catch(() => setStacks([]));

    Api.fetch2Json(`/api/v1/team/${teamId}/recruitInfo`)
      .then(data => setRecruitInfo(prev => ({...prev, ...data})))
      .catch(() => setRecruitInfo(prev => ({...prev, ...InitEditProjectInfo.recruitMemberInfo})));
  }, []);

  // Role List 생성
  useEffect(() => {
    const roleSet = new Set<string>();
    members.forEach(member => {
      roleSet.add(member.role);
    });

    setMemberRoles(Array.from(roleSet));
  }, [members]);

  // StackRole List 생성
  useEffect(() => {
    const roleSet = new Array<string>();
    recruitInfo.memberList.forEach(member => {
      if (member.stacks.length > 0)
        roleSet.push(member.role);
    });

    setStackRoles(roleSet);
  }, [recruitInfo]);

  function searchMemberByRole(role: string) {
    if (role == '전체') {
      return members;
    } else {
      return members.filter(member => member.role == role);
    }
  }

  function searchStackByRole(role: string) {
    if (role == '전체') {
      return Array.from(new Set<string>(stacks));
    } else {
      const target = recruitInfo.memberList.filter(obj => obj.role === role);
      return target.length ? Array.from(new Set<string>(target[0].stacks)) : [];
    }
  }

  function deleteProjectPage() {
    if (confirm('정말로 프로젝트를 삭제하시겠습니까?\n삭제된 프로젝트는 복구할 수 없습니다.'))
      Api.fetch(`/api/v1/team/${teamId}`, 'DELETE')
        .then(() => {
          navigate('/');
          Alert.show('프로젝트가 삭제되었습니다.');
        })
        .catch(e => console.log(e));
  }

  function openApplyDialog() {
    if (!myID || myID <= 0) {
      setIsLoginDialogOpen(true);
      return;
    }
    setIsOpen(true);
  }

  function openApplicationDialog(type: ManageType, recruitID: number, userId: number) {
    setManageType(type);
    setManageRecuritId(recruitID);
    setEvaluateUserId(userId);
    setIsMenteeManageOpen(true);
  }

  function openFeedbackDialog(userId: number) {
    setEvaluateUserId(userId);
    setIsMenteeEvaluationOpen(true);
  }

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <ApplyDialog teamId={parseInt(teamId as string)}
                   isOpen={isOpen}
                   setIsOpen={setIsOpen}/>
      <MenteeManageDialog teamId={parseInt(teamId as string)}
                          userId={evaluateUserId}
                          recruitId={manageRecuritId}
                          manageType={manageType}
                          setMembers={setMembers}
                          isOpen={isMenteeManageOpen}
                          setIsOpen={setIsMenteeManageOpen}/>
      <MenteeEvaluationDialog teamId={parseInt(teamId as string)}
                              userId={evaluateUserId}
                              isOpen={isMenteeEvaluationOpen}
                              setIsOpen={setIsMenteeEvaluationOpen}/>
      <Navigation/>

      <div className='main_layout project_detail_page'>
        <div className='project_detail_header'>
          <h1>{projectInfo.title}</h1>

          <div className='project_thumbnail_layout'>
            {projectInfo.thumbnailUrl && (
              <img src={projectInfo.thumbnailUrl} alt='project thumbnail'/>
            )}
          </div>
        </div>

        <DetailToggleBox title='프로젝트 요약'>
          <div className='contents_border'>
            <p>{projectInfo.description}</p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='팀 멤버'
                         buttonName={myID == projectInfo.leaderID ? '' : '팀원 지원하기'}
                         buttonDisabled={!recruitInfo.memberList.length}
                         onClick={openApplyDialog}>
          { members.length === 0 ? (
            <div className='contents_border'>
              <div className='list_no_contents'>
                <p>팀원이 없습니다.</p>
              </div>
            </div>
          ) : (
            <>
              <ul className='tech_stack_list scroll_layout'>
                <li><button
                  className={memberSelect == 0 ? 'selected' : ''}
                  onClick={() => setMemberSelect(0)}>
                  전체
                </button></li>
                {memberRoles.map((role, index) => (
                  <li key={index}>
                    <button
                      className={memberSelect == index+1 ? 'selected' : ''}
                      onClick={() => setMemberSelect(index+1)}>
                      {role}
                    </button>
                  </li>
                ))}
              </ul>

              <div className='contents_border'>
                <ul className='team_member scroll_layout'>
                  { searchMemberByRole(['전체', ...memberRoles][memberSelect]).map((member) => (
                    <li className='project_detail_team_member' key={member.userID}>
                      <MemberCard {...member}
                                  teamID={teamId ? parseInt(teamId) : 0}
                                  leaderID={projectInfo.leaderID}
                                  myID={myID}
                                  openApplicationDialog={openApplicationDialog}
                                  openFeedbackDialog={openFeedbackDialog}/>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
            <div className='position_layout'>
              <div className='map_layout'>
                { meetingSpot.onOffline === 'Online' ? (
                  <img src={OnlineSvg} alt=''/>
                ): (
                  <MapRouter locationName={meetingSpot.city}/>
                )}
              </div>
              <div>
                <ul className='position_info_layout'>
                  <li>
                    <h5>선호 타입</h5>
                    <span>{meetingSpot.onOffline}</span>
                  </li>
                  {meetingSpot.onOffline !== 'Online' && (
                    <>
                      <li>
                        <h5>주소</h5>
                        <span>{meetingSpot.city}</span>
                      </li>
                      {meetingSpot.detailSpot && (
                        <li>
                          <h5>상세 주소</h5>
                          <span>{meetingSpot.detailSpot}</span>
                        </li>
                      )}
                    </>
                  )}

                  {projectInfo.meetingTime && (
                    <li>
                      <h5>모임 시간</h5>
                      <span>{projectInfo.meetingTime}</span>
                    </li>
                  )}
                </ul>
                {/*<ul>*/}
                {/*  <li><button>오픈채팅 링크</button></li>*/}
                {/*  <li><button>디스코드 링크</button></li>*/}
                {/*</ul>*/}
              </div>
            </div>
          </div>
        </DetailToggleBox>

        {/*<DetailToggleBox title='기여한 멘토링'*/}
        {/*                 buttonName={!myID ? '' : '멘토링 추가하기'}>*/}
        {/*  <div className='contents_border'>*/}
        {/*    { mentors?.length === 0 ? (*/}
        {/*      <div className='list_no_contents'>*/}
        {/*        <p>진행한 멘토링이 없습니다.</p>*/}
        {/*      </div>*/}
        {/*    ) : (*/}
        {/*      <ul className='scroll_layout'>*/}
        {/*        {mentors.map((mentor) => (*/}
        {/*          <MentorCard key={mentor.mentoringID}*/}
        {/*                      mentorDescription={mentor.mentorProfileURL}*/}
        {/*                      mentorImage={mentor.thumbnailURL}*/}
        {/*                      mentorName={mentor.mentorNickname}*/}
        {/*                      heart={mentor.like}*/}
        {/*                      star={mentor.score}/>*/}
        {/*        ))}*/}
        {/*      </ul>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</DetailToggleBox>*/}

        <DetailToggleBox title='프로젝트 스택'>
          <div className='contents_border'>
            <ul className='tech_stack_list scroll_layout'>
              <li>
                <button
                  className={stackSelect == 0 ? 'selected' : ''}
                  onClick={() => setStackSelect(0)}>
                  전체
                </button>
              </li>
              {stackRoles.map((role, index) => (
                <li key={index}>
                  <button
                    className={stackSelect == index+1 ? 'selected' : ''}
                    onClick={() => setStackSelect(index + 1)}>
                    {role}
                  </button>
                </li>
              ))}
            </ul>
            { searchStackByRole(['전체', ...stackRoles][stackSelect]).length === 0 ? (
              <div className='list_no_contents'>
                <p>스택이 없습니다</p>
              </div>
            ) : (
              <ul className='project_stack_layout'>
                {searchStackByRole(['전체', ...stackRoles][stackSelect]).map((stackName) => (
                  <li key={stackName}>
                    <StackImage stack={{tagName:stackName}}/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        {projectInfo.leaderID === myID && (
          <div className='modify_button_layout'>
            <Link to={`/update/team/${teamId}`}
                  className='button'>
              수정하기
            </Link>
            <button className='danger'
                    onClick={deleteProjectPage}>
              삭제하기
            </button>
          </div>
        )}
      </div>

      <Footer/>
    </>
  );
}

export default ProjectDetailPage;