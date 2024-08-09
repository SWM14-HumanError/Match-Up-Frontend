import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import SelectBox from '../inputs/SelectBox.tsx';
import StackImage from '../StackImage.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import StarCount from '../svgs/StarCount.tsx';
import UserImage from '../UserImage.tsx';
import Image from '../Image.tsx';
import useUserInfo from '@hooks/useUserInfo.ts';
import useMobile from '@hooks/useMobile.ts';
import {getTechListKor} from '../inputs/SelectStackLevel.tsx';
import {IMentorDetail} from '@constant/interfaces.ts';
import {InitMentorDetail} from '@constant/initData.ts';
import authControl from '@constant/authControl.ts';
import dataGen from '@constant/dateGen.tsx';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/dialogs/MentorDialog.scss';

interface IMentorDialog {
  mentoringId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hideMentorCard: () => void;
}

interface ISimpleTeam {
  teamId: number;
  title: string;
}

function MentorDialog({mentoringId, isOpen, setIsOpen, hideMentorCard}: IMentorDialog) {
  const location = useLocation();
  const navigate = useNavigate();
  const onTeam = location.pathname.includes('/team/');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mentoringInfo, setMentoringInfo] = useState<IMentorDetail>(InitMentorDetail);
  const [isApply, setIsApply] = useState<boolean>(false);

  const [teamList, setTeamList] = useState<ISimpleTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(-1);
  const [selectedTeamName, setSelectedTeamName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(mentoringInfo.nickname, mentoringInfo.userLevel);
  const {isMobile} = useMobile();
  
  const tokenInfo = authControl.getInfoFromToken();
  const myID = tokenInfo ? tokenInfo.id : '';
  const isLogin = !!myID;
  const email = tokenInfo ? tokenInfo.sub : '';

  useEffect(() => {
    if (mentoringId <= 0 || !isOpen) return;

    // initialize
    setIsApply(false);
    setTeamList([]);
    setSelectedTeamId(-1);
    setSelectedTeamName('');
    setPhoneNumber('');
    setIsPhoneNumberValid(false);
    setContent('');

    setIsLoading(true);
    Api.fetch2Json(`/api/v1/mentoring/${mentoringId}`)
      .then(data => setMentoringInfo(data))
      .finally(() => setIsLoading(false));
  }, [mentoringId, isOpen]);

  useEffect(() => {
    if (!isApply) return;

    Api.fetch2Json('/api/v1/mentoring/apply')
      .then(data => {
        setTeamList(data);
        if (data.length) {
          setSelectedTeamId(data[0].teamId);
          setSelectedTeamName(data[0].title);
        }
      });
  }, [isApply]);

  function validatePhoneNumber(str: string = phoneNumber) {
    const regex = /^01(?:0|1|[6-9])[-]?(?:\d{3}|\d{4})[-]?\d{4}$/;
    return regex.test(str);
  }

  function openTrigger(isOpen: boolean) {
    if (isOpen) return;
    navigate(location.pathname);
    setIsOpen(isOpen);
  }

  function applyThisMentoring() {
    Api.fetch(`/api/v1/mentoring/${mentoringId}/apply`, 'POST', {
      teamId: selectedTeamId,
      phoneNumber: phoneNumber,
      email: email,
      content: content,
    })
      .then(() => {
        Alert.show('지원이 완료되었습니다');
        openTrigger(false);
      });
  }

  function deleteThisMentoring() {
    if (!confirm('멘토링을 정말로 삭제하시겠습니까?\n삭제하면 다시 되돌릴 수 없습니다.'))
      return;

    Api.fetch(`/api/v1/mentoring/${mentoringId}`, 'DELETE')
      .then(() => {
        Alert.show('멘토링이 삭제되었습니다');
        hideMentorCard();
        openTrigger(false);
      })
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={openTrigger} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div id='mentor_dialog'>
          <div className='dialog_header'>
            <div>
              <h3>멘토링</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => openTrigger(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>
          <div className='dialog_content'>
            {isMobile && (
              <div className='portfolio_layout'>
                {/*<button className='link'>포트폴리오</button>*/}
                <Image className='portfolio' src={mentoringInfo.thumbnailUrl} dummyTitle={mentoringInfo.title}/>
                <div className='score_layout'>
                  <HeartCount count={mentoringInfo.likes}/>
                  <StarCount count={mentoringInfo.stars}/>
                </div>
              </div>
            )}
            <div className='flex_layout'>
              <div className='user_info_layout'>
                <div className='user_layout' onClick={() => navigate(isAvailableUser ? `/profile/${mentoringInfo.mentorId}` : '')}>
                  <UserImage profileImageURL={mentoringInfo.userPictureUrl} isAvailableUser={isAvailableUser}/>
                  <div>
                    <TierSvg width={20} height={20} tier={fixedPositionLevel}/>
                    <h4>{fixedNickname} 멘토</h4>
                  </div>
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

                <br/>
                <h3>사용하는 기술 스택</h3>
                {mentoringInfo.stacks.length <= 0 ? (
                  <p>기술 스택이 없습니다.</p>
                ) : (
                  <>
                    <ul className='user_stack_layout'>
                      {dataGen.getUniqueTechStacks(
                        mentoringInfo.stacks.map(stack => dataGen.getTechStack(stack))
                      ).map((stack, index) => (
                        <li key={index}><StackImage stack={stack}/></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {!isMobile && (
                <div className='portfolio_layout'>
                  {/*<button className='link'>포트폴리오</button>*/}
                  <Image className='portfolio' src={mentoringInfo.thumbnailUrl} dummyTitle={mentoringInfo.title}/>
                  <div className='score_layout'>
                    <HeartCount count={mentoringInfo.likes}/>
                    <StarCount count={mentoringInfo.stars}/>
                  </div>
                </div>
              )}
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

          {!isApply ? (
            <div className='dialog_footer button_layout'>
              {myID === mentoringInfo.mentorId ? (
                <>
                  <button onClick={() => navigate(`/update/mentoring/${mentoringId}`)}>
                    수정하기
                  </button>
                  <button className='danger' onClick={deleteThisMentoring}>
                    삭제하기
                  </button>
                </>
              ) : !onTeam && isLogin && (
                <button onClick={() => setIsApply(true)}>
                  지원하기
                </button>
              )}
            </div>
          ) : (
            <>
              <div className='dialog_content application'>
                <h2>지원하기</h2>

                <h3>지원할 팀</h3>
                {teamList.length ? (
                  <SelectBox options={teamList.map(v => v.title)}
                             value={selectedTeamName}
                             hasDefault={false}
                             onChange={(value, index) => {
                               setSelectedTeamName(value);
                               setSelectedTeamId(teamList[index].teamId);
                             }}/>
                ) : (
                  <p className='danger'>지원할 수 있는 팀이 없습니다</p>
                )}

                <h3>전화번호</h3>
                <input type='text'
                       value={phoneNumber}
                       onChange={e => {
                         setPhoneNumber(e.target.value);
                         setIsPhoneNumberValid(validatePhoneNumber(e.target.value));
                       }}/>
                {!isPhoneNumberValid && (<p className='danger'>전화번호룰 정확히 입력해주세요. (01x-xxxx-xxxx)</p>)}

                <h3>남길 말</h3>
                <input type='text'
                       value={content}
                       maxLength={19}
                       onChange={e => setContent(e.target.value)}/>

              </div>

              <div className='dialog_footer button_layout'>
                <button onClick={applyThisMentoring}
                        disabled={selectedTeamId < 0 || !validatePhoneNumber() || !content}>
                  지원하기
                </button>
                <button className='cancel' onClick={() => openTrigger(false)}>
                  취소하기
                </button>
              </div>
            </>
          )}

        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default MentorDialog;