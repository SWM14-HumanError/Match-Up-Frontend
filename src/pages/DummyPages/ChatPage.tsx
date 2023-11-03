import {useRef, useState} from 'react';
import useStompChat from '../../hooks/useStompChat.ts';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import UserImage from '../../components/UserImage.tsx';
import TierSvg from '../../components/svgs/Tier/TierSvg.tsx';
import UserOnlyIcon from '../../components/svgs/UserOnlyIcon.tsx';
import ChattingComponent from '../../components/ChattingComponent.tsx';
import useInfScroll4Widget from '../../hooks/useInfScroll4Widget.ts';
import {IChattingMessage, IChattingRoom} from '../../constant/interfaces.ts';

import '../../styles/MainProjectPage.scss';
import '../../styles/pages/ChatPage.scss';


const dummy = {
  chatRoomResponseList: [],
  size: 0,
  hasNextSlice: false
}

function ChatPage() {
  const [selectedChatRoom, setSelectedChatRoom] = useState<IChattingRoom|null>(null);

  const infScrollRef = useRef<HTMLDivElement>(null);
  const {data, /*setReqParams, hideData,*/ changeData, isEmpty} = useInfScroll4Widget(`/api/v1/chat/room`, 'chatRoomResponseList', infScrollRef, dummy, {page: 0});
  const {sendMessage, setOnReceiveMessageFunction, senderInfo} = useStompChat(data);


  // 채팅방 생성
  // useEffect(() => {
  //   const receiverId = 4;
  //   Api.fetch(`/api/v1/chat/room/${receiverId}`, 'POST')
  //     .then(res => console.log(res));
  // }, []);

  function updateChatRoomInfo(chatRoomId: number, message: string, sendTime: string, unreadCount: number = 1) {
    const index = data.chatRoomResponseList.findIndex((chatRoom: IChattingRoom) => chatRoom.chatRoomId === chatRoomId);

    changeData(index, prev => ({
      ...prev,
      lastChat: message,
      lastChatDate: sendTime,
      unreadCount: prev.unreadCount + unreadCount,
    }));
  }

  function setChattingRoom(chatRoom: IChattingRoom) {
    setSelectedChatRoom(chatRoom);
  }

  function sendMessageFunction(chatRoomId: number, message: string) {
    sendMessage(chatRoomId, message);
    updateChatRoomInfo(chatRoomId, message, new Date().toISOString(), 0);
  }

  function setOnMessageReceived(chatRoomId: number, onMessageReceived: null | ((message: IChattingMessage) => void)) {
    setOnReceiveMessageFunction(chatRoomId, (message: IChattingMessage) => {
      updateChatRoomInfo(chatRoomId, message.message, message.sendTime);

      if (onMessageReceived)
        onMessageReceived(message);
    });
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout chat_page'>
        <h1>채팅</h1>

        <div className='chat_border_layout'>
          <div ref={infScrollRef} className='chat_list_layout'>
            <div className=''>
              { isEmpty() ? (
                <p>채팅이 없습니다</p>
              ) : (
                <ul>
                  { data.chatRoomResponseList.map((chatRoom: IChattingRoom, index: number) => chatRoom && (
                    <ChatListItem key={index}
                                  chatRoom={chatRoom}
                                  setChattingRoom={setChattingRoom}
                                  selected={chatRoom.chatRoomId === selectedChatRoom?.chatRoomId}/>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <ChattingComponent chatRoom={selectedChatRoom}
                             sendMessage={sendMessageFunction}
                             setOnMessageReceived={setOnMessageReceived}
                             senderInfo={senderInfo}/>
        </div>

      </div>

      <Footer/>
    </>
  );
}

interface IChatListItem {
  chatRoom: IChattingRoom;
  setChattingRoom: (chatRoom: IChattingRoom) => void;
  selected: boolean;
}

function ChatListItem({chatRoom, setChattingRoom, selected}: IChatListItem) {
  const {sender, peopleCount, unreadCount, lastChat} = chatRoom;

  return (
    <li className={selected ? 'selected' : ''}
        onClick={() => setChattingRoom(chatRoom)}>
      <UserImage profileImageURL={sender.pictureUrl} />
      <div>
        <div className='chat_list_view_header'>
          <div className='user_profile_div'>
            <TierSvg width={20} height={20} tier={sender.level} />
            <span>{sender.nickname}</span>
          </div>
          { peopleCount > 2 && (
            <div>
              <UserOnlyIcon width={14} height={14} />
              <span>{peopleCount}</span>
            </div>
          )}
        </div>

        <div className='chat_list_view_body'>
          <span>{lastChat}</span>
          { unreadCount > 0 && (
            <span className='unread_count'>{unreadCount}</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default ChatPage;