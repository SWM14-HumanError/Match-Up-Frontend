import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import ImgUpload from '../../components/inputs/ImgUpload.tsx';
import SelectTeamMember, {isEmptyTeamMember} from '../../components/inputs/SelectTeamMember.tsx';
import {IEditProjectInfo, IEditProjectRequest} from '../../constant/interfaces.ts';
import {InitEditProjectInfo} from '../../constant/initData.ts';
import {ProjectEdit} from '../../dummies/dummyData.ts';
import {LocationNames, ProjectFields} from '../../constant/selectOptions.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';


const ProjectTypeArr = ['프로젝트', '스터디'];
// const ProjectRecruitArr = ['모집중', '모집완료'];

function EditProjectInfoPage() {
  const projectId = useParams().projectId;
  const navigate = useNavigate();
  
  const [base64, setBase64] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<IEditProjectInfo>(InitEditProjectInfo);

  const token = authControl.getInfoFromToken();
  if (!token) {
    window.location.href = '/login';
    alert('로그인 후 이용해주세요.');
  }
  const userId = token ? token.userId : -1;

  useEffect(() => {
    if (!projectId) return;

    fetch(`/api/v1/team/${projectId}/info`)
      .then(res => res.json())
      .then(data => setProjectData(prev => ({...prev, info: data})))
      .catch(() => setProjectData(prev => ({...prev, info: ProjectEdit.info})));

    fetch(`/api/v1/team/${projectId}/spot`)
      .then(res => res.json())
      .then(data => setProjectData(prev => ({...prev, spot: data})))
      .catch(() => setProjectData(prev => ({...prev, spot: ProjectEdit.spot})));

    fetch(`/api/v1/team/${projectId}/type`)
      .then(res => res.json())
      .then(data => setProjectData(prev => ({...prev, type: data})))
      .catch(() => setProjectData(prev => ({...prev, type: ProjectEdit.type})));

    fetch(`/api/v1/team/${projectId}/recruitInfo`)
      .then(res => res.json())
      .then(data => setProjectData(prev => ({...prev, recruitMemberInfo: data})))
      .catch(() => setProjectData(prev => ({...prev, recruitMemberInfo: ProjectEdit.recruitMemberInfo})));
  }, []);

  useEffect(() => {
    if (projectData.recruitMemberInfo.memberList.length === 0 ||
      !isEmptyTeamMember(projectData.recruitMemberInfo.memberList[projectData.recruitMemberInfo.memberList.length - 1])) {
      setProjectData(prev => ({
        ...prev,
        recruitMemberInfo: {
          ...prev.recruitMemberInfo,
          memberList: [
            ...prev.recruitMemberInfo.memberList,
            {
              role: '선택',
              stacks: [],
              maxCount: 0,
              count: 0
            }
          ],
        },
      }));
    }
    else if (projectData.recruitMemberInfo.memberList.length > 1 &&
      isEmptyTeamMember(projectData.recruitMemberInfo.memberList[projectData.recruitMemberInfo.memberList.length - 2])) {
      setProjectData(prev => ({
        ...prev,
        recruitMemberInfo: {
          ...prev.recruitMemberInfo,
          memberList: prev.recruitMemberInfo.memberList.slice(0, prev.recruitMemberInfo.memberList.length - 1),
        },
      }));
    }
  }, [projectData.recruitMemberInfo.memberList]);

  function getNormalizedProjectData(data: IEditProjectInfo) {
    if (!projectData.info.title) {
      alert('모임명을 입력해주세요.');
      return;
    }

    if (!projectData.info.description) {
      alert('모임 설명을 입력해주세요.');
      return;
    }

    // 이미지 base64로 변환
    const normalize: IEditProjectRequest = {
      name: data.info.title,
      description: data.info.description,
      base64Thumbnail: base64,
      leaderID: userId,

      type: data.type,
      meetingSpot: data.spot,
      memberList: data.recruitMemberInfo.memberList
        .filter(member => member.role !== '선택')
        .map(member => ({
          role: member.role,
          stacks: member.stacks.map(stack => stack.tagName),
          maxCount: member.maxCount
      }))
    };

    return normalize;
  }

  function submitProjectInfo() {
    const NormalizedProjectData = getNormalizedProjectData(projectData);
    if (!NormalizedProjectData) return;

    ( !!projectId ? // 프로젝트 수정 시
      Api.fetch(`/api/v1/team/${projectId}`,  'PUT', NormalizedProjectData) : // 프로젝트 생성 시
      Api.fetch(`/api/v1/team`, 'POST', NormalizedProjectData)
    )
      .then(() => {
        navigate(`/project/${projectId}`);
      })
      .catch(() => alert('기존 팀원 인원수 보다 높게 인원수를 설정하세요.'));
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {projectId ? `모임 수정하기` : `모임 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>모임 대표 이미지</h2>
              <ImgUpload setBase64={setBase64}/>
            </div>

            <div>
              <h2>모임명</h2>
              <div className='inputs_layout'>
                <input type='text'
                       placeholder='모임명을 입력해주세요'
                       value={projectData.info.title}
                       onChange={e =>
                         setProjectData(prev => (
                           {...prev, info: {...prev.info, title: e.target.value}}
                         ))}/>
              </div>

              <h2>모임 유형</h2>
              <div className='inputs_layout'>
                <SelectBox options={ProjectTypeArr}
                           value={ProjectTypeArr[projectData.type.teamType]}
                           onChange={value =>
                             setProjectData(prev => ({
                                ...prev, type: {...prev.type, teamType: ProjectTypeArr.indexOf(value)}
                             }))}/>

                <SelectBox options={ProjectFields}
                           value={projectData.type.detailType}
                           onChange={value =>
                             setProjectData(prev => ({
                                ...prev, type: {...prev.type, detailType: value}
                             }))}/>
              </div>
            </div>
          </div>

          <h2>모임설명</h2>
          <textarea placeholder='내용을 작성해 주세요'
                    value={projectData.info.description}
                    onChange={e =>
                      setProjectData(prev => ({
                        ...prev, info: {...prev.info, description: e.target.value}
                      }))}/>

          <h2>모임 장소</h2>
          <div className='inputs_layout'>
            <SelectBox options={['온라인', '오프라인']}
                       hasDefault={false}
                       value={projectData.spot.onOffline}
                       onChange={value => setProjectData(prev => ({
                          ...prev, spot: {...prev.spot, onOffline: value}
                       }))}/>

            {projectData.spot.onOffline === '오프라인' && (
              <>
                <SelectBox options={LocationNames}
                            hasDefault={false}
                           value={projectData.spot.city}
                           onChange={value =>
                             setProjectData(prev => ({
                               ...prev, spot: {...prev.spot, city: value}
                             }))}/>

                <input type='text'
                       placeholder='세부 주소를 입력해주세요'
                       value={projectData.spot.detailSpot}
                       onChange={e =>
                         setProjectData(prev => ({
                           ...prev, spot: {...prev.spot, detailSpot: e.target.value}
                         }))}/>
              </>
            )}
          </div>

          <h2>모집 팀원</h2>
          {/*<SelectBox options={ProjectRecruitArr}*/}
          {/*           value={ProjectRecruitArr[projectData.recruitMemberInfo.state ? 1 : 0]}*/}
          {/*           onChange={value =>*/}
          {/*             setProjectData(prev => ({*/}
          {/*                ...prev, members: {...prev.recruitMemberInfo, state: ProjectRecruitArr.indexOf(value) === 1}*/}
          {/*             }))}/>*/}
          
          <ul className='member_selector_layout'>
            {projectData.recruitMemberInfo.memberList.map((_, index) => (
              <SelectTeamMember key={index}
                                index={index}
                                teamMembers={projectData.recruitMemberInfo.memberList}
                                setTeamMembers={prevMembers => setProjectData(prev => ({
                                  ...prev,
                                  recruitMemberInfo: {
                                    ...prev.recruitMemberInfo,
                                    memberList: prevMembers(prev.recruitMemberInfo.memberList)}
                                }))}/>
            ))}
          </ul>

          <div className='submit_button_layout'>
            <button onClick={submitProjectInfo}>
              저장하기
            </button>

            <button className='cancel'
                    onClick={() => {
                      const confirm = window.confirm('작성한 내용이 저장되지 않습니다. \n정말로 취소하시겠습니까?');
                      if (confirm) navigate(-1);
                    }}>
              보류하기
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default EditProjectInfoPage;