import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
import {ISimpleMentoring} from '../../pages/Mypage/MyMentoring.tsx';
import Alert from '../../constant/Alert.ts';
import Api from '../../constant/Api.ts';

interface ISimpleMentoringCard extends ISimpleMentoring {
  setApplyDialogInfo: (func: any) => void;
  hideSimpleMentoring: (_: number) => void;
}

function SimpleMentoringCard({
                               applyId,
                               content,
                               email,
                               phoneNumber,
                               teamId,
                               setApplyDialogInfo,
                               hideSimpleMentoring
                             }: ISimpleMentoringCard) {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigate = useNavigate();

  function AcceptMentoring(comment: string) {
    if (!confirm('멘토링을 승인하시겠습니까?'))
      return;

    Api.fetch(`/api/v1/mentoring/apply/${applyId}/accept?comment=${comment}`, 'POST')
      .then(() => {
        Alert.show('승인이 완료되었습니다');
        hideSimpleMentoring(applyId);
      })
      .finally(() => setIsVerified(false));
  }

  function DenyMentoring(comment: string) {
    if (!confirm('정말로 멘토링을 거절하시겠습니까?'))
      return;

    Api.fetch(`/api/v1/mentoring/apply/${applyId}/refuse?comment=${comment}`, 'POST')
      .then(() => {
        Alert.show('거절이 완료되었습니다');
        hideSimpleMentoring(applyId);
      })
      .finally(() => setIsVerified(false));
  }

  function setAcceptDialog(e: React.MouseEvent | Event) {
    e.stopPropagation();

    setApplyDialogInfo({
      func: AcceptMentoring,
      title: '멘토링',
      type: '승인',
    });
  }

  function setDenyDialog(e: React.MouseEvent | Event) {
    e.stopPropagation();

    setApplyDialogInfo({
      func: DenyMentoring,
      title: '멘토링',
      type: '거절',
    });
  }
  
  function clickMentorCard(e: React.MouseEvent | Event) {
    e.stopPropagation();
    navigate(`/team/${teamId}`);
  }

  return (
    <div className='mentor_card' onClick={clickMentorCard}>
      <Image src={null} dummyTitle={`teamID=${teamId}`}/>

      <div className='mentor_body_layout'>
        <h3>{`teamID=${teamId}`}</h3>

        <div className='mentor_tag_layout'>
          <h5>지원 내용</h5>
          <p>{content}</p>
        </div>

        <div className='mentor_tag_layout'>
          <h5>이메일</h5>
          <p>{email}</p>
        </div>

        <div className='mentor_tag_layout'>
          <h5>전화번호</h5>
          <p>{phoneNumber}</p>
        </div>

        <div className='review_layout'>
          <button className='stack'
                  disabled={isVerified}
                  onClick={setAcceptDialog}>
            승인하기
          </button>
          <button className='stack danger'
                  disabled={isVerified}
                  onClick={setDenyDialog}>
            거절하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleMentoringCard;