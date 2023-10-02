import {useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';
import Api from "../../constant/Api.ts";

enum SendingStatus {
  NOT_SENT,
  SENDING,
  SENT,
  ERROR,
}

function Inquiry() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSending, setIsSending] = useState<SendingStatus>(SendingStatus.NOT_SENT);

  function sendInquiry() {
    if (isSending !== SendingStatus.NOT_SENT) return;

    setIsSending(SendingStatus.SENDING);
    Api.fetch('/api/v1/inquiry', 'POST', {
      title: title,
      content: content,
    })
      .then(res => {
        if (res?.ok) setIsSending(SendingStatus.SENT);
      })
      .catch(err => {
        console.error(err);
        setIsSending(SendingStatus.ERROR);
      })
      .finally(() => setTimeout(() => setIsSending(SendingStatus.NOT_SENT), 2000));
  }

  function getButtonMessage() {
    switch (isSending) {
      case SendingStatus.NOT_SENT:
        return '문의하기';
      case SendingStatus.SENDING:
        return '전송중...';
      case SendingStatus.SENT:
        return '전송 완료';
      case SendingStatus.ERROR:
        return '전송 실패';
    }
  }

  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>1:1 문의</h1>

        <h2>문의 제목</h2>
        <input type='text'
               placeholder='제목을 입력해주세요.'
               value={title}
               onChange={e => setTitle(e.target.value)}/>

        <h2>문의 내용</h2>
        <textarea placeholder='내용을 입력해주세요.'
                  value={content}
                  onChange={e => setContent(e.target.value)}/>

        <p>문의하신 내용은 개발자에게 직접 전달되며, 문의에 대한 답변은 알림을 통해 전달됩니다</p>

        <div className='button_layout'>
          <button onClick={sendInquiry}
                  className={isSending === SendingStatus.ERROR ? 'danger' : ''}
                  disabled={isSending !== SendingStatus.NOT_SENT}>
            {getButtonMessage()}
          </button>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default Inquiry;