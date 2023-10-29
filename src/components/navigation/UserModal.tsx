import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import RightArrow from '../svgs/RightArrow.tsx';
import UserImage from '../UserImage.tsx';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';
import {MyUserDetailDummy} from '../../dummies/dummyData.ts';
import {IMyPageDetail} from '../../constant/interfaces.ts';
import {InitMyPageDetail} from '../../constant/initData.ts';

interface IUserModal {
  setIsUserModalOpened: (isUserModalOpened: boolean) => void;
  target: HTMLElement | undefined;
}

const UserMenus = [
  // {title: '마이페이지', path: '/mypage'},
  {title: '내 모임', path: '/mypage/group'},
  {title: '내 프로필', path: '/mypage/profile'},
  {title: '좋아요 목록', path: '/mypage/like'},
  {title: '채팅 내역', path: '/chat'},
  {title: '설정', path: '/profile/settings'},
  // {title: '구매 내역', path: '/mypage/??'},
];

const MentorMenus = [
  {title: '멘토링 관리', path: '/mypage/mentor'},
];

const AdminMenus = [
  {title: '관리자 도구', path: '/admin'},
];

function UserModal({setIsUserModalOpened, target}: IUserModal) {
  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 400;
  const x = center - width / 2;
  const adjustedX = window.innerWidth < x + width ? window.innerWidth - width - 16 : x;

  const [myPageDetail, setMyPageDetail] = useState<IMyPageDetail>(InitMyPageDetail);

  const token = authControl.getInfoFromToken();
  const userId = token ? token.id : '';
  const userRole = token ? token.role : '';

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userId}`)
      .then(res => setMyPageDetail(res))
      .catch(() => {
        if (Api.isLocalhost())
          setMyPageDetail(MyUserDetailDummy);
        else
          setMyPageDetail({
            ...InitMyPageDetail,
            nickname: '로그인이 필요합니다',
          })
      });
  }, []);

  return (
    <div className='modal_background user_modal'
         style={{left: adjustedX}}
         onClick={e => e.stopPropagation()}>
      <div className='user_header_layout'>
        <UserImage profileImageURL={myPageDetail.pictureUrl}/>
        <div>
          <div>
            <TierSvg width={15} height={20} tier={myPageDetail.bestPositionLevel}/>
            <h3>{myPageDetail.nickname}</h3>
          </div>
          <p>온도 {myPageDetail.feedbackScore}ºC</p>
          {/*<div className='seekbar'>*/}
          {/*  <div></div>*/}
          {/*</div>*/}
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

        { userRole === 'MENTOR' && MentorMenus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>
              <h4>{menu.title}</h4>
              <RightArrow width={8} height={16} rotate={0}/>
            </Link>
          </li>
        ))}

        { userRole === 'ADMIN' && AdminMenus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>
              <h4>{menu.title}</h4>
              <RightArrow width={8} height={16} rotate={0}/>
            </Link>
          </li>
        ))}
      </ul>

      <div className='user_footer_layout'>
        <button className='link' onClick={authControl.logout}>로그아웃</button>
      </div>
    </div>
  );
}

export default UserModal;