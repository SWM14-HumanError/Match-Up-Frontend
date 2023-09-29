import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import LoadingLayout from '../LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import {InitMyPageDetail} from '../../constant/initData.ts';
import {IMyPageDetail} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/InviteTeamDialog.scss';
import Sharing from '../svgs/Sharing.tsx';

interface IInviteDialog {
  targetUserId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function InviteTeamDialog({targetUserId, isOpen, setIsOpen}: IInviteDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [selectedTeamId, setSelectedTeamId] = useState<number>(-1);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);
  const [isProject, setIsProject] = useState<boolean>(true);

  const [myUserInfo, setMyUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);
  const [targetUserInfo, setTargetUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);

  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    if (myID <= 0) return;

    setIsLoading(true);
    Promise.all([
      Api.fetch2Json(`/api/v1/profile/${myID}`),
      Api.fetch2Json(`/api/v1/profile/${targetUserId}`),
    ])
      .then(data => {
        const [myUser, targetUser] = data;
        setMyUserInfo(myUser);
        setTargetUserInfo(targetUser);

        const hasProject = !!myUser.projects.length;
        setIsProject(hasProject);

        if (hasProject)
          setSelectedTeamId(myUser.projects[0].id);
        else if (!!myUser.studies.length)
          setSelectedTeamId(myUser.studies[0].id);
        else
          setSelectedTeamId(-1);
      })
      .catch(e => console.error('지원서를 쓸 수 없습니다', e))
      .finally(() => setIsLoading(false));
  }, [targetUserId]);

  function invite2Team() {
    if (!content || applyButtonDisabled)
      return;

    setApplyButtonDisabled(true);
    Api.fetch('/api/v1/user/invite',  'POST', {
      teamId: selectedTeamId,
      receiverId: targetUserId,
      content: content,
    })
      .then(() => {
        alert('초대가 완료되었습니다');
        setIsOpen(false);
      })
      .catch(e => console.error('초대를 할 수 없습니다', e))
      .finally(() => setApplyButtonDisabled(false));
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='invite_team_dialog'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>초대</span>
              <h3>내 프로젝트에 초대하기</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <div className='double_user_layout'>
              <div className='user_info_layout'>
                <UserImage profileImageURL={myUserInfo.pictureUrl} />
                <div>
                  <TierSvg width={15} height={20} tier={myUserInfo.bestPositionLevel}/>
                  <h4>{myUserInfo.nickname}</h4>
                </div>
              </div>

              <Sharing width={30} height={30} />

              <div className='user_info_layout'>
                <UserImage profileImageURL={targetUserInfo.pictureUrl} />
                <div>
                  <TierSvg width={15} height={20} tier={targetUserInfo.bestPositionLevel}/>
                  <h4>{targetUserInfo.nickname}</h4>
                </div>
              </div>
            </div>

            <h4>초대 할 팀</h4>
            { myUserInfo.projects?.length || myUserInfo.studies?.length ? (
              <>
                <select onChange={e => setIsProject(e.target.value === '1')}>
                  {myUserInfo.projects?.length && (<option value='1'>프로젝트</option>)}
                  {myUserInfo.studies?.length && (<option value='0'>스터디</option>)}
                </select>
                <select onChange={e => setSelectedTeamId(parseInt(e.target.value))}>
                  {(isProject ? myUserInfo.projects : myUserInfo.studies)?.map((team) => (
                    <option key={team.id} value={team.id}>{team.title}</option>
                  ))}
                </select>
              </>
            ) : (
              <p>초대할 수 있는 프로젝트 및 스터디가 없습니다</p>
            )}



            <h4>초청하는 글</h4>
            <textarea placeholder='내용을 작성해 주세요'
                      className='contents_box'
                      value={content}
                      onChange={e => setContent(e.target.value)}/>
          </div>

          <div className='dialog_footer fill'>
            <button onClick={invite2Team}
                    disabled={selectedTeamId <= 0 || !content || applyButtonDisabled}>
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

export default InviteTeamDialog;