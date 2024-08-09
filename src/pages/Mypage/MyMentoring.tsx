import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import Footer from '@components/Footer.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import ApplySimpleContentsDialog from '@components/dialogLayout/ApplySimpleContentsDialog.tsx';
import MentorCard from '@components/cards/MentorCard.tsx';
import MentoringProjectCard from '@components/cards/MentoringProjectCard.tsx';
import useMentoringPopup from '@hooks/useMentoringPopup.ts';
import MentorDialog from '@components/dialogLayout/MentorDialog.tsx';
import SimpleMentoringCard from "@components/cards/SimpleMentoringCard.tsx";
import {IMentoring} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';


export interface ISimpleMentoring {
  applyId: number;
  content: string;
  phoneNumber: string;
  teamId: number;
  teamName: string;
  teamImageUrl: string|null;
  leaderId: number;
}

export interface IApplyDialogInfo {
  func: (_: string) => void;
  title: string;
  type: string;
}

function MyMentoring() {
  const [simpleMentoring, setSimpleMentoring] = useState<(ISimpleMentoring | null)[]>([]);
  const [myMentoring, setMyMentoring] = useState<(IMentoring | null)[]>([]);
  const [myActiveMentoring, setMyActiveMentoring] = useState<(IMentoring | null)[]>([]);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);
  const [applyDialogInfo, setApplyDialogInfo] = useState<IApplyDialogInfo>({
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

  function openDialog(data: IApplyDialogInfo) {
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

export default MyMentoring;