import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import ProjectCard from '../../components/cards/ProjectCard.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Search from '../../components/svgs/Search.tsx';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import useMobile from '../../hooks/useMobile.ts';
import useInfScroll from '../../hooks/useInfScroll.ts';
import Footer from '../../components/Footer.tsx';
import '../../styles/MainProjectPage.scss';

import {IProjectList, ITeamProjectSummary} from '../../constant/interfaces.ts';
import {ProjectFields} from '../../constant/selectOptions.ts';
import authControl from '../../constant/authControl.ts';
import {projects} from '../../dummies/dummyData.ts';
import {JSX} from 'react/jsx-runtime';

function MainProjectPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(ProjectFields[0]);
  const [searchString, setSearchString] = useState<string>('');
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {isMobile} = useMobile();
  const {data, loading, isEnded, setReqParams}
    = useInfScroll<IProjectList>('/api/v1/list/team', 'teamSearchResponseList', infScrollLayout, projects, {type: 0});

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  function search(category?: string, search?: string) {
    let paramObj: any = {type: 0};

    if (category)
      paramObj = {
        ...paramObj,
        category: category
      }

    if (search)
      paramObj = {
        ...paramObj,
        search: search
      }

    setReqParams(paramObj);
  }

  return (
    <>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>
      
      <div className='banner'>
        <div>
          <h1>
            우리 프로젝트 진행합니다! <br/>
            멘티 ・ 멘토분 모여주세요
          </h1>
          <p>
            SideMatch는 프로젝트/스터디의 멘티과 멘토를 구하는 매칭 서비스입니다. <br/>
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
        <div className='project'>
          <div className='header_layout'>
            <h2>프로젝트</h2>
            <span>지금 새로 생긴 핫한 프로젝트에요 🔥</span>
          </div>

          <div className='header_flex'>
            <div className='search_layout'>
              <SelectBox options={ProjectFields}
                         value={selectedCategory}
                         onChange={value => setSelectedCategory(value)}/>
              <input type='text'
                     placeholder='프로젝트 이름을 입력해주세요'
                     maxLength={49}
                     value={searchString}
                     onChange={e => setSearchString(e.target.value)}/>

              <button className='search_button'
                onClick={() => search(
                  selectedCategory !== ProjectFields[0] ? selectedCategory : undefined,
                  searchString ? searchString : undefined)
              }>
                <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
              </button>
            </div>

            {login && (
              <Link to='/create/team'>프로젝트 만들기</Link>
            )}
          </div>

          <div className={'card_layout' + (!loading && (!data.teamSearchResponseList.length || !data.teamSearchResponseList[0]) ? ' no_contents' : '')}
               ref={infScrollLayout}>
            <div>
              { !loading && (!data.teamSearchResponseList.length || !data.teamSearchResponseList[0]) ? (
                <div className='list_no_contents'>
                  <p>프로젝트가 없습니다</p>
                </div>
              ) :
              data.teamSearchResponseList.map((project: JSX.IntrinsicAttributes & ITeamProjectSummary) => project && (
                <ProjectCard key={project.id} {...project} setLoginDialog={setIsLoginDialogOpen}/>
              ))}
            </div>

            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>

      </div>

      {isEnded && (<Footer/>)}
    </>
  );
}

export default MainProjectPage;