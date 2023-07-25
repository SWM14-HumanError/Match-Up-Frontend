import Navigation from "../components/Navigation.tsx";
import MentorCard from "../components/MentorCard.tsx";
import {mentors} from "../dummies/dummyData.ts";

function ProjectDetailPage() {
  // const { projectId } = useParams();
  return (
    <>
      <Navigation isLogin={false}/>

      <div className='main_layout'>
        <div className='project_detail_header'>
          <span>사이트프로젝트 / 웹앱</span>
          <h1>미니 소마 플랫폼</h1>
          <div className='user_info'>
            <img src='' alt='user profile'/>
            <div>
              <h3>김소마</h3>
              <p>2021.07.01 ~ 2021.08.31</p>
            </div>
          </div>

          <div className='project_status'>
            모집중
          </div>
        </div>

        <hr/>

        <div className='project_detail_body'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nisi officia quisquam vero. A ab
            accusantium cum delectus distinctio dolor ea explicabo fugit impedit, in, iusto placeat porro vero
            voluptatem!</p>
        </div>

        <h2>팀 구성</h2>
        <ul>
          <li>
            <div className='team_position'>
              <h4>프론트엔드</h4>
              <span>React/Typescript</span>
              <span>1/2</span>
              <button className='toggle'>
                <img src='' alt='toggle'/>
              </button>
            </div>

            <ul className='team_member'>
              <li className='project_detail_team_member'>
                <img src='' alt='user profile'/>
                <p>김소마</p>
              </li>
              <li className='project_detail_team_member'>
                <img src='' alt='user profile'/>
                <p>김소마</p>
              </li>
            </ul>
          </li>

          <li>
            <div className='team_position'>
              <h4>백엔드</h4>
              <span>Spring</span>
              <span>0/2</span>
              <button className='toggle'>
                <img src='' alt='toggle'/>
              </button>
            </div>

            <ul className='team_member'>
              <li className='project_detail_team_member'>
                <img src='' alt='user profile'/>
                <p>김소마</p>
              </li>
              <li className='project_detail_team_member'>
                <img src='' alt='user profile'/>
                <p>김소마</p>
              </li>
            </ul>
          </li>
        </ul>
        <div className='project_detail_team'>


          <div className='button_layout'>
            <button>1:1 대화</button>
            <button>지원하기</button>
          </div>
        </div>

        <h2>모임 장소</h2>
        <p>서울 강남구, 서울 중랑구</p>

        <h2>멘토링</h2>
        <ul>
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id}
                        mentorId={mentor.id}
                        mentorDescription={mentor.description}
                        mentorImage={mentor.thumbnailUrl}
                        mentorName={mentor.name}
                        heart={mentor.heart}
                        star={mentor.star}/>
          ))}
        </ul>

        <h2>기술 스택</h2>
        <ul>
          <li>
            <img src='' alt='React'/>
          </li>
          <li>
            <img src='' alt='Spring'/>
          </li>
          <li>
            <img src='' alt='MongoDB'/>
          </li>
          <li>
            <img src='' alt='Docker'/>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProjectDetailPage;