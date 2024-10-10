import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import Search from '@components/svgs/Search.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import JobPostingCard from '@components/cards/JobPostingCard.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import useInfScroll from '@hooks/useInfScroll.ts';
import useMobile from '@hooks/useMobile.ts';
import {IJobPosting, IJobPostingList} from '@constant/interfaces.ts';
import {JobPositionOptions, JobTypeOptions} from '@constant/selectOptions.ts';
import {JobPostingAdapter} from '@constant/InfScrollAdapter.ts';
import authControl from '@constant/authControl.ts';
import '@styles/MainProjectPage.scss';


function MainJobPostingPage() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [hideClosedJob, setHideClosedJob] = useState<boolean>(false);
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const adapter = useRef(new JobPostingAdapter());
  const {data, loading, isEmpty, isEnded, setReqParams}
    = useInfScroll<IJobPostingList, IJobPosting>(adapter.current, infScrollLayout);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const {isMobile} = useMobile();

  const tokenData = authControl.getInfoFromToken();
  const isAdmin = ['ADMIN'].includes(tokenData?.role);

  function search() {
    let paramObj = {
      searchWord: searchWord ? searchWord : undefined,
      jobPosition: jobPosition ? jobPosition : undefined,
      jobType: jobType ? jobType : undefined,
      hideClosedJob: hideClosedJob ? hideClosedJob : undefined,
    };

    setReqParams(paramObj);
  }

  return (
    <div>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>

      <div className='main_layout'>
        <div className='project feed_layout_header'>
          <h1>채용공고</h1>
          <div className='header_flex'>
            <div className='search_layout'>
              {/*- 이미 끝난 공고 가리기 : `hideClosedJob`*/}
              {/*- Type : boolean*/}
              <SelectBox options={JobPositionOptions}
                         value={jobPosition}
                         onChange={value => setJobPosition(value)}/>
              <SelectBox options={JobTypeOptions}
                         value={jobType}
                         onChange={value => setJobType(value)}/>
              <div className='search_input_layout'>
                <input type='text'
                       placeholder='검색어를 입력해주세요'
                       maxLength={49}
                       value={searchWord}
                       onChange={e => setSearchWord(e.target.value)}/>

                <button className='search_button'
                        aria-label='모집공고 검색'
                        onClick={search}>
                  <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
                </button>
              </div>
            </div>

            {isAdmin && (
              <Link to='/create/job'>공고 만들기</Link>
            )}
          </div>
          <label htmlFor='hide_closed_job'>
            <input type='checkbox'
                   id='hide_closed_job'
                   checked={hideClosedJob}
                   onChange={() => setHideClosedJob(!hideClosedJob)}/>
            이미 마감된 공고 가리기
          </label>

        </div>

        <div className={'card_layout' + (!loading && isEmpty ? ' no_contents' : ' three_cards job_card_layout')}
             ref={infScrollLayout}>
          <div>
            {!loading && isEmpty ? (
                <div className='list_no_contents'>
                  <p>채용 공고가 없습니다</p>
                </div>
              ) :
              data.list.map((posting) => posting && (
                <JobPostingCard key={posting.id} {...posting}/>
              ))}
          </div>

          <div className='loading_component_div'>
            {loading && <LoadingComponent/>}
          </div>
        </div>
      </div>

      {isEnded && (<Footer/>)}
    </div>
  );
}

export default MainJobPostingPage;