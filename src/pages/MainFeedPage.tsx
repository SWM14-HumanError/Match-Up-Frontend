import {useEffect} from 'react';
import Navigation from '../components/Navigation.tsx';
import '../styles/MainProjectPage.scss';
import SelectBox from '../components/SelectBox.tsx';
import {projects} from '../dummies/dummyData.ts';
import ProjectCard from '../components/ProjectCard.tsx';

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
          <h2>피드</h2>
          <div className='selector_title_layout'>
            <SelectBox/>
            <SelectBox/>
            <SelectBox/>
            <button>검색</button>
          </div>
          <div className='card_layout'>
            {projects.map((project) => (
              <ProjectCard key={project.id}
                           teamId={project.id}
                           teamDescription={project.description}
                           teamImage={project.thumbnailUrl}
                           teamName={project.title}
                           teamStar={project.likes}/>
            ))}
          </div>
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