import {useRef, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import LoginRecommendDialog from '../../components/dialogLayout/LoginRecommendDialog.tsx';
import Footer from '../../components/Footer.tsx';
import authControl from '../../constant/authControl.ts';
import Alert from '../../constant/Alert.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';

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

  const isLogin = !!authControl.getUserIdFromToken();
  console.log(isLogin, authControl.getUserIdFromToken());
  const [isOpen, setIsOpen] = useState<boolean>(!isLogin);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  function sendInquiry() {
    if (!isLogin) return setIsOpen(true);
    if (isSending !== SendingStatus.NOT_SENT) return;

    if (!title) {
      titleRef.current?.focus();
      return Alert.show('제목을 입력해주세요');
    }
    if (!content) {
      contentRef.current?.focus();
      return Alert.show('내용을 입력해주세요');
    }

    setIsSending(SendingStatus.SENDING);
    Api.fetch('/api/v1/inquiry', 'POST', {
      title: title,
      content: content,
    })
      .then(res => {
        if (res?.ok) {
          setIsSending(SendingStatus.SENT);
          setTitle('');
          setContent('');
          Alert.show('좋은 제안 주셔서 감사합니다');
        }
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
        return '제안하기';
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
      <LoginRecommendDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Navigation/>
      
      <div className='main_layout'>
        <h1>버그 신고 및 제안</h1>

        <h2 className='essential'>제목</h2>
        <input type='text'
               ref={titleRef}
               maxLength={49}
               placeholder='제목을 입력해주세요.'
               value={title}
               onChange={e => setTitle(e.target.value)}/>

        <h2 className='essential'>내용</h2>
        <textarea placeholder='내용을 입력해주세요.'
                  ref={contentRef}
                  maxLength={499}
                  value={content}
                  onChange={e => setContent(e.target.value)}/>

        <p>제안해주신 내용은 개발자에게 직접 전달되며, 좋은 제안은 개발자에게 힘이 됩니다</p>

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