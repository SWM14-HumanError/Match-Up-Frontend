import {useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import UserCard from '../../components/cards/UserCard.tsx';
import Footer from '../../components/Footer.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import InfScroll from '../../constant/InfScroll.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';

function MyLike() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const likeProject = useMoreInfo('/api/v1/likes/mylike/project', 'teamSearchResponseList');
  const likeStudy = useMoreInfo('/api/v1/likes/mylike/study', 'teamSearchResponseList');
  const likeUser = useMoreInfo('/api/v1/likes/mylike/user', 'userCardResponses');

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>

      <div className='main_layout mypage_team_layout'>
        <div className='project'>
          <div className='header_flex'>
            <div className='header_layout'>
              <h2>좋아요 한 프로젝트</h2>
            </div>
          </div>

          <div className='card_layout'>
            {!likeProject.data.teamSearchResponseList.length ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 프로젝트가 없습니다.</p>
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
              <h2>좋아요 한 스터디</h2>
            </div>
          </div>

          <div className='card_layout'>
            {!likeStudy.data.teamSearchResponseList?.length ? (
              <div className='list_no_contents'>
                <p>아직 좋아요 한 스터디가 없습니다.</p>
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
            {!likeUser.data.userCardResponses?.length ? (
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
      </div>

      <Footer/>
    </>
  );
}

interface IInitData {
  teamSearchResponseList: any[];
  userCardResponses: any[];
  size: number;
  hasNextSlice: boolean;
}

const InitData: IInitData = {teamSearchResponseList:[], userCardResponses:[], size: 0, hasNextSlice: true}
const DefaultPageSize = 6;

function useMoreInfo(apiUrl: string, tagName: 'teamSearchResponseList'|'userCardResponses') {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(InitData);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchNextData().then();
  }, []);

  function loadMoreData() {
    fetchNextData().then();
  }

  async function fetchNextData() {
    // console.log('loadMoreData', searchParams.page);
    if (loading || !data.hasNextSlice) return; // 이미 로딩 중이면 중복 호출 방지

    setLoading(true);
    try {
      const newData :any = await Api.fetch2Json(apiUrl + `?page=${page}&size=${DefaultPageSize}`);

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

  return {data, loadMoreData};
}

export default MyLike;
