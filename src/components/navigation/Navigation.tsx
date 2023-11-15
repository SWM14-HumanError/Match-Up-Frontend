import {useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import LOGO from '../../../assets/LOGO.png';
import Bell from '../svgs/Bell.tsx';
import Hamburger from '../svgs/Hamburger.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserIcon from '../svgs/UserIcon.tsx';
import AlarmModal from './AlarmModal.tsx';
import UserModal from './UserModal.tsx';
import UserLayout from './UserLayout.tsx';
import AlarmLayout, {AlarmMenu, useAlarmLayout} from './AlarmLayout.tsx';
import useMobile from '../../hooks/useMobile.ts';
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
];

enum MenuType {
  NAV, ALARM, USER
}

function Navigation() {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [isAlarmModalOpened, setIsAlarmModalOpened] = useState<boolean>(false);
  const [isUserModalOpened, setIsUserModalOpened] = useState<boolean>(false);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [menuType, setMenuType] = useState<MenuType>(MenuType.NAV);
  const [isLogin, setIsLogin] = useState(isTokenValid());
  const [hasAlarm, setHasAlarm] = useState<boolean>(false);
  const [overflow, setOverflow] = useState<string>('auto');

  const {
    setAlarmMenuData,
    isMenuOpened: isAlarmMenuOpened,
    setIsMenuOpened: setIsAlarmMenuOpened,
    AlarmMenuData
  } = useAlarmLayout();

  const {isMobile} = useMobile();
  const [iconSize, setIconSize] = useState<number>(28);

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

  useEffect(() => {
    setIconSize(isMobile ? 24  : 28);
  }, [isMobile]);

  function clickMobileMenu(type: MenuType) {
    setMenuType(type);
    if (!isMenuOpened)
      setIsMenuOpened(true);
    else if (menuType === type || type === MenuType.NAV)
      setIsMenuOpened(false);
  }

  function isTokenValid() {
    return !!authControl.getToken();
  }

  useEffect(() => {
    if (isAlarmModalOpened || isUserModalOpened || isMenuOpened) {
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }
  }, [isAlarmModalOpened, isUserModalOpened, isMenuOpened]);

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
            {!isMobile && (
              <ul className='nav_menu'>
                {NavMenus.map((menu) => (
                  <li key={menu.name}>
                    <Link className={pathname === menu.path ? 'selected' : ''}
                          to={menu.path}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='user_icon_layout'>
            {isLogin ? (
              <>
                <button ref={alarmRef}
                        className={isMenuOpened && menuType === MenuType.ALARM ? 'selected' : ''}
                        onClick={() => isMobile ? clickMobileMenu(MenuType.ALARM) : setIsAlarmModalOpened(true)}>
                  <Bell width={iconSize} height={iconSize} state={2 * Number(hasAlarm)}/>
                </button>
                <button ref={userRef}
                        className={isMenuOpened && menuType === MenuType.USER ? 'selected' : ''}
                        onClick={() => isMobile ? clickMobileMenu(MenuType.USER) : setIsUserModalOpened(true)}>
                  <UserIcon width={iconSize} height={iconSize}/>
                </button>
              </>
            ) : (
              <button className='link' onClick={authControl.login}>로그인 / 가입</button>
            )}

            {isMobile && (
              <button onClick={() => clickMobileMenu(MenuType.NAV)}>
                {isMenuOpened ? (
                  <CloseIcon width={iconSize} height={iconSize} round={true}/>
                ) : (
                  <Hamburger width={iconSize} height={iconSize}/>
                )}
              </button>
            )}
          </div>
        </div>
        {isMobile && isMenuOpened && (
          menuType === MenuType.NAV ? (
              <ul className='mobile_menu_layout'>
                {NavMenus.map((menu) => (
                  <li key={menu.name} onClick={() => navigate(menu.path)}>
                    <Link className={pathname === menu.path ? 'selected' : ''}
                          to={menu.path}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            ) :
            menuType === MenuType.USER ? (
              <div className='user_modal'>
                <UserLayout/>
              </div>
            ) : (
              <div className='user_modal'>
                <AlarmLayout setIsAlarmModalOpened={setIsMenuOpened}
                             setIsMenuOpened={setIsAlarmMenuOpened}
                             setHasAlarm={setHasAlarm}
                             setAlarmMenuData={setAlarmMenuData}/>
              </div>
            )
        )}
      </nav>

      {(isAlarmModalOpened || isUserModalOpened || isAlarmMenuOpened) &&
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
          {isAlarmMenuOpened && <AlarmMenu {...AlarmMenuData} setIsMenuOpened={setIsAlarmMenuOpened}/>}
        </div>}
    </>
  );
}

export default Navigation;