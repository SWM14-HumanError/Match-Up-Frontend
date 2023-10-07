import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import {InitApplicationData, InitMyPageDetail} from '../../constant/initData.ts';
import {IApplicationData, IMyPageDetail, IProjectMember} from '../../constant/interfaces.ts';
import Alert from '../../constant/Alert.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/ApplyDialog.scss';
import '../../styles/dialogs/MenteeManageDialog.scss';

export enum ManageType {
  READ,
  APPLY,
  REJECT,
  KICK
}

interface IApplyDialog {
  teamId: number;
  userId: number;
  recruitId: number;
  manageType: ManageType;
  setMembers: React.Dispatch<React.SetStateAction<IProjectMember[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenteeManageDialog({teamId, userId, recruitId, manageType, setMembers, isOpen, setIsOpen}: IApplyDialog) {
  const [isLoading, setLoadingAccept] = useState<boolean>(false);
  const [loadingAccept, setIsLoading] = useState<boolean>(true);
  const [recruitContent, setRecruitContent] = useState<string>('');

  const [recruitAppInfo, setRecruitAppInfo] = useState<IApplicationData>(InitApplicationData);
  const [userInfo, setUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);

  useEffect(() => {
    setRecruitContent('');
  }, [isOpen]);

  useEffect(() => {
    if (userId <= 0 || recruitId <= 0) return;

    setIsLoading(true);
    Promise.all([
      Api.fetch2Json(`/api/v1/team/${teamId}/recruit/${recruitId}`),
      Api.fetch2Json(`/api/v1/profile/${userId}`),
    ])
      .then(res => {
        const [app, user] = res;
        setRecruitAppInfo(app);
        setUserInfo(user);
      })
      .catch(e => console.error('지원서를 불러올 수 없습니다', e))
      .finally(() => setIsLoading(false));
  }, [teamId, userId, recruitId]);

  const buttonNames = ['', '승인하기', '거절하기', '추방하기'];
  const buttonFunctions = [() => {}, acceptMember, rejectMember, kickMember];

  function acceptMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    if (loadingAccept) return;

    setLoadingAccept(true);
    Api.fetch(`/api/v1/team/${teamId}/acceptUser`, 'POST',{
      recruitUserID: userId,
      role: recruitAppInfo.applyRole,
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;

        setMembers(prev => [
          ...prev.map(member =>
            member.userID === userId ? {...member, role: recruitAppInfo.applyRole, approve: true} : member
          )
        ]);
        
        Alert.show('팀원을 추가했습니다.');
        setIsOpen(false);
      })
      .catch(e => console.error('팀원 추가에 실패했습니다.', e))
      .finally(() => setLoadingAccept(false));
  }

  function rejectMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    if (loadingAccept) return;

    setLoadingAccept(true);
    Api.fetch(`/api/v1/team/${teamId}/refuseUser`, 'DELETE', {
      recruitUserID: userId,
      refuseReason: recruitContent,
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;

        setMembers(prev =>
          [...prev.filter(member => member.userID !== userId)]
        );

        Alert.show('팀원을 거절했습니다.');
        setIsOpen(false);
      })
      .catch(e => console.error('팀원 거절에 실패했습니다.', e))
      .finally(() => setLoadingAccept(false));
  }

  function kickMember(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    Api.fetch(`/api/v1/team/${teamId}/kickUser`, 'DELETE', {
      recruitUserID: userId,
      role: recruitAppInfo.applyRole,
    })
      .then(res => {
        if (!res?.ok || !setMembers) return;

        setMembers(prev =>
          [...prev.filter(member => member.userID !== userId)]
        );

        Alert.show('팀원을 추방했습니다.');
        setIsOpen(false);
      })
      .catch(e => console.error('팀원 거절에 실패했습니다', e))
      .finally(() => setLoadingAccept(false));
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='apply_dialog mentee_manage_dialog'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>프로젝트</span>
              <h3>지원서 보기</h3>
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
              <UserImage profileImageURL={recruitAppInfo.thumbnailUrl} />
              <TierSvg width={15} height={20} tier={userInfo.bestPositionLevel}/>
              <h4>{userInfo.nickname}</h4>
            </div>
            <div className='stat_contents_layout'>
              <h5>지원분야</h5>
              <p>{recruitAppInfo.applyRole}</p>
            </div>
            <h4>지원서 내용</h4>
            <p className='contents_box'>{recruitAppInfo.content}</p>

            <h4>상대에게 보낼 메세지</h4>
            <textarea placeholder='내용을 작성해 주세요'
                      className='contents_box'
                      maxLength={499}
                      value={recruitContent}
                      onChange={e => setRecruitContent(e.target.value)}/>
          </div>

          <div className='dialog_footer fill'>
            {manageType !== ManageType.READ && (
              <button onClick={buttonFunctions[manageType]}
                      disabled={!recruitContent || loadingAccept}>
                {buttonNames[manageType]}
              </button>
            )}
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              {manageType === ManageType.READ ? '확인하기' : '취소하기'}
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default MenteeManageDialog;