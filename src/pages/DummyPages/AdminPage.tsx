import {Link, useLocation} from 'react-router-dom';
import CI from '../../../assets/CI.svg';
import authControl from '../../constant/authControl.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/AdminPage.scss';

export const AdminNavMenus = [
  {
    name: '프로젝트',
    path: 'admin/project',
  },
  {
    name: '스터디',
    path: '/admin/study',
  },
  {
    name: '팀원',
    path: '/admin/mentee',
  },
  {
    name: '멘토',
    path: '/admin/mentor',
  },
  {
    name: '피드',
    path: '/admin/feed',
  },
]

function AdminPage() {
  const {pathname} = useLocation();
  
  return (
    <>
      <nav className='admin_navigation_layout'>
        <div>
          <div className='nav_menu_layout'>
            <Link to='/admin' className='ci_link'>
              <img className='logo'
                   src={CI}
                   alt='MatchUp'/>
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
            <button className='link' onClick={authControl.logout}>로그아웃</button>
          </div>
        </div>
      </nav>

      <div className='main_layout'>
        <h1>Admin Page</h1>
      </div>

    </>
  );
}

export default AdminPage;