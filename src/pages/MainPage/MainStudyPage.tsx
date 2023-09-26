import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from '../../components/svgs/Search.tsx';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import useInfScroll from '../../hooks/useInfScroll.ts';
import {IProjectList, ITeamProjectSummary} from '../../constant/interfaces.ts';
import '../../styles/MainProjectPage.scss';

import {ProjectFields, ProjectSubFields} from '../../constant/selectOptions.ts';
import authControl from '../../constant/authControl.ts';
import {studies} from '../../dummies/dummyData.ts';
import {JSX} from 'react/jsx-runtime';


function MainProjectPage() {
  const [selectedField, setSelectedField] = useState<string>(ProjectFields[0]);
  const [selectedSubField, setSelectedSubField] = useState<string>(ProjectSubFields[0]);
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading, setReqParams}
    = useInfScroll<IProjectList>('/api/v1/list/team', 'teamSearchResponseList', infScrollLayout, studies, {type: 1});

  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  function search(field?: string, subField?: string) {
    let paramObj: any = {type: 1};

    if (field)
      paramObj = {
        ...paramObj,
        field: field
      }

    if (subField)
      paramObj = {
        ...paramObj,
        subField: subField
      }

    setReqParams(paramObj);
  }

  return (
    <>
      <Navigation/>
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

          <div className='header_flex'>
            <div className='search_layout'>
              <SelectBox options={ProjectFields}
                         value={selectedField}
                         onChange={value => setSelectedField(value)}/>
              <SelectBox options={ProjectSubFields}
                         value={selectedSubField}
                         onChange={value => setSelectedSubField(value)}/>
              <button onClick={() =>
                search(
                  selectedField !== ProjectFields[0] ? selectedField : undefined,
                  selectedSubField !== ProjectSubFields[0] ? selectedSubField : undefined)
              }>
                <Search/>
              </button>
            </div>

            {login && (
              <Link to='/create/team'>스터디 만들기</Link>
            )}
          </div>

          <div className='card_layout'
               ref={infScrollLayout}>
            <div>
              {data.teamSearchResponseList.map((study: JSX.IntrinsicAttributes & ITeamProjectSummary) => study && (
                <ProjectCard key={study.id} {...study}/>
              ))}
            </div>
            
            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainProjectPage;