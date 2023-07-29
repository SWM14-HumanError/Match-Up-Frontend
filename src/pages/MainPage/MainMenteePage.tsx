import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from "../../components/svgs/Search.tsx";
import UserCard from "../../components/UserCard.tsx";
import {projects} from '../../dummies/dummyData.ts';
import '../../styles/MainProjectPage.scss';

function MainMenteePage() {
  return (
    <div>
      <Navigation isLogin={false}/>

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

          <div className='card_layout'>
            {projects.teamSearchResponseList.map((project) => (
              <UserCard key={project.id}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainMenteePage;