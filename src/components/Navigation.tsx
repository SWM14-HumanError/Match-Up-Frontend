import {Link} from 'react-router-dom';

interface INav {
  isLogin: boolean,
}

function Navigation({isLogin}: INav) {
  return (
    <nav>
      <div>
        <div>
          <img src='' alt=''/>
          <Link to='/project'>프로젝트</Link>
          <Link to='/mentee'>팀원</Link>
          <Link to='/mentor'>멘토</Link>
          <Link to='/feed'>피드</Link>
        </div>
        {isLogin ? (
          <div>

          </div>
        ) : (
          <div>
            <Link to='/login'>로그인 / 가입</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;