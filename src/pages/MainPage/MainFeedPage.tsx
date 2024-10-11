import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import useInfScroll from '@hooks/useInfScroll.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import FeedCard from '@components/feeds/FeedCard.tsx';
import Search from '@components/svgs/Search.tsx';
import LoadingComponent from '@components/LoadingComponent.tsx';
import LoginRecommendDialog from '@components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '@components/Footer.tsx';
import {IMainFeeds, IMainFeedsList} from '@constant/interfaces.ts';
import {FeedAdapter} from '@constant/InfScrollAdapter.ts';
import {option2Record} from '@constant/selectOptions.ts';
import authControl from '@constant/authControl.ts';
import {josa} from 'es-hangul';
import '@styles/MainProjectPage.scss';

const searchType = [
  {option: '제목', value: 'TITLE'},
  {option: '작성자', value: 'WRITER'},
];
const SearchTypeRecord = option2Record(searchType);

function MainFeedPage() {
  // const [subField, setSubField] = useState<string>(ProjectSubFields[0]);
  const [searchField, setSearchField] = useState<string>(searchType[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const searchFieldHangul = SearchTypeRecord[searchField];
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const adapter = useRef(new FeedAdapter());
  const {data, loading, isEmpty, isEnded, setReqParams}
    = useInfScroll<IMainFeedsList ,IMainFeeds>(adapter.current, infScrollLayout);

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const isMobile = useWindowSizeStore(state => state.isMobile);

  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  function search() {
    let paramObj = {};

    if (searchKeyword)
      paramObj = {
        ...paramObj,
        searchType: searchField,
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
              <SelectBox options={searchType}
                         value={searchField}
                         onChange={value => setSearchField(value)}
                         hasDefault={false}/>
              <div className='search_input_layout'>
                <input type='text'
                       placeholder={`${searchFieldHangul}${josa.pick(searchFieldHangul, '을/를')} 입력해주세요`}
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
          { !loading && isEmpty ? (
            <div className='list_no_contents'>
              <p>피드가 없습니다</p>
            </div>
          ) :
          data.list.map((feed) => feed && (
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