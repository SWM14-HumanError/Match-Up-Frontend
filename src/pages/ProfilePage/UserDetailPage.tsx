import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import UserImage from '../../components/UserImage.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import Footer from '../../components/Footer.tsx';
import InviteTeamDialog from '../../components/dialogLayout/InviteTeamDialog.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import MapRouter from '../../components/svgs/maps/MapRouter.tsx';
import PositionLevelsGraph from '../../components/svgs/PositionLevelsGraph.tsx';
import StackImage from '../../components/StackImage.tsx';
import OnlineSvg from '../../../assets/Online.svg';
import FreeSvg from '../../../assets/Free.svg';
import IsAuth from '../../../assets/IsAuth.svg';
import IsMentor from '../../../assets/IsMentor.svg';
import dataGen from '../../constant/dateGen.ts';
import authControl from '../../constant/authControl.ts';
import linkIcons from '../../constant/linkIcons.ts';
import {BigTechTypeEn, BigTechTypeKo} from '../../constant/selectOptions.ts';
import {InitFeedbackData, InitMyPageDetail} from '../../constant/initData.ts';
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
  const navigate = useNavigate();

  const [myPageDetail, setMyPageDetail] = useState<IMyPageDetail>(InitMyPageDetail);
  const [userFeedbacks, setUserFeedbacks] = useState<IFeedbackData>(InitFeedbackData);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<string|null>(FeedbackTypes[0]);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const tokenData = authControl.getInfoFromToken();
  const myID: number = tokenData ? tokenData.id : 0;
  const userId = params.userId ? Number(params.userId) : myID;

  useEffect(() => {
    if (userId <= 0) return;

    Api.fetch2Json(`/api/v1/profile/${userId}`)
      .then(res => setMyPageDetail(res))
      .catch(() => {
        if (!Api.goto404(navigate))
          setMyPageDetail(MyUserDetailDummy);
      });
  }, [params.userId]);

  useEffect(() => {
    if (userId <= 0) return;

    Api.fetch2Json(`/api/v1/profile/${userId}/feedbacks` + (feedbackType ? `/${feedbackType}` : ''))
      .then(res => setUserFeedbacks(res))
      .catch(() => setUserFeedbacks(InitFeedbackData));
  }, [params.userId, feedbackType]);

  function getLoginTime(last: string) {
      const LastLoginAHour = new Date(new Date(last).getTime() + (60 * 60 * 1000));
      const now = new Date().getTime();

      if (now < LastLoginAHour.getTime())
        return '온라인';
      return dataGen.getRelativeDate(LastLoginAHour + '');
  }

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
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
              {getLoginTime(myPageDetail.lastLogin)}
            </div>

            <div className='modify_button_layout'>
              { myID !== 0 && myID !== userId && (
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
                {myPageDetail.introduce.split('\n').map((v, i) => (
                  <span key={i}>{i !== 0 && (<br/>)} {v} </span>
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
              <div className='position_level_layout'>
                <div className='graph_layout'>
                  <PositionLevelsGraph userPositions={myPageDetail.userPositions}/>
                </div>
                <table className='tech_stack_rank_list'>
                  <thead>
                    <tr>
                      <th>분야</th>
                      <th>기술 스택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPageDetail.userPositions?.sort((a, b) => -Number(a.typeLevel > b.typeLevel))
                      .map((position, index) => (
                      <tr key={index}>
                        <td className='stack_title_td'>
                          <div>
                            <TierSvg width={15} height={20} tier={position.typeLevel ? position.typeLevel : 0}/>
                            <h3>{BigTechTypeKo[(BigTechTypeEn.length + BigTechTypeEn.indexOf(position.type)) % BigTechTypeEn.length]}</h3>
                          </div>
                        </td>
                        <td>
                          { !position.tags || position.tags.length === 0 ? (
                            <div>
                              <p>입력 된 기술 스택이 없습니다.</p>
                            </div>
                          ) : (
                            <ul className='tech_stack_list'>
                              {dataGen.getUniqueStrings(position.tags).map((stack, i) => (
                                <StackImage key={i} stack={dataGen.getTechStack(stack)}/>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='상호 평가'>
          { userFeedbacks.isFeedbackHider ? (
            <div className='contents_border'>
              <div className='list_no_contents'>
                <p>사용자가 평가를 숨겼습니다</p>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
            {!myPageDetail.meetingType ? (
              <div className='list_no_contents'>
                <p>입력 된 모임 장소 및 시간이 없습니다.</p>
              </div>
            ) : (
              <div className='position_layout'>
                <div className='map_layout'>
                  { myPageDetail.meetingType === 'ONLINE' ? (
                    <img src={OnlineSvg} alt=''/>
                  ): myPageDetail.meetingType === 'FREE' ? (
                    <img src={FreeSvg} alt=''/>
                  ) : (
                    <MapRouter locationName={myPageDetail.meetingAddress as string}/>
                  )}
                </div>
                <div>
                  <ul className='position_info_layout'>
                    {myPageDetail.meetingType && (
                      <li>
                        <h5>모임 방식</h5>
                        <span>{myPageDetail.meetingType}</span>
                      </li>
                    )}
                    {myPageDetail.meetingAddress && myPageDetail.meetingType === 'OFFLINE' && (
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
                { myPageDetail.projects?.map(project => (
                  <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
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
                { myPageDetail.studies?.map(project => (
                  <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
              </ul>
            )}
          </div>
        </DetailToggleBox>

        {myID === userId && (
          <div className='modify_button_layout'>
            <Link to='/update/profile' className='button'>수정하기</Link>
            {/*<Link to='/auth/mentor' className='button cancel'>멘토인증</Link>*/}
          </div>
        )}

      </div>

      <Footer/>
    </>
  );
}

export default UserDetailPage;