// import {useEffect, useState} from 'react';

import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import MentorCard from "../../components/MentorCard.tsx";
import {mentors} from '../../dummies/dummyData.ts';
import '../../styles/MainProjectPage.scss';
import Search from "../../components/svgs/Search.tsx";

function MainMentorPage() {
  // const { user } = useContext(AuthContext);
  // const [mentors, setMentors] = useState<Mentor[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const getMentors = async () => {
  //     const mentors = await getMentorsByUser(user);
  //     setMentors(mentors);
  //     setLoading(false);
  //   };
  //   getMentors();
  // }, [user]);

  return (
    <div>
      <Navigation isLogin={false}/>

      <div className='banner image02'>
        <div>
          <h1>
            우리 모임을 이끌어주실 <br/>
            멘토분을 구해요
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
            <h2>멘토</h2>
            <span>나에게 맞는 멘토를 구해보세요 🔥</span>
          </div>
          <div className='search_layout'>
            <SelectBox options={['프로젝트', '스터디']}/>
            <SelectBox options={['프로젝트', '스터디']}/>
            <button><Search/></button>
          </div>

          <div className='card_layout'>
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id}
                          mentorId={mentor.id}
                          mentorDescription={mentor.description}
                          mentorImage={mentor.thumbnailUrl}
                          mentorName={mentor.name}
                          heart={mentor.heart}
                          star={mentor.star}/>
            ))}
          </div>
        </div>
      </div>

      {/*{loading ? (*/}
      {/*  <p>Loading...</p>*/}
      {/*) : (*/}
      {/*  <div>*/}
      {/*    /!*{mentors.map((mentor) => (*!/*/}
      {/*    /!*  <MentorCard key={mentor.id} mentor={mentor} />*!/*/}
      {/*    /!*))}*!/*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}

export default MainMentorPage;