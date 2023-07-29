import '../styles/MainProjectPage.scss';
import {Link} from 'react-router-dom';

function Page404() {
  return (
  <div className='page_404'>
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, but the page you are looking for has not been found. Try checking the URL for errors, then hit the refresh button on your browser.</p>

      <Link to='/'>Go to Home</Link>
    </div>
  </div>
  );
}

export default Page404;