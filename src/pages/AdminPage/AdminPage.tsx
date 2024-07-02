import {useEffect, useRef} from 'react';
import useInfScroll from '../../hooks/useInfScroll.ts';
import AdminNavigation from '../../components/navigation/AdminNavigation.tsx';
import {ICompanyVerify, ICompanyVerifyList} from '../../constant/interfaces.ts';
import {enterprises} from '../../dummies/dummyData.ts';
import Api from '../../constant/Api.ts';
import Alert from '../../constant/Alert.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/AdminPage.scss';


const ThList = ['id', '닉네임', '이메일', '소개', '승인 상태', '상태 변경'];

function AdminPage() {
  const infScrollLayout = useRef<HTMLDivElement>(null);

  const {data, loading}
    = useInfScroll<ICompanyVerifyList>('/api/v1/enterprise/verify/list', 'enterpriseApplyList', infScrollLayout, enterprises, {});

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  function changeState(index: number) {
    const {enterpriseApplyId, isAccepted}= data.enterpriseApplyList[index];

    Api.fetch('/api/v1/enterprise/verify/change',
      'POST',
      {enterpriseApplyId, isAccepted})
      .then(response => {
        if (response) {
          Alert.show('상태가 변경되었습니다');
          location.href = '/admin';
        }
        else {
          throw new Error(response || '상태 변경에 실패했습니다');
        }
      }).catch(e => {
        Alert.show('상태 변경에 실패했습니다');
        console.error(e);
      });
  }

  return (
    <>
      <AdminNavigation/>

      <div className='main_layout'>
        <h1>기업 지원 목록</h1>

        { !loading && (!data.enterpriseApplyList.length || !data.enterpriseApplyList[0]) ? (
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
              {data.enterpriseApplyList.map((verifies: ICompanyVerify, index: number) => verifies && (
                <EnterpriseVerifyView key={index} {...verifies}
                                 changeState={() => changeState(index)}/>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
}

interface IEnterpriseVerifyView extends ICompanyVerify {
  changeState: () => void;
}

function EnterpriseVerifyView({enterpriseApplyId, content, enterpriseEmail, userNickname, isAccepted, changeState}: IEnterpriseVerifyView) {
  return (
    <tr className={isAccepted ? 'verified' : ''}>
      <td>{enterpriseApplyId}</td>
      <td>{userNickname}</td>
      <td>{enterpriseEmail}</td>
      <td>{content}</td>
      <td style={isAccepted ? ({color:'lightgreen'}) : ({color: 'red'})}>
        {isAccepted ? '승인됨' : '승인안됨'}
      </td>
      <td>
        {isAccepted ? (
          <button className='stack' style={{background: 'red'}} onClick={changeState}>거절하기</button>
        ) : (
          <button className='stack' onClick={changeState}>승인하기</button>
        )}
      </td>
    </tr>
  )
}

export default AdminPage;