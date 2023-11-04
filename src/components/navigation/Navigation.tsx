import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import LOGO from '../../../assets/LOGO.png';
import Bell from '../svgs/Bell.tsx';
import UserIcon from '../svgs/UserIcon.tsx';
import AlarmModal from './AlarmModal.tsx';
import UserModal from './UserModal.tsx';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

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
  const [isAlarmModalOpened, setIsAlarmModalOpened] = useState<boolean>(false);
  const [isUserModalOpened, setIsUserModalOpened] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(isTokenValid());
  const [hasAlarm, setHasAlarm] = useState<boolean>(false);
  const [overflow, setOverflow] = useState<string>('auto');

  // Todo: 데이터 타입 알아오기
  const alarmRef = useRef<any>();
  const userRef = useRef<any>();

  useEffect(() => {
    const isLogin = isTokenValid();
    setIsLogin(isLogin);

    if (isLogin) {
      Api.fetch2Json('/api/v1/alert?page=0&size=10')
        .then(res => {
          const AlertList = res.alertResponseList;

          // 알람이 있는지 확인
          setHasAlarm(AlertList.some((alert: any) => !alert.read));

          // 알람 중 멘토 승인 요청이 있다면 토큰 업데이트
          const MentorContents = '이제부터 멘토링을 등록할 수 있습니다.';
          const mentorRequest = AlertList.find((v: any) => !!v && v.alertType === 'MENTORING' && v.content === MentorContents);
          const token = authControl.getInfoFromToken();
          const isMentor = token && token.role === 'MENTOR';
          if (mentorRequest && !isMentor) {
            authControl.updateToken();
          }
        });
    }
  }, [document.cookie]);

  function isTokenValid() {
    return !!authControl.getToken();
  }

  useEffect(() => {
    if (isAlarmModalOpened || isUserModalOpened) {
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
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
                   alt='SideMatch'/>
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
                <Bell width={28} height={28} state={2 * Number(hasAlarm)}/>
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
                                             setHasAlarm={setHasAlarm}
                                             target={alarmRef.current}/>}
          {isUserModalOpened && <UserModal setIsUserModalOpened={setIsUserModalOpened}
                                           target={userRef.current}/>}
        </div>}
    </>
  );
}

export default Navigation;