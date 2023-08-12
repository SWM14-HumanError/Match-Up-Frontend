import {useEffect, useRef, useState} from 'react';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from '../../components/svgs/Search.tsx';
import UserCard from '../../components/cards/UserCard.tsx';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import {IUserCardList} from '../../constant/interfaces.ts';
import {mentees as dummyMentees} from '../../dummies/dummyData.ts';
import {InitUser} from '../../constant/initData.ts';
import '../../styles/MainProjectPage.scss';

function MainMenteePage() {
  const [menteeData, setMenteeData] = useState<IUserCardList>(InitUser);
  const [loading, setLoading] = useState(false);
  const infScrollLayout = useRef<HTMLDivElement>(null);
  let page = 0; // Todo : 처음 mount 되었을 때, page 관리가 잘 될 수 있도록 하자 : 질문 하기

  // 스크롤 이벤트 리스너
  const handleScroll = () => {
    const scrolledHeight = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const componentHeight = infScrollLayout?.current?.clientHeight;

    if (menteeData.hasNextSlice && (
        scrolledHeight + windowHeight >= documentHeight ||
        componentHeight && componentHeight < windowHeight)) {
      // console.log('새로운 데이터 로드');
      loadMoreData(page);
    }
  };

  // 추가 데이터 로드 함수
  const loadMoreData = async (prevPage: number) => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지

    setLoading(true);
    try {
      const response = await fetch('/api/v1/list/user?page=' + page);
      const newData :IUserCardList = await response.json();

      setMenteeData(prevData => ({
        userCardResponses: [...prevData.userCardResponses, ...newData.userCardResponses],
        size: prevData.size + 1,
        hasNextSlice: newData.hasNextSlice
      }));
      page = prevPage + 1;
    }
    catch (e) {
      setMenteeData(prevData => ({
        userCardResponses: [...prevData.userCardResponses, ...dummyMentees],
        size: prevData.size + 1,
        hasNextSlice: false
      }));
    }
    finally {
      setLoading(false);
    }
  };

  useEffect( () => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
    console.log('height', infScrollLayout?.current?.clientHeight);
  }, [infScrollLayout?.current?.clientHeight]);

  useEffect(() => {
    console.log('새로운 데이터 로드 완료', menteeData.userCardResponses.length);
  }, [menteeData.userCardResponses]);

  return (
    <div>
      <Navigation/>

      <div className='banner'>
        <div>
          <h1>
            우리 모임과 함께할 <br/>
            멘티분을 구해요
          </h1>
          <p>
            MatchUp은 프로젝트/스터디의 팀원과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 팀원을 구해보세요!
          </p>

        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <div className='header_layout'>
            <h2>팀원</h2>
            <span>나에게 맞는 팀원를 구해보세요 🔥</span>
          </div>
          <div className='search_layout'>
            <SelectBox options={['프로젝트', '스터디']}/>
            <SelectBox options={['프로젝트', '스터디']}/>
            <button><Search/></button>
          </div>

          <div className='card_layout'
               ref={infScrollLayout}>
            {menteeData.userCardResponses.map((mentee, index) => (
              <UserCard key={index} {...mentee}/>
            ))}
            {loading && <LoadingComponent/>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainMenteePage;