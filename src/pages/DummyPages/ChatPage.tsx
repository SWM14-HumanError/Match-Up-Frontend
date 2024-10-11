import {useEffect, useRef, useState} from 'react';
import useStompChat from '@hooks/useStompChat.ts';
import Navigation from '@components/navigation/Navigation.tsx';
import Footer from '@components/Footer.tsx';
import UserImage from '@components/UserImage.tsx';
import TierSvg from '@components/svgs/Tier/TierSvg.tsx';
import UserOnlyIcon from '@components/svgs/UserOnlyIcon.tsx';
import ChattingComponent from '@components/ChattingComponent.tsx';
import ChattingDialog from '@components/dialogLayout/ChattingDialog.tsx';
import useInfScroll4Widget from '@hooks/useInfScroll4Widget.ts';
import useUserInfo from '@hooks/useUserInfo.ts';
import useWindowSizeStore from '@/stores/useWindowSizeStore.ts';
import {IChattingMessage, IChattingRoom} from '@constant/interfaces.ts';

import '@styles/MainProjectPage.scss';
import '@styles/pages/ChatPage.scss';


const dummy = {
  chatRoomResponseList: [],
  size: 0,
  hasNextSlice: false
}

function ChatPage() {
  const [selectedChatRoom, setSelectedChatRoom] = useState<IChattingRoom|null>(null);
  const [selectedChatUserId, setSelectedChatUserId] = useState<number>(-1);
  const [isChattingDialogOpen, setIsChattingDialogOpen] = useState<boolean>(false);

  const infScrollRef = useRef<HTMLDivElement>(null);
  const {data, /*setReqParams, hideData,*/ changeData, isEmpty} = useInfScroll4Widget(`/api/v1/chat/room`, 'chatRoomResponseList', infScrollRef, dummy, {page: 0});
  const {sendMessage, setOnReceiveMessageFunction} = useStompChat(data);

  const isMobile = useWindowSizeStore(state => state.isMobile);

  function updateChatRoomInfo(chatRoomId: number, message: string, sendTime: string, unreadCount: number = 1) {
    const index = data.chatRoomResponseList.findIndex((chatRoom: IChattingRoom) => chatRoom.chatRoomId === chatRoomId);

    changeData(index, prev => ({
      ...prev,
      lastChat: message,
      lastChatDate: sendTime,
      unreadCount: chatRoomId === selectedChatRoom?.chatRoomId ? 0 : prev.unreadCount + unreadCount,
    }));
  }

  function setChattingRoom(chatRoom: IChattingRoom) {
    setSelectedChatRoom(chatRoom);

    if (isMobile) {
      setSelectedChatUserId(chatRoom.sender.userId);
      setIsChattingDialogOpen(true);
    }
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
      {isMobile && (
        <ChattingDialog targetUserId={selectedChatUserId}
                        isOpen={isChattingDialogOpen}
                        setIsOpen={setIsChattingDialogOpen}/>
      )}
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
                                  selected={!isMobile && chatRoom.chatRoomId === selectedChatRoom?.chatRoomId}
                                  setOnMessageReceived={setOnMessageReceived}/>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {!isMobile && (
            <ChattingComponent chatRoom={selectedChatRoom}
                               sendMessage={sendMessageFunction}
                               setOnMessageReceived={setOnMessageReceived}/>
          )}
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
  setOnMessageReceived: (chatRoomId: number, onMessageReceived: null | ((message: IChattingMessage) => void)) => void;
}

function ChatListItem({chatRoom, setChattingRoom, selected, setOnMessageReceived}: IChatListItem) {
  const {sender, peopleCount, unreadCount, lastChat} = chatRoom;
  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(chatRoom.sender.nickname, chatRoom.sender.level);

  useEffect(() => {
    setOnMessageReceived(chatRoom.chatRoomId, null);
  }, []);

  return (
    <li className={selected ? 'selected' : ''}
        onClick={() => setChattingRoom(chatRoom)}>
      <UserImage profileImageURL={sender.pictureUrl} isAvailableUser={isAvailableUser}/>
      <div>
        <div className='chat_list_view_header'>
          <div className='user_profile_div'>
            <TierSvg width={20} height={20} tier={fixedPositionLevel} />
            <span>{fixedNickname}</span>
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