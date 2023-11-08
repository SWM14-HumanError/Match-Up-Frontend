import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import ApplySimpleContentsDialog from '../../components/dialogLayout/ApplySimpleContentsDialog.tsx';
import MentorCard from '../../components/cards/MentorCard.tsx';
import MentoringProjectCard from '../../components/cards/MentoringProjectCard.tsx';
import useMentoringPopup from '../../hooks/useMentoringPopup.ts';
import MentorDialog from '../../components/dialogLayout/MentorDialog.tsx';
import {IMentoring} from '../../constant/interfaces.ts';
import Alert from '../../constant/Alert.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';


interface ISimpleMentoring {
  applyId: number;
  content: string;
  email: string;
  phoneNumber: string;
  teamId: number;
}

// Todo: ISimpleMentoring 디자인
function MyMentoring() {
  const [simpleMentoring, setSimpleMentoring] = useState<(ISimpleMentoring | null)[]>([]);
  const [myMentoring, setMyMentoring] = useState<(IMentoring | null)[]>([]);
  const [myActiveMentoring, setMyActiveMentoring] = useState<(IMentoring | null)[]>([]);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);
  const [applyDialogInfo, setApplyDialogInfo] = useState({
    func: (_: string) => {
    },
    title: '',
    type: '',
  })

  const mentoringPopup = useMentoringPopup(myMentoring);

  useEffect(() => {
    Api.fetch2Json('/api/v1/mentoring/mine')
      .then(data => {
        setMyMentoring(data)
      });

    Api.fetch2Json('/api/v1/mentor/active')
      .then(data => {
        setMyActiveMentoring(data)
      });

    Api.fetch2Json('/api/v1/mentoring/apply/list')
      .then(data => {
        setSimpleMentoring(data)
      });
  }, []);

  function openDialog(data: any) {
    setApplyDialogInfo(data);
    setIsApplyDialogOpen(true);
  }

  function hideData(cardIndex: number) {
    setMyMentoring(prev => prev.map((v, index) => index === cardIndex ? null : v));
  }

  function hideSimpleMentoring(applyId: number) {
    const index = simpleMentoring.findIndex((v: ISimpleMentoring | null) => !!v && applyId === v.applyId);
    setSimpleMentoring(prev => prev.map((v, i) => i === index ? null : v));
  }

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen}
                            setIsOpen={setIsLoginDialogOpen}/>
      <ApplySimpleContentsDialog clickFunc={applyDialogInfo.func}
                                 titleString={applyDialogInfo.title}
                                 typeString={applyDialogInfo.type}
                                 isOpen={isApplyDialogOpen}
                                 setIsOpen={setIsApplyDialogOpen}/>
      <MentorDialog {...mentoringPopup}
                    hideMentorCard={() => hideData(mentoringPopup.selectedCardIndex)}/>

      <Navigation/>

      <div className='main_layout mypage_team_layout'>
        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>승인 대기중인 멘토링</h2>
            </div>

            {/*<Link to='/create/mentoring'>멘토링 만들기</Link>*/}
          </div>

          <div className='card_layout'>
            {!simpleMentoring.length || !simpleMentoring.some(v => v) ? (
              <div className='list_no_contents'>
                <p>아직 승인 대기중인 멘토링이 없습니다.</p>
              </div>
            ) : (
              <div>
                {simpleMentoring.map((mentoring) => mentoring && (
                  <SimpleMentoringCard key={mentoring.applyId}
                                       {...mentoring}
                                       setApplyDialogInfo={openDialog}
                                       hideSimpleMentoring={hideSimpleMentoring}/>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>내 멘토링</h2>
            </div>
            <Link to='/create/mentoring'>멘토링 만들기</Link>
          </div>

          <div className='card_layout'>
            {!myMentoring.length || !myMentoring.some(v => v) ? (
              <div className='list_no_contents'>
                <p>아직 내가 만든 멘토링이 없습니다.</p>
              </div>
            ) : (
              <div>
                {myMentoring.map((mentoring, index) => mentoring && (
                  <MentorCard key={index}
                              {...mentoring}
                              setLoginDialog={setIsLoginDialogOpen}
                              hideMentoring={() => setMyMentoring(prev => prev.map((v, i) => index === i ? null : v))}/>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>진행중인 멘토링</h2>
            </div>
          </div>

          <div className='card_layout'>
            {!myActiveMentoring.length || !myActiveMentoring.some(v => v) ? (
              <div className='list_no_contents'>
                <p>진행중인 멘토링이 없습니다.</p>
              </div>
            ) : (
              <div>
                {myActiveMentoring.map((mentoring, index) => mentoring && (
                  <MentoringProjectCard key={index}
                                        {...mentoring}
                                        setLoginDialog={setIsLoginDialogOpen}
                                        hideMentoring={() => setMyActiveMentoring(prev => prev.map((v, i) => index === i ? null : v))}/>
                ))}
              </div>
            )}
          </div>
        </div>


      </div>

      <Footer/>
    </>
  );
}

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

  function setAcceptDialog() {
    setApplyDialogInfo({
      func: AcceptMentoring,
      title: '멘토링',
      type: '승인',
    });
  }

  function setDenyDialog() {
    setApplyDialogInfo({
      func: DenyMentoring,
      title: '멘토링',
      type: '거절',
    });
  }

  return (
    <div>
      <div>{applyId}</div>
      <div>{content}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
      <div>{teamId}</div>

      <div>
        <button disabled={isVerified} onClick={setAcceptDialog}>승인하기</button>
        <button className='danger' disabled={isVerified} onClick={setDenyDialog}>거절하기</button>
      </div>
    </div>
  )
}

export default MyMentoring;