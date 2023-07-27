import {Link, useLocation} from 'react-router-dom';
import Bell from "./svgs/Bell.tsx";
import UserIcon from "./svgs/UserIcon.tsx";
import Logo from '../assets/logo.png';
import '../styles/components/Navigation.scss';

interface INav {
  isLogin: boolean,
}

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

function Navigation({isLogin}: INav) {
  const {pathname} = useLocation();

  return (
    <nav>
      <div>
        <div className='nav_menu_layout'>
          <Link to='/'>
            <img className='logo'
                 src={Logo}
                 alt='MatchUp'/>
          </Link>
          <ul className="nav_menu">
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
            <button>
              <Bell width={28} height={28} state={0}/>
            </button>
            <button>
              <UserIcon width={28} height={28}/>
            </button>
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