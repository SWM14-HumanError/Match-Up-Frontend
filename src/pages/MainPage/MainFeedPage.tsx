import {useEffect} from 'react';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import FeedCard from "../../components/FeedCard.tsx";
import {feeds} from '../../dummies/dummyData.ts';
import '../../styles/MainProjectPage.scss';
import Search from "../../components/svgs/Search.tsx";

function MainFeedPage() {
  // const { user } = useAuth();
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

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

  return (
    <div>
      <Navigation isLogin={false}/>

      <div className='main_layout'>
        <div className='project'>
          <h1>피드</h1>
          <div className='search_layout'>
            <SelectBox options={['프로젝트', '스터디']}/>
            <SelectBox options={['프로젝트', '스터디']}/>
            <SelectBox options={['프로젝트', '스터디']}/>
            <button><Search/></button>
          </div>

        </div>
      </div>

      <div className='feed_background'>
        <div className='feed_layout'>
          {feeds.map((feed) => (
            <FeedCard title={feed.title}
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