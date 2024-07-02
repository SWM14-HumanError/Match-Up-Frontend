import {useEffect, useRef, useState} from 'react';
import useInfScroll from '../../hooks/useInfScroll.ts';
import AdminMentorDenyVerify from '../../components/dialogLayout/ApplySimpleContentsDialog.tsx';
import AdminNavigation from '../../components/navigation/AdminNavigation.tsx';
import {ICompanyVerify, ICompanyVerifyList} from '../../constant/interfaces.ts';
import {feeds} from '../../dummies/dummyData.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/AdminPage.scss';


const ThList = ['id', '이미지', '직무', '경력', '멘토 소개', '링크', '유저 보기', '승인', '거절'];

// Todo: 변수 이름 변경 및  인터페이스 이름 변경
function AdminPage() {
  const [denyDialogOpen, setDenyDialogOpen] = useState<boolean>(false);
  const [denyVerifyFunc, setDenyVerifyFunc] = useState<(comment:string)=>void>((_: string) => {});
  const infScrollLayout = useRef<HTMLDivElement>(null);

  // Todo: DummyData 변경
  const {data, loading}
    = useInfScroll<ICompanyVerifyList>('/api/v1/enterprise/verify/list', 'enterpriseApplyList', infScrollLayout, feeds, {});

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
        <h1>기업 지원 목록</h1>

        { !loading && (!data.verifyEnterpriseResponses.length || !data.verifyEnterpriseResponses[0]) ? (
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
              {data.verifyEnterpriseResponses.map((verifies: ICompanyVerify|null) => verifies && (
                <AdminVerifyView key={verifies.verifyId} {...verifies} openDenyDialog={openDenyDialog}/>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
}

interface IEnterpriseVerifyView extends ICompanyVerify {
  openDenyDialog: (func: (s:string) => void) => void;
}

function AdminVerifyView({content, enterpriseEmail, verifyId, openDenyDialog}: IEnterpriseVerifyView) {
  const [verified, setVerified] = useState<boolean>(false);
  function acceptVerify() {
    if (verified) return;

    Api.fetch(`/api/v1/enterprise/verify/${verifyId}/accept`, 'POST')
      .then()
      .finally(() => setVerified(true));
  }

  function denyVerify(comment: string) {
    if (verified) return;

    Api.fetch(`/api/v1/enterprise/verify/${verifyId}/refuse?comment=${comment}`, 'POST')
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
      <td>{enterpriseEmail}</td>
      <td>{content}</td>
      <td><button className='link' onClick={acceptVerify}>승인하기</button></td>
      <td><button className='link' onClick={openDialog}>거절하기</button></td>
    </tr>
  )
}

export default AdminPage;