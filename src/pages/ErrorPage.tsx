import {Link} from 'react-router-dom';
import '@styles/MainProjectPage.scss';

function ErrorPage() {
  return (
    <div className='page_404'>
      <div>
        <h1>에러가 발생했습니다</h1>
        <h2>프로그램을 실행할 수 없습니다.</h2>
        <p>오류가 발생했습니다. 홈으로 이동한 뒤 다시 시도해주세요.</p>

        <Link to='/'>홈으로 이동</Link>
        <Link to='/inquiry/personal'>문의하기</Link>
      </div>
    </div>
  );
}

export default ErrorPage;