import {Link, useLocation} from 'react-router-dom';
import CI from '../../../assets/CI.svg';
import '../../styles/pages/AdminPage.scss';


export const AdminNavMenus = [
  {
    name: '멘토 지원 목록',
    path: '/admin',
  },
  {
    name: '버그 신고',
    path: '/admin/bug',
  },
  {
    name: '채팅 테스트',
    path: '/admin/test/chat',
  },
];

function AdminNavigation() {
  const {pathname} = useLocation();
  
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
                <Link className={pathname === menu.path ? 'selected' : ''}
                      to={menu.path}>{menu.name}</Link>
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