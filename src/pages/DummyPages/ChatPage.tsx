import {useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import UserImage from '../../components/UserImage.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/CharPage.scss';

function ChatPage() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    Api.fetch2Json('/api/v1/chat/room')
      .then(data => {
        setChatRooms(data);
        console.log(data, chatRooms);
      });
  }, []);

  return (
    <>
      <Navigation/>

      <div className='main_layout chat_page'>
        <h1>채팅</h1>

        <div className='chat_border_layout'>
          <div className='chat_list_layout'>
            <ul>
              <ChatListItem/>
            </ul>
          </div>

          <div className='chatting_layout'>
            <div className='user_profile_layout'>
              <UserImage profileImageURL='' />
              <TierSvg width={15} height={20} tier={3} />
              <span>채현우</span>
            </div>

            <ul className='chat_contents_layout'>
              {
                <>
                  <ChattingComponent/>
                  <ChattingComponent/>
                  <ChattingComponent/>
                </>
              }
            </ul>

            <div className='chat_submit_layout'>
              <textarea name='' id='' placeholder='대화 작성하기'></textarea>
              <button type='button'>보내기</button>
            </div>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  );
}

function ChatListItem() {
  return (
    <li>
      <UserImage profileImageURL='' />
      <TierSvg width={15} height={20} tier={3} />
      <span>채현우</span>
    </li>
  );
}

function ChattingComponent({}) {
  return (
    <li>
      <span>채팅입니다</span>
      <span className='is_read'>안읽음</span>
    </li>
  );
}

export default ChatPage;