import {Link, NavLink} from 'react-router-dom';
import CI from '@assets/CI.svg';
import '@styles/pages/AdminPage.scss';


export const AdminNavMenus = [
  {
    name: '기업 지원 목록',
    path: '/admin',
  },
  {
    name: '멘토 지원 목록',
    path: '/admin/auth/mentor',
  },
  {
    name: '버그 신고',
    path: '/admin/bug',
  },
  {
    name: '스택',
    path: '/admin/test/stack',
  },
  {
    name: '채팅 테스트',
    path: '/admin/test/chat',
  },
];

function AdminNavigation() {
  return (
    <nav className='admin_navigation_layout'>
      <div>
        <div className='nav_menu_layout'>
          <Link to='/admin' className='ci_link'>
            <img className='logo'
                 src={CI}
                 alt='SideMatch'/>
            <span>관리자</span>
            <span className='highlight'>페이지</span>
          </Link>
          <ul className='nav_menu'>
            {AdminNavMenus.map((menu) => (
              <li key={menu.name}>
                <NavLink className={({isActive}) => isActive ? 'selected' : ''}
                      to={menu.path} end>{menu.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link to='/'>메인 페이지</Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavigation;