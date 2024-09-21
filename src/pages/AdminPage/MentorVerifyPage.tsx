import {useEffect, useRef, useState} from 'react';
import useInfScroll from '@hooks/useInfScroll.ts';
import AdminMentorDenyVerify from '@components/dialogLayout/ApplySimpleContentsDialog.tsx';
import AdminNavigation from '@components/navigation/AdminNavigation.tsx';
import {IMentorVerify, IMentorVerifyList} from '@constant/interfaces.ts';
import {MentorVerifyAdapter} from '@constant/InfScrollAdapter.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';
import '@styles/pages/AdminPage.scss';


const ThList = ['id', '이미지', '직무', '경력', '멘토 소개', '링크', '유저 보기', '승인', '거절'];

function MentorVerifyPage() {
  const [denyDialogOpen, setDenyDialogOpen] = useState<boolean>(false);
  const [denyVerifyFunc, setDenyVerifyFunc] = useState<(comment:string)=>void>((_: string) => {});
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const adapter = useRef(new MentorVerifyAdapter());
  const {data, loading, isEmpty}
    = useInfScroll<IMentorVerifyList, IMentorVerify>(adapter.current, infScrollLayout);

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
      <AdminNavigation/>

      <div className='main_layout'>
        <h1>멘토 지원 목록</h1>

        { !loading && isEmpty ? (
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
              {data.list.map((verifies) => verifies && (
                <MentorVerifyView key={verifies.verifyId} {...verifies} openDenyDialog={openDenyDialog}/>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
}

interface IMentorVerifyView extends IMentorVerify {
  openDenyDialog: (func: (s:string) => void) => void;
}

function MentorVerifyView({career, content, link, roleType, thumbnailUrl, userId, verifyId, openDenyDialog}: IMentorVerifyView) {
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

export default MentorVerifyPage;