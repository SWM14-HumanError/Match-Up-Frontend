import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import FeedCard from '../../components/cards/FeedCard.tsx';
import Search from '../../components/svgs/Search.tsx';
import authControl from '../../constant/authControl.ts';
import {feeds as feedDummy} from '../../dummies/dummyData.ts';
import {IMainFeedsList} from '../../constant/interfaces.ts';
import {ProjectSubFields} from '../../constant/selectOptions.ts';
import '../../styles/MainProjectPage.scss';

function MainFeedPage() {
  // const { user } = useAuth();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);
  const [feeds, setFeeds] = useState<IMainFeedsList>({
    feedSearchResponsDtos: [],
    size: 0,
    hasNextSlice: true,
  });
  const [subField, setSubField] = useState<string>(ProjectSubFields[0]);
  const [searchField, setSearchField] = useState<string>('제목');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const tokenData = authControl.getInfoFromToken();
  const login = !!tokenData;

  useEffect(() => {
    // setLoading(true);
    // setError(null);
    // getPosts()
    //   .then((posts) => {
    //     setPosts(posts);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  useEffect(() => {
    search(0);
  }, []);

  function getSearchType(searchField: string) {
    if (searchField === '제목') return 'TITLE';
    else if (searchField === '작성자') return 'WRITER';
    else return 'TITLE';
  }

  function search(page: number) {
    // if (!feeds.hasNextSlice) return;

    let url = `/api/v1/feeds?page=${page}`;
    if (searchKeyword) url += `&searchType=${getSearchType(searchField)}&searchValue=${searchKeyword}`;
    if (subField !== ProjectSubFields[0]) url += `&subField=${subField}`;

    fetch(url)
      .then((res) => {
        if (res.status < 300)
          return res.json();
        else
          throw new Error('fetch error');
      })
      .then((data) => {
        if (page === 0) setFeeds(data);
        else setFeeds(prevData => ({
          feedSearchResponsDtos: [...prevData.feedSearchResponsDtos, ...data.feedSearchResponsDtos],
          size: data.size,
          hasNextSlice: data.hasNextSlice
        }));
      }).catch((err) => {
      console.log(404, err);
      setFeeds({
        feedSearchResponsDtos: feedDummy,
        size: feedDummy.length,
        hasNextSlice: false,
      });
    });
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
                      onClick={() => search(0)}>
                <Search/>
              </button>
            </div>

            {login && (
              <Link to='/create/feed'>피드 만들기</Link>
            )}
          </div>

        </div>
      </div>

      <div className='feed_background'>
        <div className='feed_layout'>
          {feeds.feedSearchResponsDtos.map((feed) => (
            <FeedCard key={feed.title} {...feed}/>
          ))}
        </div>
      </div>

      <div>
        {/*{posts.map((post) => (*/}
        {/*  <PostCard key={post.id} post={post} />*/}
        {/*))}*/}
      </div>
    </div>
  );
}

export default MainFeedPage;