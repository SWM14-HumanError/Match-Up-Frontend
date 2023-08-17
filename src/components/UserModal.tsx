import CloseIcon from "./svgs/CloseIcon.tsx";
import TierSvg from "./svgs/Tier/TierSvg.tsx";
import RightArrow from "./svgs/RightArrow.tsx";
import {Link} from "react-router-dom";

interface IUserModal {
  setIsUserModalOpened: (isUserModalOpened: boolean) => void;
}

const UserMenus = [
  {title: '마이페이지', path: '/mypage'},
  {title: '내 모임', path: '/mypage/group'},
  {title: '내 프로필', path: '/mypage/profile'},
  {title: '채팅 내역', path: '/mypage/??'},
  {title: '구매 내역', path: '/mypage/??'},
];

function UserModal({setIsUserModalOpened}: IUserModal) {

  function logout() {
    const redirectUrl = window.location.pathname;

    localStorage.setItem('redirectUrl', redirectUrl);
    window.location.href = '/logout';
  }

  return (
    <div className='modal_background user_modal'
         onClick={e => e.stopPropagation()}>
      <div className='user_header_layout'>
        <img src="https://avatars.githubusercontent.com/u/48755175?v=4" alt="user_image"/>
        <div>
          <div>
            <TierSvg width={15} height={20} tier={1}/>
            <h3>알고리즘 왕</h3>
          </div>
          <p>LV. 4 EXP. 38%</p>
          <div className='seekbar'>
            <div></div>
          </div>
        </div>
        <button className='svg_button'
                onClick={() => setIsUserModalOpened(false)}>
          <CloseIcon width={28} height={28}/>
        </button>
      </div>

      <ul className='user_modal_contents'>
        { UserMenus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>
              <h4>{menu.title}</h4>
              <RightArrow width={8} height={16} rotate={0}/>
            </Link>
          </li>
        ))}
      </ul>

      <div className='user_footer_layout'>
        <button className='link' onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
}

export default UserModal;