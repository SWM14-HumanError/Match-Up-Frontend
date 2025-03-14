import {useEffect, useRef} from 'react';
import useInfScroll from '@hooks/useInfScroll.ts';
import AdminNavigation from '@components/navigation/AdminNavigation.tsx';
import {IInquiry, IInquiryList} from '@constant/interfaces.ts';
import {InquiryAdapter} from '@constant/InfScrollAdapter.ts';

const ThList = ['생성일', '내용'];

function BugReportPage() {
  // const [denyDialogOpen, setDenyDialogOpen] = useState<boolean>(false);
  // const [denyVerifyFunc, setDenyVerifyFunc] = useState<(comment: string) => void>((_: string) => {
  // });
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const adapter = useRef(new InquiryAdapter());
  const {data, loading, isEmpty}
    = useInfScroll<IInquiryList, IInquiry>(adapter.current, infScrollLayout);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  // function openDenyDialog(func: (_: string) => void) {
  //   setDenyVerifyFunc(() => func);
  //   setDenyDialogOpen(true);
  // }

  return (
    <>
      {/*<AdminMentorDenyVerify clickFunc={denyVerifyFunc} titleString='멘토' typeString='거절' isOpen={denyDialogOpen}*/}
      {/*                       setIsOpen={setDenyDialogOpen}/>*/}
      <AdminNavigation/>

      <div className='main_layout'>
        <h1>버그 제보 및 문의 목록</h1>

        {!loading && isEmpty ? (
          <div className='list_no_contents'>
            <p>진행된 문의가 없습니다</p>
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
              {data.list.map((verifies, index: number) => verifies && (
                <AdminReportView key={index} {...verifies}/>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
}


function AdminReportView({title, content, createdAt}: IInquiry) {
  // const [verified, setVerified] = useState<boolean>(false);

  // function acceptVerify() {
  //   if (verified) return;
  //
  //   Api.fetch(`/api/v1/mentoring/verify/${verifyId}/accept`, 'POST')
  //     .then()
  //     .finally(() => setVerified(true));
  // }
  //
  // function denyVerify(comment: string) {
  //   if (verified) return;
  //
  //   Api.fetch(`/api/v1/mentoring/verify/${verifyId}/refuse?comment=${comment}`, 'POST')
  //     .then()
  //     .finally(() => setVerified(true));
  // }
  //
  // function openDialog() {
  //   if (verified) return;
  //   openDenyDialog(denyVerify);
  // }

  const createdDate = createdAt.replace('T', ' ').slice(0, 16);

  return (
    <tr>
      <td>{createdDate}</td>
      <td>
        <b>{title}</b>
        <br/>
        {content}
      </td>
      {/*<td>{userNickname}</td>*/}
      {/*<td>{userEmail}</td>*/}
      {/*<td>*/}
      {/*  <button className='link' onClick={acceptVerify}>승인하기</button>*/}
      {/*</td>*/}
      {/*<td>*/}
      {/*  <button className='link' onClick={openDialog}>거절하기</button>*/}
      {/*</td>*/}
    </tr>
  )
}

export default BugReportPage;