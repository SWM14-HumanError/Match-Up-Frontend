import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import UserImage from '../../components/UserImage.tsx';
import DetailToggleBox from '../../components/DetailToggleBox.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import authControl from '../../constant/authControl.ts';
import {InitMyPageDetail} from '../../constant/initData.ts';
import {MyUserDetailDummy} from '../../dummies/dummyData.ts';
import {IMyPageDetail} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ProjectDetailPage.scss';
import '../../styles/pages/UserDetailPage.scss';

function UserDetailPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [myPageDetail, setMyPageDetail] = useState<IMyPageDetail>(InitMyPageDetail);

  const tokenData = authControl.getInfoFromToken();
  const myID: number = tokenData ? tokenData.id : 0;
  const userId = params.userId ? Number(params.userId) : myID;

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userId}`)
      .then(res => setMyPageDetail(res))
      .catch(() => setMyPageDetail(MyUserDetailDummy));
  }, [params.userId]);

  return (
    <>
      <Navigation/>

      <div className='main_layout project_detail_page'>
        <div className='user_detail_header'>
          <UserImage profileImageURL={myPageDetail.pictureUrl}/>
          <div className='user_detail_info'>
            <TierSvg width={15} height={20} tier={myPageDetail.bestPositionLevel ? myPageDetail.bestPositionLevel : 0}/>
            <h3>{myPageDetail.nickname}</h3>
          </div>

          <div className='modify_button_layout'>
            <button>모임 초대</button>
            <button className='cancel'>1:1 대화</button>
          </div>
        </div>
        
        <hr/>

        <DetailToggleBox title='소개'>
          <div className='contents_border'>
            <p>
              {myPageDetail.introduce && myPageDetail.introduce.split('\n').map((line, index) => (
                <span key={index}>{line}<br/></span>
              ))}
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='기술 능력치'>
          <div className='contents_border'>
            <ul className='scroll_layout tech_stack_rank_list'>
              {myPageDetail.userPositions?.map((position, index) => (
                <li key={index}>
                  <TierSvg width={15} height={20} tier={position.positionLevel ? position.positionLevel : 0}/>
                  <h3>{position.positionName}</h3>
                </li>
              ))}
            </ul>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='상호 평가'>
          <div className='contents_border'>
            별점 : 4.5
            <p>
              팀원이 아직 평가를 하지 않았습니다.
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='모임 장소 및 시간'>
          <div className='contents_border'>
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
                <ul>
                  {myPageDetail.ghLink && (
                    <li><button onClick={() => navigate(myPageDetail.ghLink ? myPageDetail.ghLink : '')}>깃허브 링크</button></li>
                  )}
                  {myPageDetail.openChatLink && (
                    <li><button onClick={() => navigate(myPageDetail.openChatLink ? myPageDetail.openChatLink : '')}>오픈채팅 링크</button></li>
                  )}
                </ul>
              </div>
            </div>
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
            { myPageDetail.projects?.length === 0 ? (
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
    </>
  );
}

export default UserDetailPage;