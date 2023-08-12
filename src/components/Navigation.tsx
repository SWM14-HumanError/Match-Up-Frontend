import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Bell from './svgs/Bell.tsx';
import UserIcon from './svgs/UserIcon.tsx';
import AlarmModal from './AlarmModal.tsx';
import UserModal from './UserModal.tsx';

import '../styles/components/Navigation.scss';

const NavMenus = [
  {
    name: '프로젝트',
    path: '/project',
  },
  {
    name: '스터디',
    path: '/study',
  },
  {
    name: '팀원',
    path: '/mentee',
  },
  {
    name: '멘토',
    path: '/mentor',
  },
  {
    name: '피드',
    path: '/feed',
  },
]

function Navigation() {
  const {pathname} = useLocation();
  const [isAlarmModalOpened, setIsAlarmModalOpened] = useState(false);
  const [isUserModalOpened, setIsUserModalOpened] = useState(false);
  const [isLogin, setIsLogin] = useState(isTokenValid());

  useEffect(() => {
    setIsLogin(isTokenValid());
  }, [document.cookie]);

  function isTokenValid() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const tokenExpire = document.cookie.replace(/(?:(?:^|.*;\s*)tokenExpire\s*=\s*([^;]*).*$)|^.*$/, '$1');

    console.log(token, tokenExpire);

    if (token && tokenExpire) {
      const now = new Date();
      const expire = new Date(tokenExpire);

      if (now < expire)
        return true;
    }

    return false;
  }

  function login() {
    const redirectUrl = window.location.pathname;

    localStorage.setItem('redirectUrl', redirectUrl);
    window.location.href = 'http://localhost:8080/login';
  }

  useEffect(() => {
    if (isAlarmModalOpened || isUserModalOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAlarmModalOpened, isUserModalOpened]);

  return (
    <>
      <nav>
        <div>
          <div className='nav_menu_layout'>
            <Link to='/'>
              <img className='logo'
                   src='/assets/LOGO.png'
                   alt='MatchUp'/>
            </Link>
            <ul className='nav_menu'>
              {NavMenus.map((menu) => (
                <li key={menu.name}>
                  <Link className={pathname === menu.path ? 'selected' : ''}
                        to={menu.path}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {isLogin ? (
            <div className='user_icon_layout'>
              <button onClick={() => setIsAlarmModalOpened(true)}>
                <Bell width={28} height={28} state={0}/>
              </button>
              <button onClick={() => setIsUserModalOpened(true)}>
                <UserIcon width={28} height={28}/>
              </button>
            </div>
          ) : (
            <div>
              <button className='link' onClick={login}>로그인 / 가입</button>
            </div>
          )}
        </div>
      </nav>

      {(isAlarmModalOpened || isUserModalOpened) &&
        <div className='modal_layout'
             onClick={() => {
               setIsUserModalOpened(false);
               setIsAlarmModalOpened(false);
             }}>
        {isAlarmModalOpened && <AlarmModal setIsAlarmModalOpened={setIsAlarmModalOpened}/>}
        {isUserModalOpened && <UserModal setIsUserModalOpened={setIsUserModalOpened}/>}
      </div>}
    </>
);
}

export default Navigation;