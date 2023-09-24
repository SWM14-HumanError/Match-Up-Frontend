import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import UserImage from '../../components/UserImage.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import InviteTeamDialog from '../../components/dialogLayout/InviteTeamDialog.tsx';
import IsAuth from '../../../assets/IsAuth.svg';
import IsMentor from '../../../assets/IsMentor.svg';
import dataGen from '../../constant/dateGen.ts';
import authControl from '../../constant/authControl.ts';
import linkIcons from '../../constant/linkIcons.ts';
import {InitMyPageDetail} from '../../constant/initData.ts';
import {MyUserDetailDummy} from '../../dummies/dummyData.ts';
import {IFeedbackData, IMyPageDetail} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';
import '../../styles/pages/UserDetailPage.scss';


const FeedbackTypes = [null, 'GREAT', 'NORMAL', 'BAD'];
const FeedbackTypeNames = ['전체', '좋아요', '보통이에요', '별로에요'];

function UserDetailPage() {
  const params = useParams();

  const [myPageDetail, setMyPageDetail] = useState<IMyPageDetail>(InitMyPageDetail);
  const [userFeedbacks, setUserFeedbacks] = useState<IFeedbackData>(({detailFeedbacks: []}));
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<string|null>(FeedbackTypes[0]);

  const tokenData = authControl.getInfoFromToken();
  const myID: number = tokenData ? tokenData.id : 0;
  const userId = params.userId ? Number(params.userId) : myID;

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userId}`)
      .then(res => setMyPageDetail(res))
      .catch(() => setMyPageDetail(MyUserDetailDummy));
  }, [params.userId]);

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userId}/feedbacks` + (feedbackType ? `/${feedbackType}` : ''))
      .then(res => setUserFeedbacks(res))
      .catch(() => setUserFeedbacks({detailFeedbacks: []}));
  }, [params.userId, feedbackType]);


  // Todo: 링크 연결, 초대 기능, 1:1 대화 기능 -> 링크 어떤식으로 입력 할 건지, 인증/멘토 뱃지 만들기
  return (
    <>
      <InviteTeamDialog targetUserId={userId} isOpen={isInviteDialogOpen} setIsOpen={setIsInviteDialogOpen} />
      <Navigation/>

      <div className='main_layout project_detail_page'>
        <div className='user_detail_header'>
          <UserImage profileImageURL={myPageDetail.pictureUrl}/>
          <div className='user_detail_info'>
            <div>
              <TierSvg width={15} height={20} tier={myPageDetail.bestPositionLevel ? myPageDetail.bestPositionLevel : 0}/>
              <h3>{myPageDetail.nickname}</h3>
              {myPageDetail.isAuth && (<img className='badge' src={IsAuth} alt=''/>)}
              {myPageDetail.isMentor && (<img className='badge' src={IsMentor} alt=''/>)}
            </div>

            <div className='user_detail_info'>
              <ul className='user_links'>
                {Object.keys(myPageDetail.snsLinks).map((key) => {
                  const linkInfo = linkIcons.getLinkIcon(key);

                  return (
                    <li key={key}>
                      <button className='circle_link'
                              style={{ backgroundColor: linkInfo?.background }}
                              onClick={() => window.location.href = myPageDetail.snsLinks[key] as string}>
                        <img src={`https://cdn.simpleicons.org/${linkInfo?.tag}/${linkInfo?.color}`}
                             alt={linkInfo?.tag}/>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h3>마지막 로그인 : </h3>
              <p>{dataGen.getRelativeDate(myPageDetail.lastLogin)}</p>
            </div>

            <div className='modify_button_layout'>
              { myID !== userId && (
                <button className='stack'
                        onClick={() => setIsInviteDialogOpen(true)}>
                  모임 초대
                </button>
              )}
            </div>
          </div>

        </div>
        
        <hr/>

        <DetailToggleBox title='소개'>
          <div className='contents_border'>
            {!myPageDetail.introduce ? (
              <div className='list_no_contents'>
                <p>아직 소개가 없습니다.</p>
              </div>
            ) : (
              <p>
                {myPageDetail.introduce.split('\n').map((line, index) => (
                  <span key={index}>{line}<br/></span>
                ))}
              </p>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='기술 능력치'>
          <div className='contents_border'>
            {!myPageDetail.userPositions?.length ? (
              <div className='list_no_contents'>
                <p>입력 된 기술 능력치가 없습니다.</p>
              </div>
            ) : (
              <ul className='scroll_layout tech_stack_rank_list'>
                {myPageDetail.userPositions?.map((position, index) => (
                  <li key={index}>
                    <TierSvg width={15} height={20} tier={position.positionLevel ? position.positionLevel : 0}/>
                    <h3>{position.positionName}</h3>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='상호 평가'>
          <ul className='tech_stack_list scroll_layout'>
            <li><button
              className={!feedbackType ? 'selected' : ''}
              onClick={() => setFeedbackType(FeedbackTypes[0])}>
              전체
            </button></li>
            {FeedbackTypeNames.slice(1).map((role, index) => (
              <li key={index}>
                <button
                  className={feedbackType == FeedbackTypes[index+1] ? 'selected' : ''}
                  onClick={() => setFeedbackType(FeedbackTypes[index+1])}>
                  {role}
                </button>
              </li>
            ))}
          </ul>

          <div className='contents_border'>
            { userFeedbacks.detailFeedbacks?.length === 0 ? (
              <div className='list_no_contents'>
                <p>아직 진행된 평가가 없습니다</p>
              </div>
            ) : (
              <ul className='feedback_layout scroll_layout'>
                { userFeedbacks.detailFeedbacks.map((contents, i) => (
                  <li className='project_detail_team_member' key={i}>
                    {contents}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
            {!myPageDetail.meetingType ? (
              <div className='list_no_contents'>
                <p>입력 된 모임 장소 및 시간이 없습니다.</p>
              </div>
            ) : (
              <div className='position_layout'>
                <img src='/assets/map_sample.png' alt='지도'/>
                <div>
                  <ul className='position_info_layout'>
                    {myPageDetail.meetingType && (
                      <li>
                        <h5>모임 방식</h5>
                        <span>{myPageDetail.meetingType}</span>
                      </li>
                    )}
                    {myPageDetail.meetingAddress && (
                      <li>
                        <h5>주소</h5>
                        <span>{myPageDetail.meetingAddress}</span>
                      </li>
                    )}
                    {myPageDetail.meetingTime && (
                      <li>
                        <h5>시간</h5>
                        <span>{myPageDetail.meetingTime}</span>
                      </li>
                    )}
                    {myPageDetail.meetingNote && (
                      <li>
                        <h5>기타</h5>
                        <span>{myPageDetail.meetingNote}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='진행한 프로젝트'>
          <div className='contents_border'>
            { myPageDetail.projects?.length === 0 ? (
              <div className='list_no_contents'>
                <p>진행한 프로젝트가 없습니다.</p>
              </div>
            ) : (
              <ul className='project_list scroll_layout'>
                { myPageDetail.projects?.slice(0,2).map(project => (
                  <ProjectCard key={project.id} {...project}/>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='진행한 스터디'>
          <div className='contents_border'>
            { myPageDetail.studies?.length === 0 ? (
              <div className='list_no_contents'>
                <p>진행한 스터디가 없습니다.</p>
              </div>
            ) : (
              <ul className='project_list scroll_layout'>
                { myPageDetail.studies?.slice(0,2).map(project => (
                  <ProjectCard key={project.id} {...project}/>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        {myID === userId && (
          <div className='modify_button_layout'>
            <Link to='/update/profile' className='button'>수정하기</Link>
            <Link to='/auth/mentor' className='button cancel'>멘토인증</Link>
          </div>
        )}

      </div>

      <Footer/>
    </>
  );
}

export default UserDetailPage;