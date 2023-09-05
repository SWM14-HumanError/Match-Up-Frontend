import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import FeedCard from '../../components/cards/FeedCard.tsx';
import Search from '../../components/svgs/Search.tsx';
import {feeds as feedDummy} from '../../dummies/dummyData.ts';
import {IMainFeedsList} from '../../constant/interfaces.ts';
import '../../styles/MainProjectPage.scss';

function MainFeedPage() {
  // const { user } = useAuth();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);
  const [feeds, setFeeds] = useState<IMainFeedsList>({
    feedSearchResponseList: [],
    size: 0,
    hasNextSlice: true,
  });

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

  function search(page: number) {
    let url = `/api/v1/feeds?type=0&page=${page}`;
    // if (field) url += `&field=${field}`;
    // if (subField) url += `&subField=${subField}`;

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
          feedSearchResponseList: [...prevData.feedSearchResponseList, ...data.feedSearchResponseList],
          size: data.size,
          hasNextSlice: data.hasNextSlice
        }));
      }).catch((err) => {
      console.log(404, err);
      setFeeds({
        feedSearchResponseList: feedDummy,
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
              <SelectBox options={['프로젝트', '스터디']}/>
              <SelectBox options={['프로젝트', '스터디']}/>
              <SelectBox options={['프로젝트', '스터디']}/>
              <button><Search/></button>
            </div>

            <Link to='/create/feed'>피드 생성</Link>
          </div>

        </div>
      </div>

      <div className='feed_background'>
        <div className='feed_layout'>
          {feeds.feedSearchResponseList.map((feed) => (
            <FeedCard key={feed.title}
                      title={feed.title}
                      description={feed.description}
                      image={feed.image}
                      date={feed.date}/>
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