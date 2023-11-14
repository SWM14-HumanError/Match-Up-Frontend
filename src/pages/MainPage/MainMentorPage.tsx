import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import MentorCard from '../../components/cards/MentorCard.tsx';
import MentorStackSelect from '../../components/inputs/MentorStackSelect.tsx';
import Search from '../../components/svgs/Search.tsx';
import MentorDialog from '../../components/dialogLayout/MentorDialog.tsx';
import useInfScroll from '../../hooks/useInfScroll.ts';
import useMobile from '../../hooks/useMobile.ts';
import useMentoringPopup from '../../hooks/useMentoringPopup.ts';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '../../components/Footer.tsx';
import {BigTechTypeEn, BigTechTypeKo} from '../../constant/selectOptions.ts';
import {mentors as mentorsDummy} from '../../dummies/dummyData.ts';
import {IMainMentorList} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/MainMentorPage.scss';

const SearchTypeOptions : any = {
  '제목+내용': 'TITLE_AND_CONTENT',
  '작성자': 'WRITER',
};
const RoleTypeOptionsKor = ['직무 전체', ...BigTechTypeKo];
const RoleTypeOptionsEng = ['', ...BigTechTypeEn];

function MainMentorPage() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const [searchType, setSearchType] = useState<string>(Object.keys(SearchTypeOptions)[0]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [stack, setStack] = useState<string>('스택 전체');
  const [roleType, setRoleType] = useState<string>('');

  const {isMobile} = useMobile();
  const {data, loading, isEnded, isEmpty, setReqParams, hideData}
    = useInfScroll<IMainMentorList>('/api/v1/mentorings', 'mentoringSearchResponses', infScrollLayout, mentorsDummy, {});

  const mentoringPopup = useMentoringPopup(data.mentoringSearchResponses);

  const token = authControl.getInfoFromToken();
  const isLogin = !!authControl.getUserIdFromToken();
  const UserRole = token ? token.role : '';

  useEffect(() => {
    search();
  }, []);

  function search() {
    let searchObj = {};

    if (searchValue)
      searchObj = {...searchObj, searchType: SearchTypeOptions[searchType], searchValue: searchValue};
    if (stack !== '스택 전체')
      searchObj = {...searchObj, stack: stack};
    if (roleType !== RoleTypeOptionsKor[0])
      searchObj = {...searchObj, roleType: RoleTypeOptionsEng[RoleTypeOptionsKor.indexOf(roleType)]};

    setReqParams(searchObj);
  }

  return (
    <div>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <MentorDialog {...mentoringPopup}
                    hideMentorCard={() => hideData(mentoringPopup.selectedCardIndex)}/>

      <Navigation/>
      
      <div className='banner image02'>
        <div>
          <h1>
            우리 모임을 이끌어주실 <br/>
            멘토분을 구해요
          </h1>
          <p>
            SideMatch는 프로젝트/스터디의 팀원과 멘토를 구하는 매칭 서비스입니다. <br/>
            하고 싶은 프로젝트/스터디를 정해서 팀원을 구해보세요!
          </p>
        </div>
      </div>

      <div className='main_layout'>
        <div className='project'>
          <div className='header_space_between'>
            <div className='header_layout'>
              <h2>멘토</h2>
              <span>나에게 맞는 멘토를 구해보세요 🔥</span>
            </div>
            <div className='header_layout'>
              {isLogin && (UserRole === 'MENTOR' || UserRole === 'ADMIN' ? (
                <Link to='/create/mentoring'>멘토링 만들기</Link>
              ) : (
                <Link to='/auth/mentor'>멘토 인증</Link>
              ))}
            </div>
          </div>
          <div className='search_layout'>
            <SelectBox options={RoleTypeOptionsKor}
                       hasDefault={RoleTypeOptionsKor.indexOf(roleType) !== 0}
                       value={roleType}
                       onChange={value => setRoleType(value)}/>
            {/*<SelectBox options={['스택 전체']}*/}
            {/*           hasDefault={stack !== '스택 전체'}*/}
            {/*           value={stack}*/}
            {/*           onChange={value => setStack(value)}/>*/}
            <MentorStackSelect setStack={setStack}/>
            <SelectBox options={Object.keys(SearchTypeOptions)}
                       hasDefault={false}
                       value={searchType}
                       onChange={value => setSearchType(value)}/>

            <div>
              <input type='text'
                     placeholder='키워드를 한글자 이상 입력해주세요'
                     maxLength={49}
                     value={searchValue}
                     onChange={e => setSearchValue(e.target.value)}/>

              <button className='search_button' onClick={search}>
                <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
              </button>
            </div>
          </div>

          <div className={'card_layout' + (!loading && isEmpty() ?  ' no_contents' : '')}
               ref={infScrollLayout}>
            <div>
              { !loading && isEmpty() ? (
                  <div className='list_no_contents'>
                    <p>멘토가 없습니다</p>
                  </div>
                ):
                data.mentoringSearchResponses.map((mentor: any | null | undefined) => mentor && (
                  <MentorCard key={mentor.mentoringId}
                              {...mentor}
                              setLoginDialog={setIsLoginDialogOpen} />
                ))}
            </div>

            <div className='loading_component_div'>
              {loading && <LoadingComponent/>}
            </div>
          </div>
        </div>
      </div>
      
      {isEnded && (<Footer/>)}
    </div>
  );
}

export default MainMentorPage;