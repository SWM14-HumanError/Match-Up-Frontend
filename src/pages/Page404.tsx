import {Link} from 'react-router-dom';
import '@styles/MainProjectPage.scss';

function Page404() {
  return (
    <div className="page_404">
      <div>
        <h1>404</h1>
        <h2>페이지를 찾을 수 없습니다</h2>
        <p>죄송합니다. 찾고 있는 페이지를 찾을 수 없습니다. URL에 오류가 없는지 확인한 후 브라우저의 새로고침 버튼을 눌러주세요.</p>

        <Link to='/'>홈으로 이동</Link>
      </div>
    </div>
  );
}

export default Page404;