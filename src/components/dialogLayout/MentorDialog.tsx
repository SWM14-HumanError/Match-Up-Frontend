import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import Sharing from '../svgs/Sharing.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import UserImage from '../UserImage.tsx';
import {getTechListKor} from '../inputs/SelectStackLevel.tsx';
import {IMentorDetail} from '../../constant/interfaces.ts';
import {InitMentorDetail} from '../../constant/initData.ts';
import Api from '../../constant/Api.ts';
import '../../styles/dialogs/MentorDialog.scss';

interface IMentorDialog {
  mentorId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Todo: 멘토링 스택 API 연결
function MentorDialog({mentorId, isOpen, setIsOpen}: IMentorDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mentoringInfo, setMentoringInfo] = useState<IMentorDetail>(InitMentorDetail);

  useEffect(() => {
    setIsLoading(true);
    Api.fetch2Json('/api/v1/mentoring/{mentoringId}')
      .then(data => setMentoringInfo(data))
      .finally(() => setIsLoading(false));

    console.log(mentorId);
  }, [mentorId]);

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='mentor_dialog'>
          <div className='dialog_header'>
            <div>
              <h3>멘토링</h3>
            </div>
            <div>
              <button className='image_button'>
                <Sharing width={24} height={24}/>
              </button>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>
          <div className='dialog_content'>
            <div className='flex_layout'>
              <div className='user_info_layout'>
                <div className='user_layout'>
                  <UserImage profileImageURL={mentoringInfo.userPictureUrl}/>
                  <TierSvg width={15} height={20} tier={mentoringInfo.userLevel} />
                  <h4>{mentoringInfo.nickname} 멘토</h4>
                </div>

                <h3>{mentoringInfo.title}</h3>
                <div className='user_detail_info_layout'>
                  <h5>직무</h5>
                  <span>{getTechListKor(mentoringInfo.roleType)}</span>
                </div>
                <div className='user_detail_info_layout'>
                  <h5>경력</h5>
                  <span>{mentoringInfo.career}</span>
                </div>

                <ul className='user_stack_layout'>
                  <li>백엔드</li>
                  <li>서버 개발자</li>
                  <li>스프링</li>
                </ul>
              </div>

              <div className='portfolio_layout'>
                <button className='link'>포트폴리오</button>
                <img className='portfolio'
                     src={mentoringInfo.thumbnailUrl ?? 'https://via.placeholder.com/300x200'}
                     alt='portfolio'/>
                <div className='score_layout'>
                  <HeartCount count={mentoringInfo.likes}/>
                  <StarCount count={mentoringInfo.stars}/>
                </div>
              </div>
            </div>

            <p className='contents_box'>
              {mentoringInfo.content.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br/>
                </span>
              ))}
            </p>
          </div>
          <div className='dialog_footer'>
            <button onClick={() => setIsOpen(false)}>
              지원하기
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default MentorDialog;