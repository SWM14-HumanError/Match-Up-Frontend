import {useState} from 'react';
import AdminNavigation from '@components/navigation/AdminNavigation.tsx';
import ChattingDialog from '@components/dialogLayout/ChattingDialog.tsx';
import {TEST_VERSION} from '@hooks/useStompChat.ts';
import authControl from '@constant/authControl.ts';

function TestChattingPage() {
  const [isChattingDialogOpen, setIsChattingDialogOpen] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');
  const [targetUserId, setTargetUserId] = useState<number>(-1);

  const token = authControl.getInfoFromToken();
  const role = token ? token.role : '';
  
  if (role !== 'ADMIN')
    return (<div>관리자만 접근 가능합니다.</div>);
  
  return (
    <>
      <ChattingDialog targetUserId={targetUserId} isOpen={isChattingDialogOpen} setIsOpen={setIsChattingDialogOpen}/>
      <AdminNavigation/>

      <div className='main_layout'>
        <h1>TestChattingPage</h1>
        
        version: {TEST_VERSION}<br/>

        TargetUserId: <input type='text'
                             value={inputContent}
                             onChange={e => setInputContent(e.target.value)}
                             onBlur={() => setTargetUserId(Number(inputContent))}/>

        <button onClick={() => setIsChattingDialogOpen(true)}>채팅하기</button>
      </div>
    </>
  );
}

export default TestChattingPage;