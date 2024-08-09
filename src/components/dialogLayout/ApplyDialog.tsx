import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import FieldSelector from '../inputs/FieldSelector.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import {InitEditProjectInfo, InitMyPageDetail} from '@constant/initData.ts';
import {IMyPageDetail, IProjectInfo, IProjectRecruitment} from '@constant/interfaces.ts';
import Alert from '@constant/Alert.ts';
import dataGen from '@constant/dateGen.tsx';
import authControl from '@constant/authControl.ts';
import Api from '@constant/Api.ts';

import '@styles/dialogs/ApplyDialog.scss';

interface IApplyDialog {
  teamId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyDialog({teamId, isOpen, setIsOpen}: IApplyDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<number>(-1);
  const [recruitContent, setRecruitContent] = useState<string>('');
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);

  const [recruitMemberInfo, setRecruitMemberInfo] = useState<IProjectRecruitment>(InitEditProjectInfo.recruitMemberInfo);
  const [teamInfo, setTeamInfo] = useState<IProjectInfo>(InitEditProjectInfo.info);
  const [userInfo, setUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);

  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(userInfo.nickname, userInfo.bestPositionLevel);

  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    if (myID <= 0) return;

    setIsLoading(true);
    Promise.all([
      Api.fetch2Json(`/api/v1/team/${teamId}/recruitInfo`),
      Api.fetch2Json(`/api/v1/team/${teamId}/info`),
      Api.fetch2Json(`/api/v1/profile/${myID}`),
    ])
      .then(data => {
        const [recruitInfo, info, user] = data;
        setRecruitMemberInfo(recruitInfo);
        setTeamInfo(info);
        setUserInfo(user);
      })
      .catch(e => {
        console.error('지원서를 쓸 수 없습니다', e);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [teamId]);

  function apply2TeamByRole() {
    if (selectedField === -1 || !recruitContent || applyButtonDisabled)
      return;

    setApplyButtonDisabled(true);
    Api.fetch2Json(`/api/v1/team/${teamId}/recruit`,  'POST',{
        role: recruitMemberInfo.memberList[selectedField].role,
        content: recruitContent
    })
      .then(() => {
        Alert.show('지원이 완료되었습니다.');
        setIsOpen(false);

        // Todo: 지원 완료 후 카드 고치기
        window.location.reload();
      })
      .catch(e => console.error(e))
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
              <UserImage profileImageURL={userInfo.pictureUrl} isAvailableUser={isAvailableUser}/>
              <TierSvg width={20} height={20} tier={fixedPositionLevel}/>
              <h4>{fixedNickname}</h4>
            </div>
            <p>{dataGen.string2Html(userInfo.introduce ?? '')}</p>

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
                      maxLength={499}
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