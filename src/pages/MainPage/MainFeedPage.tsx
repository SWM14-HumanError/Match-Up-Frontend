import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import FeedCard from '@components/cards/FeedCard.tsx';
import Search from '@components/svgs/Search.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import useInfScroll from '@hooks/useInfScroll.ts';
import useMobile from '@hooks/useMobile.ts';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import {IMainFeeds, IMainFeedsList} from '@constant/interfaces.ts';
import {feeds} from '../../dummies/dummyData.ts';
import {JSX} from 'react/jsx-runtime';
import authControl from '@constant/authControl.ts';
import '@styles/MainProjectPage.scss';


function MainFeedPage() {
  // const [subField, setSubField] = useState<string>(ProjectSubFields[0]);
  const [searchField, setSearchField] = useState<string>('제목');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading, isEnded, setReqParams}
    = useInfScroll<IMainFeedsList>('/api/v1/feeds', 'feedSearchResponses', infScrollLayout, feeds, {});

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const {isMobile} = useMobile();
  
  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  function getSearchType(searchField: string) {
    if (searchField === '제목') return 'TITLE';
    else if (searchField === '작성자') return 'WRITER';
    else return 'TITLE';
  }

  function search() {
    let paramObj = {};

    if (searchKeyword)
      paramObj = {
        ...paramObj,
        searchType: getSearchType(searchField),
        searchValue: searchKeyword
      };

    // if (subField !== ProjectSubFields[0])
    //   paramObj = {
    //     ...paramObj,
    //     domain: subField
    //   };

    setReqParams(paramObj);
  }

  return (
    <div>
      <LoginRecommendDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
      <Navigation/>

      <div className='main_layout'>
        <div className='project feed_layout_header'>
          <h1>피드</h1>
          <div className='header_flex'>
            <div className='search_layout'>
              {/*<SelectBox options={ProjectSubFields}*/}
              {/*           value={subField}*/}
              {/*           onChange={value => setSubField(value)}/>*/}
              <SelectBox options={['제목', '작성자']}
                         value={searchField}
                         onChange={value => setSearchField(value)}
                         hasDefault={false}/>
              <div>
                <input type='text'
                       placeholder={`${searchField}${searchField === '작성자' ? '를' : '을'} 입력해주세요`}
                       maxLength={49}
                       value={searchKeyword}
                       onChange={e => setSearchKeyword(e.target.value)}/>

                <button className='search_button'
                        onClick={search}>
                  <Search width={isMobile ? 48 : 62} height={isMobile ? 48 : 62}/>
                </button>
              </div>
            </div>

            {login && (
              <Link to='/create/feed'>피드 만들기</Link>
            )}
          </div>

        </div>
      </div>

      <div className='feed_background'
           ref={infScrollLayout}>
        <div className='feed_layout'>
          { !loading && (!data.feedSearchResponses.length || !data.feedSearchResponses[0]) ? (
            <div className='list_no_contents'>
              <p>피드가 없습니다</p>
            </div>
          ) :
          data.feedSearchResponses.map((feed: JSX.IntrinsicAttributes & IMainFeeds) => feed && (
            <FeedCard key={feed.id} {...feed} setLoginDialog={setIsLoginDialogOpen}/>
          ))}
        </div>
        
        <div className='loading_component_div'>
          {loading && <LoadingComponent/>}
        </div>
      </div>
      
      {isEnded && (<Footer/>)}
    </div>
  );
}

export default MainFeedPage;