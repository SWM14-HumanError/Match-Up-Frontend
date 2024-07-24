import {useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import UserCard from '../../components/cards/UserCard.tsx';
import MentorCard from '../../components/cards/MentorCard.tsx';
import {IMentoring, ITeamProjectSummary, IUser} from '../../constant/interfaces.ts';
import Footer from '../../components/Footer.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import useMentoringPopup from '../../hooks/useMentoringPopup.ts';
import MentorDialog from '../../components/dialogLayout/MentorDialog.tsx';
import InfScroll from '../../constant/InfScroll.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';


function MyLike() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const likeProject = useMoreInfo('/api/v1/likes/mylike/project', 'teamSearchResponseList');
  const likeStudy = useMoreInfo('/api/v1/likes/mylike/study', 'teamSearchResponseList');
  const likeUser = useMoreInfo('/api/v1/likes/mylike/user', 'userCardResponses');
  // const likeMentoring = useMoreInfo('/api/v1/mentoring/likes', 'userCardResponses');
  const [likeMentoring, setLikeMentoring] = useState<IMentoring[]>([]);
  const mentoringPopup = useMentoringPopup(likeMentoring);


  useEffect(() => {
    Api.fetch2Json('/api/v1/mentoring/likes')
      .then((data) => setLikeMentoring(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <MentorDialog {...mentoringPopup} hideMentorCard={() => {}}/>
      <Navigation/>

      <div className='main_layout mypage_team_layout'>
        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>좋아요 한 기업 프로젝트</h2>
            </div>
          </div>

          <div className='card_layout'>
            {likeProject.isEmpty ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 기업 프로젝트가 없습니다.</p>
              </div>
            ) : (
              <div>
                {likeProject.data.teamSearchResponseList.map(project => project && (
                  <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
              </div>
            )}
            { likeProject.data.hasNextSlice &&
              <button className='more_button' onClick={likeProject.loadMoreData}>더보기</button> }
          </div>
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>좋아요 한 개인 프로젝트</h2>
            </div>
          </div>

          <div className='card_layout'>
            {likeStudy.isEmpty ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 개인 프로젝트가 없습니다.</p>
              </div>
            ) : (
              <div>
                {likeStudy.data.teamSearchResponseList.map(project => project && (
                  <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
              </div>
            )}
            { likeStudy.data.hasNextSlice &&
              <button className='more_button' onClick={likeStudy.loadMoreData}>더보기</button> }
          </div>
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>좋아요 한 유저</h2>
            </div>
          </div>

          <div className='card_layout'>
            {likeUser.isEmpty ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 유저가 없습니다.</p>
              </div>
            ) : (
              <div>
                {likeUser.data.userCardResponses.map(user => user && (
                  <UserCard key={user.userID} {...user} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
              </div>
            )}
          </div>
          { likeUser.data.hasNextSlice &&
            <button className='more_button' onClick={likeUser.loadMoreData}>더보기</button> }
        </div>

        <div className='study'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>좋아요 한 멘토링</h2>
            </div>
          </div>

          <div className='card_layout'>
            {!likeMentoring.length ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 멘토링이 없습니다.</p>
              </div>
            ) : (
              <div>
                {likeMentoring.map(mentoring => mentoring && (
                  <MentorCard key={mentoring.mentoringId} {...mentoring} setLoginDialog={setIsLoginDialogOpen}/>
                ))}
              </div>
            )}
          </div>
          {/*{ likeMentoring.data.hasNextSlice &&*/}
          {/*  <button className='more_button' onClick={likeUser.loadMoreData}>더보기</button> }*/}
        </div>
      </div>

      <Footer/>
    </>
  );
}

interface IInitData {
  teamSearchResponseList: Array<ITeamProjectSummary|undefined|null>;
  userCardResponses: Array<IUser|undefined|null>;
  size: number;
  hasNextSlice: boolean;
}

const InitData: IInitData = {teamSearchResponseList:[], userCardResponses:[], size: 0, hasNextSlice: true}
const DefaultPageSize = 6;

function useMoreInfo(apiUrl: string, tagName: 'teamSearchResponseList'|'userCardResponses') {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(InitData);
  const [page, setPage] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    fetchNextData().then();
  }, []);

  useEffect(() => {
    if (!data.teamSearchResponseList && !data.userCardResponses)
      setIsEmpty(true);
    setIsEmpty(!data.teamSearchResponseList.some(v => !!v) && !data.userCardResponses.some(v => !!v));
  }, [data.teamSearchResponseList, data.userCardResponses]);

  function loadMoreData() {
    fetchNextData().then();
  }

  async function fetchNextData() {
    // console.log('loadMoreData', searchParams.page);
    if (loading || !data.hasNextSlice) return; // 이미 로딩 중이면 중복 호출 방지

    setLoading(true);
    try {
      // Todo: newData any 속성 제거
      const newData = await Api.fetch2Json(apiUrl + `?page=${page}&size=${DefaultPageSize}`);

      const startArrIndex = DefaultPageSize * page;
      const ArrSize = startArrIndex + newData.size;

      setData(prevData => ({
        ...prevData,
        [tagName]:
          InfScroll.getExpandArray(
            prevData[tagName],
            newData[tagName],
            startArrIndex, ArrSize),
        size: ArrSize,
        hasNextSlice: newData.hasNextSlice
      }));

      setPage(page + 1);
    }
    catch (e) {
      console.error(e, data.hasNextSlice);

      setData(prevData => ({
        ...prevData,
        [tagName]: !prevData[tagName].length ? InitData[tagName] : prevData[tagName],
        size: prevData.size + 1,
        hasNextSlice: false
      }));
    }
    finally {
      setLoading(false);
    }
  }

  return {data, loadMoreData, isEmpty};
}

export default MyLike;
