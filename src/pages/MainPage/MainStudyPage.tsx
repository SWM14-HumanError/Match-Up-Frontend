import {useEffect, useState} from 'react';
import Navigation from '../../components/Navigation.tsx';
import ProjectCard from '../../components/ProjectCard.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import '../../styles/MainProjectPage.scss';

import {studies as studiesDummy} from '../../dummies/dummyData.ts';
import {Link} from "react-router-dom";
import Search from "../../components/svgs/Search.tsx";

interface IProject {
  id: number;
  title: string;
  description: string;
  likes: number;
  thumbnailUrl: string;
}

function MainProjectPage() {
  const [studies, setStudies] = useState<Array<IProject>>([]);

  useEffect(() => {
    fetch('/api/v1/list/team?type=1&page=0')
      .then((res) => res.json())
      .then((data) => {
        setStudies(data);
      }).catch((err) => {
        console.log(err);
        setStudies(studiesDummy);
      });
  }, []);

  return (
    <>
      <Navigation isLogin={false}/>
      <div className='banner'>
        <div>
          <h1>
            우리 스터디 진행합니다! <br/>
            멘티 ・ 멘토분 모여주세요
          </h1>
          <p>
            MatchUp은 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 멘티와 멘토를 구해보세요!
          </p>
          <div className='banner_button_layout'>
            <Link className='button' to='/mentee'>
              팀원 구하기
            </Link>
            <Link className='button' to='/mentor'>
              멘토 구하기
            </Link>
          </div>
        </div>
      </div>

      <div className='main_layout'>
        <div className='study'>
          <div className='header_layout'>
            <h2>스터디</h2>
            <span>지금 새로 생긴 핫한 프로젝트에요 🔥</span>
          </div>
          <div className='search_layout'>
            <SelectBox options={['프로젝트', '스터디']}/>
            <SelectBox options={['프로젝트', '스터디']}/>
            <button><Search/></button>
          </div>

          <div className='card_layout'>
            {studies.map((study) => (
              <ProjectCard key={study.id}
                           teamId={study.id}
                           teamDescription={study.description}
                           teamImage={study.thumbnailUrl}
                           teamName={study.title}
                           teamStar={study.likes}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainProjectPage;