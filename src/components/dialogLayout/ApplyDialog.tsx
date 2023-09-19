import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import LoadingLayout from '../LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';

import '../../styles/dialogs/ApplyDialog.scss';
import FieldSelector from '../inputs/FieldSelector.tsx';
import {ProjectEdit} from '../../dummies/dummyData.ts';
import {IProjectInfo, IProjectRecruitment} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

interface IApplyDialog {
  projectId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyDialog({projectId, isOpen, setIsOpen}: IApplyDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<number>(-1);
  const [recruitContent, setRecruitContent] = useState<string>('');
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);

  const [recruitMemberInfo, setRecruitMemberInfo] = useState<IProjectRecruitment>(ProjectEdit.recruitMemberInfo);
  const [teamInfo, setTeamInfo] = useState<IProjectInfo>(ProjectEdit.info);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      Api.fetch2Json(`/api/v1/team/${projectId}/recruitInfo`),
      Api.fetch2Json(`/api/v1/team/${projectId}/info`),
    ])
      .then(data => {
        const [recruitInfo, info] = data;
        setRecruitMemberInfo(recruitInfo);
        setTeamInfo(info);
      })
      .catch(e => {
        setRecruitMemberInfo(ProjectEdit.recruitMemberInfo);
        setTeamInfo(ProjectEdit.info);
        console.error(e);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [projectId]);

  function apply2TeamByRole() {
    if (selectedField === -1 || !recruitContent || applyButtonDisabled)
      return;

    setApplyButtonDisabled(true);
    Api.fetch2Json(`/api/v1/team/${projectId}/recruit`,  'POST',{
        role: recruitMemberInfo.memberList[selectedField].role,
        content: recruitContent
    })
      .then(() => {
        alert('지원이 완료되었습니다.');
        setIsOpen(false);

        // Todo: 지원 완료 후 카드 고치기
        window.location.reload();
      })
      .catch(e => alert(`지원에 실패했습니다.\n${e}`))
      .finally(() => setApplyButtonDisabled(false));
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='apply_dialog'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>프로젝트</span>
              <h3>{teamInfo.title}</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <div className='user_info_layout'>
              <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='user image'/>
              <TierSvg width={15} height={20} tier={3}/>
              <h4>김민수 leaderID:{teamInfo.leaderID}</h4>
            </div>
            <p>{teamInfo.description}</p>

            <h4>지원 분야</h4>
            <ul>
              {recruitMemberInfo.memberList.map((field, index) => (
                <FieldSelector key={index}
                               {...field}
                               selected={index == selectedField}
                               onClick={() => {
                                 if (field.count == field.maxCount)
                                   return;
                                 if (index == selectedField)
                                   setSelectedField(-1);
                                 else
                                    setSelectedField(index);
                               }}/>
              ))}
            </ul>

            <h4>자기 소개</h4>
            <textarea placeholder='내용을 작성해 주세요'
                      className='contents_box'
                      value={recruitContent}
                      onChange={e => setRecruitContent(e.target.value)}/>
          </div>

          <div className='dialog_footer fill'>
            <button onClick={apply2TeamByRole}
                    disabled={selectedField === -1 || !recruitContent || applyButtonDisabled}>
              지원하기
            </button>
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              취소하기
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default ApplyDialog;