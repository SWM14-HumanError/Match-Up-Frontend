import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Camera from '../../components/svgs/Camera.tsx';
import SelectTeamMember, {isEmptyTeamMember} from '../../components/inputs/SelectTeamMember.tsx';
import {IEditProjectInfo} from '../../constant/interfaces.ts';
import {InitEditProjectInfo} from '../../constant/initData.ts';
import {ProjectEdit} from '../../dummies/dummyData.ts';

import '../../styles/MainProjectPage.scss';


const ProjectTypeArr = ['프로젝트', '스터디'];
const ProjectFieldArr = ['개발', '디자인', '기획', '기타'];
const ProjectRecruitArr = ['모집중', '모집완료'];

function EditProjectInfoPage() {
  const projectId = useParams().projectId;
  const navigate = useNavigate();

  const FileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [projectData, setProjectData] = useState<IEditProjectInfo>(InitEditProjectInfo);

  useEffect(() => {
    if (!projectId) {
      // todo: leaders 에 로그인한 유저 정보 추가
      return;
    }

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

  function submitProjectInfo() {
    ( !!projectId ? // 프로젝트 수정 시
      fetch(`/api/v1/team/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      }) : // 프로젝트 생성 시
      fetch(`/api/v1/team`, {
        method: 'POST',
        body: JSON.stringify(projectData),
      }))
      .then(res => res.json())
      .then(data => {
        if (data.status === 200)
          navigate(`/project/${projectId}`);
        else
          alert('기존 팀원 인원수 보다 높게 인원수를 설정하세요.');
      })
      .catch(() => alert('모임 정보 수정에 실패했습니다.'));
  }

  return (
    <>
      <Navigation isLogin={false}/>

      <div className='main_layout'>
        <h1>
          {projectId ? `모임 수정하기` : `모임 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>모임 대표 이미지</h2>
              <div className='upload_layout'>
                <div className='upload_image' onClick={() => FileInput.current?.click()}>
                  { !!selectedFile ? (
                      <img src={URL.createObjectURL(selectedFile)} alt='대표 이미지'/>
                    ) : (
                    <div className='upload_demo'>
                      <Camera/>
                    </div>
                  )}
                  <input type='file' accept='image/*' ref={FileInput} onChange={e => {
                    setSelectedFile(!!e.target.files ? e.target.files[0] : null);
                  }}/>
                </div>
                <p>
                  프로젝트에 관한 이미지를 첨부 <br/>
                  최대 100MB까지 첨부가능해요. <br/>
                  (JPG, PNG, GIF 가능)
                </p>
              </div>
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
                           onChange={e =>
                             setProjectData(prev => ({
                                ...prev, type: {...prev.type, teamType: ProjectTypeArr.indexOf(e.target.value)}
                             }))}/>

                <SelectBox options={ProjectFieldArr}
                           value={projectData.type.detailType}
                           onChange={e =>
                             setProjectData(prev => ({
                                ...prev, type: {...prev.type, detailType: e.target.value}
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
                       value={projectData.spot.onOffline}
                       onChange={e => setProjectData(prev => ({
                          ...prev, spot: {...prev.spot, onOffline: e.target.value}
                       }))}/>

            <SelectBox options={['서울', '경기', '인천', '대전', '충북', '충남', '부산', '울산', '경북', '경남', '대구', '광주', '전북', '전남', '제주', '강원']}
                       value={projectData.spot.city}
                       onChange={e =>
                         setProjectData(prev => ({
                            ...prev, spot: {...prev.spot, city: e.target.value}
                         }))}/>

            <input type='text'
                   placeholder='세부 주소를 입력해주세요'
                   value={projectData.spot.detailSpot}
                   onChange={e =>
                     setProjectData(prev => ({
                        ...prev, spot: {...prev.spot, detailSpot: e.target.value}
                     }))}/>
          </div>

          <h2>모집 팀원</h2>
          <SelectBox options={ProjectRecruitArr}
                     value={ProjectRecruitArr[projectData.recruitMemberInfo.state ? 1 : 0]}
                     onChange={e =>
                       setProjectData(prev => ({
                          ...prev, members: {...prev.recruitMemberInfo, state: ProjectRecruitArr.indexOf(e.target.value) === 1}
                       }))}/>
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