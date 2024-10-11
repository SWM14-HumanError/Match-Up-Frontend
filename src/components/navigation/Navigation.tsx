import {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import LOGO from '@assets/LOGO.png';
import Bell from '../svgs/Bell.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserIcon from '../svgs/UserIcon.tsx';
import AlarmModal from './AlarmModal.tsx';
import UserModal from './UserModal.tsx';
import UserLayout from './UserLayout.tsx';
import AlarmLayout, {AlarmMenu, useAlarmLayout} from './AlarmLayout.tsx';
import useWindowSizeStore, {WindowSize} from '../../stores/useWindowSizeStore.ts';
import authControl from '@constant/authControl.ts';
import Api from '@constant/Api.ts';

import '@styles/components/Navigation.scss';

// Todo: NavMenu와 Raute 페이지 합치기
// Todo: 이름 바꾼 내용 Route 바꾸기
export const NavMenus = [
  {
    name: '기업 프로젝트',
    mobileName: '기업',
    path: '/project',
  },
  {
    name: '개인 프로젝트',
    mobileName: '개인',
    path: '/study',
  },
  {
    name: '인재풀',
    mobileName: '인재풀',
    path: '/mentee',
  },
  {
    name: '멘토',
    mobileName: '멘토',
    path: '/mentor',
  },
  {
    name: '피드',
    mobileName: '피드',
    path: '/feed',
  },
  {
    name: '채용',
    mobileName: '채용',
    path: '/jobs',
  },
];

enum MenuType {
  ALARM, USER
}

function Navigation() {
  const navigate = useNavigate();
  const [isAlarmModalOpened, setIsAlarmModalOpened] = useState<boolean>(false);
  const [isUserModalOpened, setIsUserModalOpened] = useState<boolean>(false);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [menuType, setMenuType] = useState<MenuType>(MenuType.USER);
  const [hasAlarm, setHasAlarm] = useState<boolean>(false);
  const [overflow, setOverflow] = useState<string>('auto');

  const {
    setAlarmMenuData,
    isMenuOpened: isAlarmMenuOpened,
    setIsMenuOpened: setIsAlarmMenuOpened,
    AlarmMenuData
  } = useAlarmLayout();

  const windowSize = useWindowSizeStore(state => state.windowSize);
  const isMobile = windowSize === WindowSize.MOBILE;
  const iconSize = windowSize <= WindowSize.TABLET ? 24 : 28;
  const isLogin = !!authControl.getToken();

  const alarmRef = useRef<HTMLButtonElement>(null);
  const userRef = useRef<HTMLButtonElement>(null);

  console.log('update');

  useEffect(() => {
    // Todo: any 데이터 타입 수정
    if (isLogin) {
      Api.fetch2Json('/api/v1/alert?page=0&size=10')
        .then(res => {
          const AlertList = res.alertResponseList;

          // 알람이 있는지 확인
          setHasAlarm(AlertList.some((alert: any) => !alert.read));

          // Todo: 멘토 | 기업 승인 거절 시에도 토큰 업데이트 기능 추가
          //  토큰 무한 업데이트 되지 않도록 처리하기
          // 알람 중 멘토 | 기업 승인 요청이 있다면 토큰 업데이트
          const MentorContents = '이제부터 멘토링을 등록할 수 있습니다.';
          const mentorRequest = AlertList.find((v: any) => !!v && v.alertType === 'MENTORING' && v.content === MentorContents);
          const EnterpriseAuthContents = '기업 인증이 완료 되었습니다.';
          const hasEnterpriseAuthReq = AlertList.some((v: any) => !!v && v.alertType === 'ETC' && v.content === EnterpriseAuthContents);

          const token = authControl.getInfoFromToken();
          const isMentor = token && token.role === 'MENTOR';
          const isEnterprise = token && token.role === 'ENTERPRISE';

          if (mentorRequest && !isMentor || hasEnterpriseAuthReq && !isEnterprise) {
            authControl.updateToken();
          }
        });
    }
  }, [document.cookie]);

  function clickMobileMenu(type: MenuType) {
    setMenuType(type);
    if (!isMenuOpened)
      setIsMenuOpened(true);
    else if (menuType === type || type === MenuType.USER)
      setIsMenuOpened(false);
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
                    <NavLink className={({isActive}) => isActive ? 'selected' : ''}
                          to={menu.path}>{menu.name}</NavLink>
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
                        onClick={() => isMobile ? clickMobileMenu(MenuType.USER) : setIsUserModalOpened(true)}>
                  {isMobile && isMenuOpened ? (
                    <CloseIcon width={iconSize} height={iconSize} round={true}/>
                  ) : (
                    <UserIcon width={iconSize} height={iconSize}/>
                  )}
                </button>
              </>
            ) : (
              <button className='link' onClick={authControl.login}>로그인 / 가입</button>
            )}
          </div>
        </div>
        {isMobile && !isMenuOpened && (
          <ul className='mobile_menu_layout'>
            {NavMenus.map((menu) => (
              <li key={menu.name} onClick={() => navigate(menu.path)}>
                <NavLink className={({isActive}) => isActive ? 'selected' : ''}
                      to={menu.path}>{menu.mobileName}</NavLink>
              </li>
            ))}
          </ul>
        )}

        {isMobile && isMenuOpened && (
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
                                             target={alarmRef?.current}/>}
          {isUserModalOpened && <UserModal setIsUserModalOpened={setIsUserModalOpened}
                                           target={userRef?.current}/>}
          {isAlarmMenuOpened && <AlarmMenu {...AlarmMenuData} setIsMenuOpened={setIsAlarmMenuOpened}/>}
        </div>}
    </>
  );
}

export default Navigation;