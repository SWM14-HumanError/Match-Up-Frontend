import {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import UserImage from '../UserImage.tsx';
import Sharing from '../svgs/Sharing.tsx';
import useUserInfo from '../../hooks/useUserInfo.ts';
import {InitMyPageDetail} from '../../constant/initData.ts';
import {IAvailableTeam, IMyPageDetail} from '../../constant/interfaces.ts';
import {IUseDialog} from '../../hooks/useDialog.ts';
import Alert from '../../constant/Alert.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/InviteTeamDialog.scss';

interface IInviteDialog {
  targetUserId: number;
  useDialog: IUseDialog;
}

enum TeamType {
  PROJECT, STUDY, NONE
}

// project: 기업 프로젝트(0), study: 개인 프로젝트(1)
function InviteTeamDialog({targetUserId, useDialog}: IInviteDialog) {
  const [content, setContent] = useState<string>('');
  const [selectedTeamType, setSelectedTeamType] = useState<TeamType>(TeamType.NONE);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(-1);

  const [myUserInfo, setMyUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);
  const [targetUserInfo, setTargetUserInfo] = useState<IMyPageDetail>(InitMyPageDetail);
  const [projectList, setProjectList] = useState<IAvailableTeam[]>([]);
  const [studyList, setStudyList] = useState<IAvailableTeam[]>([]);

  const myUser = useUserInfo(myUserInfo.nickname, myUserInfo.bestPositionLevel);
  const targetUser = useUserInfo(targetUserInfo.nickname, targetUserInfo.bestPositionLevel);

  const myID = authControl.getUserIdFromToken();

  // fetch 유저 정보
  useEffect(() => {
    if (myID <= 0 || targetUserId <= 0) return;

    useDialog.setIsLoaded(false);
    Promise.all([
      Api.fetch2Json(`/api/v1/profile/${myID}`),
      Api.fetch2Json(`/api/v1/profile/${targetUserId}`),
      Api.fetch2Json(`/api/v1/user/invite?receiver=${targetUserId}`),
    ])
      .then(([myUser, targetUser, teamList]) => {
        setMyUserInfo(myUser);
        setTargetUserInfo(targetUser);

        let studies: IAvailableTeam[] = [];
        let projects: IAvailableTeam[] = [];
        teamList.teams.forEach((team: IAvailableTeam) => {
          if (team.teamType)
            studies.push(team);
          else
            projects.push(team);
        });
        setProjectList(projects);
        setStudyList(studies);
      })
      .catch(e => console.error('지원서를 쓸 수 없습니다', e))
      .finally(() => useDialog.setIsLoaded(true));
  }, [targetUserId]);

  // 새로 열리거나 데이터 변경되었을 때 처리
  useEffect(() => {
    if (!useDialog.isOpen) return;

    // 초기화
    setContent('');

    // 초대 가능한 팀이 있으면 선택
    if (!!projectList.length) {
      setSelectedTeamType(TeamType.PROJECT);
      setSelectedTeamId(projectList[0].teamId);
    }
    else if (!!studyList.length) {
      setSelectedTeamType(TeamType.STUDY);
      setSelectedTeamId(studyList[0].teamId);
    }
    else {
      setSelectedTeamType(TeamType.NONE);
      setSelectedTeamId(-1);
    }
  }, [useDialog.isOpen, projectList, studyList]);

  // 초대 가능 여부 확인
  useEffect(() => {
    useDialog.setDisabled(selectedTeamId <= 0 || !content || useDialog.isFetching);
  }, [selectedTeamId, content, useDialog.isFetching]);

  function invite2Team() {
    if (useDialog.disabled)
      return;

    useDialog.setIsFetching(true);
    Api.fetch('/api/v1/user/invite',  'POST', {
      teamId: selectedTeamId,
      receiverId: targetUserId,
      content: content,
    })
      .then(() => {
        Alert.show('초대가 완료되었습니다');
        setProjectList(prev => prev.filter(team => team.teamId !== selectedTeamId));
        setStudyList(prev => prev.filter(team => team.teamId !== selectedTeamId));
        useDialog.setIsOpen(false);
      })
      .catch(e => console.error('초대를 할 수 없습니다', e))
      .finally(() => useDialog.setIsFetching(false));
  }

  return (
    <DialogTemplate isOpen={useDialog.isOpen} setIsOpen={useDialog.setIsOpen} isLoading={!useDialog.isLoaded}>
      <LoadingLayout isLoading={!useDialog.isLoaded}>
        <div className='invite_team_dialog width_min_limit_480'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>초대</span>
              <h3>내 프로젝트에 초대하기</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => useDialog.setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <div className='double_user_layout'>
              <div className='user_info_layout'>
                <UserImage profileImageURL={myUserInfo.pictureUrl} isAvailableUser={myUser.isAvailableUser}/>
                <div>
                  <TierSvg width={20} height={20} tier={myUser.fixedPositionLevel}/>
                  <h4>{myUser.fixedNickname}</h4>
                </div>
              </div>

              <Sharing width={30} height={30} />

              <div className='user_info_layout'>
                <UserImage profileImageURL={targetUserInfo.pictureUrl} isAvailableUser={targetUser.isAvailableUser}/>
                <div>
                  <TierSvg width={20} height={20} tier={targetUser.fixedPositionLevel}/>
                  <h4>{targetUser.fixedNickname}</h4>
                </div>
              </div>
            </div>

            <h4>초대 할 팀</h4>
            { selectedTeamType !== TeamType.NONE ? (
              <>
                <select onChange={e => setSelectedTeamType(Number(e.target.value))}>
                  {projectList?.length && (<option value='0'>기업 프로젝트</option>)}
                  {studyList?.length && (<option value='1'>개인 프로젝트</option>)}
                </select>
                <select onChange={e => setSelectedTeamId(parseInt(e.target.value))}>
                  {[projectList, studyList, []][selectedTeamType]?.map((team) => (
                    <option key={team.teamId} value={team.teamId}>{team.teamTitle}</option>
                  ))}
                </select>
              </>
            ) : (
              <p>초대할 수 있는 프로젝트가 없습니다</p>
            )}

            <h4>초청하는 글</h4>
            <textarea placeholder='내용을 작성해 주세요'
                      className='contents_box'
                      maxLength={499}
                      value={content}
                      onChange={e => setContent(e.target.value)}/>
          </div>

          <div className='dialog_footer fill'>
            <button onClick={invite2Team}
                    disabled={useDialog.disabled}>
              초대하기
            </button>
            <button className='cancel'
                    onClick={() => useDialog.setIsOpen(false)}>
              취소하기
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default InviteTeamDialog;