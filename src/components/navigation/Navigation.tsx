import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import LOGO from '../../../assets/LOGO.png';
import Bell from '../svgs/Bell.tsx';
import UserIcon from '../svgs/UserIcon.tsx';
import AlarmModal from './AlarmModal.tsx';
import UserModal from './UserModal.tsx';
import authControl from '../../constant/authControl.ts';

import '../../styles/components/Navigation.scss';

export const NavMenus = [
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

  // Todo: 데이터 타입 알아오기
  const alarmRef = useRef<any>();
  const userRef = useRef<any>();

  useEffect(() => {
    setIsLogin(isTokenValid());
  }, [document.cookie]);

  function isTokenValid() {
    return !!authControl.getToken();
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
                   src={LOGO}
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
              <button ref={alarmRef} onClick={() => setIsAlarmModalOpened(true)}>
                <Bell width={28} height={28} state={0}/>
              </button>
              <button ref={userRef} onClick={() => setIsUserModalOpened(true)}>
                <UserIcon width={28} height={28}/>
              </button>
            </div>
          ) : (
            <div>
              <button className='link' onClick={authControl.login}>로그인 / 가입</button>
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
        {isAlarmModalOpened && <AlarmModal setIsAlarmModalOpened={setIsAlarmModalOpened}
                                           target={alarmRef.current} />}
        {isUserModalOpened && <UserModal setIsUserModalOpened={setIsUserModalOpened}
                                         target={userRef.current} />}
      </div>}
    </>
);
}

export default Navigation;