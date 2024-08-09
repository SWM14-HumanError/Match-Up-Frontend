import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserImage from '../UserImage.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import {IMenteeEvaluationRequest, IMyPageDetail} from '@constant/interfaces.ts';
import {InitMenteeEvaluation, InitMyPageDetail} from '@constant/initData.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/dialogs/MenteeEvaluationDialog.scss';

interface IMenteeEvaluationDialog {
  teamId: number;
  userId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IEvaluation {
  tag: string;
  title_bad: string;
  title_normal: string;
  title_great: string;
}

const ScoringTitle = ['BAD', 'NORMAL', 'GREAT'];
const ScoringTitleKo = ['나빠요', '괜찮아요', '좋아요'];

const MenteeEvaluationList :IEvaluation[] = [
  {tag: 'isContactable', title_bad: '연락이 잘 안되나요?', title_normal: '연락이 잘 되나요?', title_great: '연락이 잘 되나요?'},
  {tag: 'isOnTime', title_bad: '시간 약속을 잘 안지키나요?', title_normal: '시간 약속을 잘 지키나요?', title_great: '시간 약속을 잘 지키나요?'},
  {tag: 'isResponsible', title_bad: '발표력이 부족한가요?', title_normal: '발표를 잘 하나요?', title_great: '발표를 잘 하나요?'},
  {tag: 'isKind', title_bad: '친절하지 않나요?', title_normal: '친절한가요?', title_great: '친절한가요?'},
  {tag: 'isCollaboration', title_bad: '관련 지식이 부족한가요?', title_normal: '관련 지식이 풍부하나요?', title_great: '관련 지식이 풍부하나요?'},
  {tag: 'isFast', title_bad: '질문을 잘 하지 않나요?', title_normal: '질문을 잘 하나요?', title_great: '질문을 잘 하나요?'},
  {tag: 'isActively', title_bad: '적극적이지 않나요?', title_normal: '적극적인가요?', title_great: '적극적인가요?'},
];

function MenteeEvaluationDialog({teamId, userId, isOpen, setIsOpen}: IMenteeEvaluationDialog) {
  const [scoring, setScoring] = useState<number>(-1);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);

  const [evaluationInfo, setEvaluationInfo] = useState<IMenteeEvaluationRequest>(InitMenteeEvaluation);
  const [userProfile, setUserProfile] = useState<IMyPageDetail>(InitMyPageDetail);

  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(userProfile.nickname, userProfile.bestPositionLevel);
  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userId <= 0) return;

    setEvaluationInfo({
      ...InitMenteeEvaluation,
      receiverID: userId,
    });

    Api.fetch2Json(`/api/v1/profile/${userId}`)
      .then(data => setUserProfile(data))
      .catch(e => console.error('유저 정보를 불러올 수 없습니다', e));
  }, [userId]);

  useEffect(() => {
    if (!isOpen) {
      setScoring(-1);
      setEvaluationInfo({
        ...InitMenteeEvaluation,
        receiverID: userId,
      });
    }
  }, [isOpen]);

  function submitEvaluation() {
    if (!evaluationInfo.commentToUser) {
      Alert.show('팀원에 대한 평가를 작성해주세요');
      commentRef.current?.focus();
      return;
    }

    if (scoring < 0 || applyButtonDisabled)
      return;

    if (!confirm('평가 저장 후 수정이 불가능합니다\n정말로 평가를 저장하시겠습니까?')) return;

    setApplyButtonDisabled(true);
    Api.fetch(`/api/v1/team/${teamId}/feedback`,  'POST',{
      ...evaluationInfo,
      grade: ScoringTitle[scoring],
    })
      .then(async res => {
        if (res?.ok) {
          Alert.show('평가가 저장 되었습니다.');
          setIsOpen(false);

          // Todo: 지원 완료 후 유저 카드 고치기
          window.location.reload();
        }
        else {
          throw new Error(await res?.text())
        }
      })
      .catch(e => console.error('평가를 저장할 수 없습니다', e))
      .finally(() => setApplyButtonDisabled(false));
  }

  function getEvaluationText(evaluation: IEvaluation) {
    switch (scoring) {
      case 0: return evaluation.title_bad;
      case 1: return evaluation.title_normal;
      case 2: return evaluation.title_great;
      default: return evaluation.title_normal;
    }
  }

  function onClose(e: React.MouseEvent<HTMLButtonElement> | MouseEvent) {
    e.stopPropagation();

    if (!confirm('평가를 저장하지 않고 나가시겠습니까?\n현재 진행한 평가는 저장되지 않습니다.')) return;
    setIsOpen(false);
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={false}>
      <div className='evaluation_dialog'>
        <div className='dialog_header'>
          <div>
            <span className='type_box'>평가</span>
            <h3>팀원 평가</h3>
          </div>
          <div>
            <button className='image_button'
                    onClick={onClose}>
              <CloseIcon width={28} height={28}/>
            </button>
          </div>
        </div>

        <div className='dialog_content'>
          <div className='user_info_layout'>
            <UserImage profileImageURL={userProfile.pictureUrl} isAvailableUser={isAvailableUser}/>
            <TierSvg width={20} height={20} tier={fixedPositionLevel}/>
            <h4>{fixedNickname}</h4>
          </div>
          <br/>
          <p className='contents_box'>
            {dataGen.string2Html(userProfile.introduce ? userProfile.introduce : '자기소개가 아직 입력되지 않았어요')}
          </p>
          <p>매주 팀원들을 평가하고, 함께 성장하는 플랫폼에서 더 나은 팀을 만들어봐요! 🌈</p>

          <h4>평가</h4>
          <div className='scoring_layout'>
            {ScoringTitleKo.map((title, index) => (
              <button key={index}
                      className={scoring == index ? 'selected' : ''}
                      onClick={() => setScoring(prev => prev == index ? -1 : index)}>
                {title}
              </button>
            ))}
          </div>

          <h4>평가 목록</h4>
          <ul className='evaluation_list'>
            {MenteeEvaluationList.map((evaluation, index) => (
              <li key={index}>
                <label htmlFor={evaluation.tag}>
                  <input id={evaluation.tag}
                         type='checkbox'
                         checked={!!evaluationInfo[evaluation.tag]}
                         onChange={e => setEvaluationInfo(prev => ({...prev, [evaluation.tag]: e.target.checked}))}/>
                  {getEvaluationText(evaluation)}
                </label>
              </li>
            ))}
          </ul>

          <h4>팀원에 대한 평가를 작성해주세요</h4>
          <textarea placeholder='팀원에 대한 평가를 작성해주세요'
                    className='contents_box'
                    maxLength={99}
                    ref={commentRef}
                    value={evaluationInfo.commentToUser}
                    onChange={e => setEvaluationInfo(prev => ({
                      ...prev,
                      commentToUser: e.target.value,
                    }))}/>

          <h4>SideMatch 에 대한 평가를 작성해주세요</h4>
          <textarea placeholder='SideMatch 에 대한 평가를 작성해주세요'
                    className='contents_box'
                    maxLength={499}
                    value={evaluationInfo.commentToAdmin}
                    onChange={e => setEvaluationInfo(prev => ({
                      ...prev,
                      commentToAdmin: e.target.value,
                    }))}/>

        </div>

        <div className='dialog_footer fill'>
          <button onClick={submitEvaluation}
                  disabled={scoring === -1 || !evaluationInfo.commentToUser || applyButtonDisabled}>
            평가하기
          </button>
          <button className='cancel'
                  onClick={onClose}>
            취소하기
          </button>
        </div>
        </div>
    </DialogTemplate>
  );
}

export default MenteeEvaluationDialog;