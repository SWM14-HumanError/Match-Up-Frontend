import {Link} from 'react-router-dom';
import {NavMenus} from './navigation/Navigation.tsx';
import LogoWhite from '../../assets/LOGO_WHITE.png';

import '../styles/components/Footer.scss';

const EmailAddress = 'sidematchdev@gmail.com';

const FooterMenus = [
  {
    title: '바로가기',
    menu: [
      { name: '메인', path: '/' },
      ...NavMenus
    ]
  },
  {
    title: '이용안내',
    menu: [
      { name: '공지사항', path: '/announcement' },
      { name: 'FAQ', path: '/faq' },
    ]
  },
  {
    title: '서비스 약관',
    menu: [
      { name: '서비스 이용약관', path: '/terms/service' },
      { name: '개인정보이용약관', path: '/terms/info', bold: true },
    ]
  },
  {
    title: '고객 센터',
    menu: [
      { name: '오류 신고 및 제안', path: '/inquiry/personal' },
    ]
  },
];

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer_project_info'>
          <img src={LogoWhite} alt='logo'/>

          <ul>
            <li><b>주소</b> 서울특별시 강남구 테헤란로 311</li>
            {/*<li><b>대표</b> 유준혁 주제무 채현우</li>*/}
            {/*<li><b>전화번호</b> 02-6933-0701 ~ 5</li>*/}
            <li><b>이메일</b> {EmailAddress}</li>
          </ul>
        </div>

        <div className='footer_shortcut_layout'>
          {FooterMenus.map((menu, index) => (
            <div key={index}>
              <h5>{menu.title}</h5>
              <ul>
                {menu.menu.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}
                          className={item.bold ? 'bold' : ''}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;