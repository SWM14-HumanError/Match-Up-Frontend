import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserImage from '../UserImage.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import {IMentorDetail} from '@constant/interfaces.ts';
import {InitMentorDetail} from '@constant/initData.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/dialogs/MenteeEvaluationDialog.scss';

interface IMentoringEvaluationDialog {
  teamId: number;
  mentoringId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MentorEvaluationList = [
  {title: '멘토링 만족도'},
  {title: '멘토의 전문성'},
  {title: '멘토링 시간엄수'},
];

const EvaluationStringKr = ['매우 불만족', '불만족', '보통', '만족', '매우 만족'];

function MentoringEvaluationDialog({teamId, mentoringId, isOpen, setIsOpen}: IMentoringEvaluationDialog) {
  const [scoring, setScoring] = useState<number[]>(Array.from({length: MentorEvaluationList.length}, () => -1));
  const [comment, setComment] = useState<string>('');
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);

  const [mentoringInfo, setMentoringInfo] = useState<IMentorDetail>(InitMentorDetail);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(mentoringInfo.nickname, mentoringInfo.userLevel);
  
  useEffect(() => {
    if (mentoringId <= 0) return;

    Api.fetch2Json(`/api/v1/mentoring/${mentoringId}`)
      .then(data => setMentoringInfo(data))
      .catch(e => console.error('유저 정보를 불러올 수 없습니다', e));
  }, [mentoringId]);

  useEffect(() => {
    if (isOpen) return;

    setScoring(Array.from({length: MentorEvaluationList.length}, () => -1));
    setComment('');
    setApplyButtonDisabled(false);
  }, []);

  function submitEvaluation() {
    if (scoring.some(v => v < 0)) {
      Alert.show('모든 항목을 평가해주세요');
      inputRef.current?.focus();
      return;
    }

    if (!comment) {
      Alert.show('평가를 남겨주세요');
      return;
    }

    if (applyButtonDisabled)
      return;

    if (!confirm('평가 저장 후 수정이 불가능합니다\n정말로 평가를 저장하시겠습니까?')) return;

    setApplyButtonDisabled(true);

    Api.fetch(`/api/v1/mentoring/${mentoringId}/review/${teamId}`,  'POST', {
      satisfaction: scoring[0] + 1,
      expertise: scoring[1] + 1,
      punctuality: scoring[2] + 1,
      comment: comment,
    })
      .then(() => {
        Alert.show('평가가 저장 되었습니다.');
        setIsOpen(false);

        // Todo: 지원 완료 후 멘토링 카드 고치기
        window.location.reload();
      })
      .catch(e => console.error('평가를 저장할 수 없습니다', e))
      .finally(() => setApplyButtonDisabled(false));
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
            <h3>{mentoringInfo.nickname} 멘토 평가</h3>
          </div>
          <div>
            <button className='image_button' aria-label='닫기'
                    onClick={onClose}>
              <CloseIcon width={28} height={28}/>
            </button>
          </div>
        </div>

        <div className='dialog_content'>
          <div className='user_info_layout'>
            <UserImage profileImageURL={mentoringInfo.userPictureUrl} isAvailableUser={isAvailableUser}/>
            <TierSvg width={20} height={20} tier={fixedPositionLevel}/>
            <h4>{fixedNickname}</h4>
          </div>

          <h3>{mentoringInfo.title}</h3>
          <p className='contents_box'>{dataGen.string2Html(mentoringInfo.content ?? '')}</p>

          <h4>평가</h4>
          <ul className='evaluation_list'>
            {MentorEvaluationList.map((evaluation, index) => (
              <li key={index} className='radio_li'>
                <h5>{evaluation.title}</h5>
                <div>
                  {EvaluationStringKr.map((evalStr, i) => (
                    <div key={evalStr + i}>
                      <input id={`${evaluation.title}${i}`}
                             type='radio'
                             name={evaluation.title}
                             value={i}
                             onChange={e => setScoring(prev =>
                               prev.map((v, idx) => index === idx ? parseInt(e.target.value) : v)
                             )}/>
                      <label htmlFor={`${evaluation.title}${i}`}>{evalStr}</label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <h4>한줄 평가를 남겨주세요</h4>
          <textarea placeholder='한줄평가를 남겨주세요'
                    ref={inputRef}
                    maxLength={19}
                    value={comment}
                    onChange={e => setComment(e.target.value)}/>

        </div>

        <div className='dialog_footer fill'>
          <button onClick={submitEvaluation}
                  disabled={scoring.some(v => v < 0) || applyButtonDisabled}>
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

export default MentoringEvaluationDialog;