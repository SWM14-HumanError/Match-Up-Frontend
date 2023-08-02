import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import LoadingLayout from '../LoadingLayout.tsx';
import Sharing from '../svgs/Sharing.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import '../../styles/dialogs/MentorDialog.scss';

interface IMentorDialog {
  mentorId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MentorDialog({mentorId, isOpen, setIsOpen}: IMentorDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
                  <img className='user_image'
                       src='https://avatars.githubusercontent.com/u/48755175?v=4'
                       alt='user image'/>
                  <TierSvg width={15} height={20} tier={3} />
                  <h4>

                    김민수
                  </h4>
                  <h4>멘토</h4>
                </div>

                <h3>클라우드 개발자의 모든 것 (개발, 역량, 직무, 커리어, 취업 등)</h3>
                <div className='user_detail_info_layout'>
                  <h5>직무</h5>
                  <span>프론트엔드 개발자</span>
                </div>
                <div className='user_detail_info_layout'>
                  <h5>경력</h5>
                  <span>미들 (4~8년)</span>
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
                     src='https://picsum.photos/200/300'
                     alt='portfolio'/>
                <div className='score_layout'>
                  <HeartCount count={1}/>
                  <StarCount count={2}/>
                </div>
              </div>
            </div>

            <p className='contents_box'>
              NHN, 크래프톤, 넷마블 등의 회사에서 백엔드 개발과, 게임 서버 개발을 해온 19년차 개발자입니다. <br/>
              다음과 같은 내용을 주로 도와드리며, 이외에도 백엔드 개발 관련 상담은 대부분 가능합니다. <br/>
              공채 면접관, 기술 면접관에 다수 참여하였으며, 공채 및 신입/주니어를 직접적으로 케어한 여러번의 경험이 있습니다.
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