import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import {IMenteeEvaluationRequest} from '../../constant/interfaces.ts';
import {InitMenteeEvaluation} from '../../constant/initData.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/MenteeEvaluationDialog.scss';

interface IMenteeEvaluationDialog {
  projectId: number;
  userId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScoringTitle = ['BAD', 'NORMAL', 'GREAT'];
const ScoringTitleKo = ['나빠요', '괜찮아요', '좋아요'];

const MenteeEvaluationList = [
  {tag: 'isContactable', title: '연락 가능한가요?'},
  {tag: 'isOnTime', title: '시간 약속을 잘 지키나요?'},
  {tag: 'isResponsible', title: '책임감이 있나요?'},
  {tag: 'isKind', title: '친절한가요?'},
  {tag: 'isCollaboration', title: '협업이 잘 되나요?'},
  {tag: 'isFast', title: '빠른가요?'},
  {tag: 'isActively', title: '적극적인가요?'},
];

function MenteeEvaluationDialog({projectId, userId, isOpen, setIsOpen}: IMenteeEvaluationDialog) {
  const [scoring, setScoring] = useState<number>(-1);
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);

  // const [recruitMemberInfo, setRecruitMemberInfo] = useState<IProjectRecruitment>(ProjectEdit.recruitMemberInfo);
  // const [teamInfo, setTeamInfo] = useState<IProjectInfo>(ProjectEdit.info);

  const [evaluationInfo, setEvaluationInfo] = useState<IMenteeEvaluationRequest>(InitMenteeEvaluation);

  useEffect(() => {
    setEvaluationInfo(InitMenteeEvaluation);
  }, [userId]);

  function submitEvaluation() {
    if (scoring < 0 || applyButtonDisabled)
      return;

    if (!confirm('평가 저장 후 수정이 불가능합니다\n정말로 평가를 저장하시겠습니까?')) return;

    setApplyButtonDisabled(true);
    Api.fetch2Json(`api/v1/team/${projectId}/feedback`,  'POST',{
      ...evaluationInfo,
      score: ScoringTitle[scoring],
    })
      .then(() => {
        alert('평가가 저장 되었습니다.');
        setIsOpen(false);

        // Todo: 지원 완료 후 유저 카드 고치기
        window.location.reload();
      })
      .catch(e => alert(`평가를 저징할 수 없습니다.\n${e}`))
      .finally(() => setApplyButtonDisabled(false));
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={false}>
      <div className='evaluation_dialog'>
        <div className='dialog_header'>
          <div>
            <span className='type_box'>평가</span>
            <h3>채현우 팀원 평가</h3>
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
            <h4>김민수</h4>
          </div>
          <p>description</p>

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
                  {evaluation.title}
                </label>
              </li>
            ))}
          </ul>

          <h4>팀원에 대한 평가를 작성해주세요</h4>
          <textarea placeholder='팀원에 대한 평가를 작성해주세요'
                    className='contents_box'
                    value={evaluationInfo.commentToUser}
                    onChange={e => setEvaluationInfo(prev => ({
                      ...prev,
                      commentToUser: e.target.value,
                    }))}/>

          <h4>MatchUP 에 대한 평가를 작성해주세요</h4>
          <textarea placeholder='MatchUP 에 대한 평가를 작성해주세요'
                    className='contents_box'
                    value={evaluationInfo.commentToAdmin}
                    onChange={e => setEvaluationInfo(prev => ({
                      ...prev,
                      commentToAdmin: e.target.value,
                    }))}/>

        </div>

        <div className='dialog_footer fill'>
          <button onClick={submitEvaluation}
                  disabled={scoring === -1 || applyButtonDisabled}>
            지원하기
          </button>
          <button className='cancel'
                  onClick={() => setIsOpen(false)}>
            취소하기
          </button>
        </div>
        </div>
    </DialogTemplate>
  );
}

export default MenteeEvaluationDialog;