import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/navigation/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import FeedCard from '../../components/cards/FeedCard.tsx';
import Search from '../../components/svgs/Search.tsx';
import LoadingComponent from '../../components/LoadingComponent.tsx';
import useInfScroll from '../../hooks/useInfScroll.ts';
import authControl from '../../constant/authControl.ts';
import {IMainFeeds, IMainFeedsList} from '../../constant/interfaces.ts';
import {ProjectSubFields} from '../../constant/selectOptions.ts';
import {feeds} from '../../dummies/dummyData.ts';
import '../../styles/MainProjectPage.scss';
import {JSX} from 'react/jsx-runtime';
import Api from "../../constant/Api.ts";

interface INicknames { [key: number]: string }

function MainFeedPage() {
  const [subField, setSubField] = useState<string>(ProjectSubFields[0]);
  const [searchField, setSearchField] = useState<string>('제목');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [nicknames, setNicknames] = useState<INicknames>({});
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading, setReqParams}
    = useInfScroll<IMainFeedsList>('/api/v1/feeds', 'feedSearchResponses', infScrollLayout, feeds, {});

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

    if (subField !== ProjectSubFields[0])
      paramObj = {
        ...paramObj,
        subField: subField
      };

    setReqParams(paramObj);
  }

  async function getUserNickname(userId: number) {
    if (nicknames.hasOwnProperty(userId))
      return nicknames[userId];

    const userInfo = await Api.fetch2Json(`/api/v1/profile/${userId}`);
    setNicknames(prev => {
      if (nicknames.hasOwnProperty(userId))
        return prev;
      return {...prev, [userId]: userInfo.nickname}
    });

    return userInfo.nickname;
  }

  return (
    <div>
      <Navigation/>

      <div className='main_layout'>
        <div className='project feed_layout_header'>
          <h1>피드</h1>
          <div className='header_flex'>
            <div className='search_layout'>
              <SelectBox options={ProjectSubFields}
                         value={subField}
                         onChange={value => setSubField(value)}/>
              <SelectBox options={['제목', '작성자']}
                         value={searchField}
                         onChange={value => setSearchField(value)}
                         hasDefault={false}/>
              <input type='text'
                     placeholder={`${searchField}${searchField === '작성자' ? '를' : '을'} 입력해주세요`}
                     value={searchKeyword}
                     onChange={e => setSearchKeyword(e.target.value)}/>

              <button className='search_button'
                      onClick={search}>
                <Search/>
              </button>
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
          {data.feedSearchResponses.map((feed: JSX.IntrinsicAttributes & IMainFeeds) => feed && (
            <FeedCard key={feed.title} {...feed} getUserNickname={getUserNickname}/>
          ))}
        </div>
        
        <div className='loading_component_div'>
          {loading && <LoadingComponent/>}
        </div>
      </div>

    </div>
  );
}

export default MainFeedPage;