import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import useInfScroll from '../../hooks/useInfScroll.ts';
import AdminMentorDenyVerify from '../../components/dialogLayout/ApplySimpleContentsDialog.tsx';
import CI from '../../../assets/CI.svg';
import {IMentorVerify, IMentorVerifyList} from '../../constant/interfaces.ts';
import {feeds} from '../../dummies/dummyData.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/AdminPage.scss';


export const AdminNavMenus = [
  {
    name: '프로젝트',
    path: 'admin/project',
  },
  // {
  //   name: '스터디',
  //   path: '/admin/study',
  // },
  // {
  //   name: '팀원',
  //   path: '/admin/mentee',
  // },
  // {
  //   name: '멘토',
  //   path: '/admin/mentor',
  // },
  // {
  //   name: '피드',
  //   path: '/admin/feed',
  // },
];


const ThList = ['id', '이미지', '직무', '경력', '멘토 소개', '링크', '유저 보기', '승인', '거절'];

function AdminPage() {
  const {pathname} = useLocation();
  const [denyDialogOpen, setDenyDialogOpen] = useState<boolean>(false);
  const [denyVerifyFunc, setDenyVerifyFunc] = useState<(comment:string)=>void>((_: string) => {});
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading}
    = useInfScroll<IMentorVerifyList>('/api/v1/mentoring/verify/list', 'verifyMentorsResponses', infScrollLayout, feeds, {});

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  function openDenyDialog(func: (_:string) => void) {
    setDenyVerifyFunc(() => func);
    setDenyDialogOpen(true);
  }

  return (
    <>
      <AdminMentorDenyVerify clickFunc={denyVerifyFunc} titleString='멘토' typeString='거절' isOpen={denyDialogOpen} setIsOpen={setDenyDialogOpen} />
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

      <div className='main_layout'>
        <h1>멘토 지원 목록</h1>

        { !loading && (!data.verifyMentorsResponses.length || !data.verifyMentorsResponses[0]) ? (
          <div className='list_no_contents'>
            <p>지원자가 없습니다</p>
          </div>
        ) : (
          <table className='admin_table'>
            <thead>
              <tr>
                {ThList.map(tag => (
                  <th key={tag}>{tag}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.verifyMentorsResponses.map((verifies: IMentorVerify|null) => verifies && (
                <AdminVerifyView key={verifies.verifyId} {...verifies} openDenyDialog={openDenyDialog}/>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
}

interface IAdminVerifyView extends IMentorVerify {
  openDenyDialog: (func: (s:string) => void) => void;
}

function AdminVerifyView({career, content, link, roleType, thumbnailUrl, userId, verifyId, openDenyDialog}: IAdminVerifyView) {
  const [verified, setVerified] = useState<boolean>(false);
  function acceptVerify() {
    if (verified) return;

    Api.fetch(`/api/v1/mentoring/verify/${verifyId}/accept`, 'POST')
      .then()
      .finally(() => setVerified(true));
  }

  function denyVerify(comment: string) {
    if (verified) return;

    Api.fetch(`/api/v1/mentoring/verify/${verifyId}/refuse?comment=${comment}`, 'POST')
      .then()
      .finally(() => setVerified(true));
  }

  function openDialog() {
    if (verified) return;
    openDenyDialog(denyVerify);
  }

  return (
    <tr className={verified ? 'verified' : ''}>
      <td>{verifyId}</td>
      <td className='image-container'><a href={thumbnailUrl ?? ''} target='_blank'><img src={thumbnailUrl ?? ''} alt=''/></a></td>
      <td>{roleType}</td>
      <td>{career}</td>
      <td>{content}</td>
      <td><a href={link}>{link}</a></td>

      <td><a href={`/profile/${userId}`} target='_blank'>유저 상세</a></td>
      <td><button className='link' onClick={acceptVerify}>승인하기</button></td>
      <td><button className='link' onClick={openDialog}>거절하기</button></td>
    </tr>
  )
}

export default AdminPage;