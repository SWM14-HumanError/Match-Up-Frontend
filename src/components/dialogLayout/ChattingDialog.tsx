import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import ChattingComponent from '../ChattingComponent.tsx';
import useStompChat from '../../hooks/useStompChat.ts';
import {IChattingMessage, IChattingRoom, IChattingRoomList} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/InviteTeamDialog.scss';
import '../../styles/pages/ChatPage.scss';

interface IInviteDialog {
  targetUserId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const newChatData: IChattingRoom = {
  chatRoomId: -1,
  sender: {
    userId: -1,
    nickname: '',
    pictureUrl: null,
    level: null,
  },
  peopleCount: 2,
  unreadCount: 0,
  lastChat: new Date().toISOString(),
  lastChatTime: new Date().toISOString(),
}

function ChattingDialog({targetUserId, isOpen, setIsOpen}: IInviteDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const [chattingRoom, setChattingRoom] = useState<IChattingRoomList>({
    chatRoomResponseList: [],
    hasNextSlice: false,
    size: 0,
  });
  const {createChatRoom, sendMessage, setOnReceiveMessageFunction} = useStompChat(chattingRoom);


  // 채팅방이 있는지 확인 후, 채팅방이 있다면 채팅방 불러오기
  useEffect(() => {
    if (!isOpen || targetUserId <= 0) return;

    setIsLoading(true);
    setMessageQueue([]);
    Promise.all([
      Api.fetch2Json(`/api/v1/profile/${targetUserId}`),
      Api.fetch(`/api/v1/chat/user/${targetUserId}`),
    ])
      .then(async (res) => {
        const [userInfo, req] = res;
        const chatRoomId = Number(await req?.text());

        setChattingRoom({
          ...chattingRoom,
          chatRoomResponseList: [{
            ...newChatData,
            chatRoomId: !!chatRoomId ? chatRoomId : -1,
            sender: {
              userId: targetUserId,
              nickname: userInfo.nickname ?? '',
              pictureUrl: userInfo.pictureUrl,
              level: userInfo.bestPositionLevel,
            },
          }]
        });
      })
      .finally(() => setIsLoading(false));
  }, [targetUserId, isOpen]);

  // 메세지 큐에 메세지가 있다면, 채팅방이 생성되었을 때 메세지 보내기
  useEffect(() => {
    if (!chattingRoom.chatRoomResponseList[0] || chattingRoom.chatRoomResponseList[0]?.chatRoomId <= 0 || !messageQueue.length)
      return;

    console.log('sendMessage', messageQueue[0], 'to', chattingRoom.chatRoomResponseList[0]?.chatRoomId, 'from');
    console.log(chattingRoom);

    sendMessage(chattingRoom.chatRoomResponseList[0]?.chatRoomId, messageQueue[0]);
    setMessageQueue(prev => prev.splice(1));
  }, [chattingRoom.chatRoomResponseList, messageQueue]);

  // 채팅방이 없다면, 메세지 큐에 메세지를 넣어두고, 생성 후 메세지 보내기
  function sendMessageAsync(_: number, message: string) {
    if (!chattingRoom.chatRoomResponseList[0] || chattingRoom.chatRoomResponseList[0]?.chatRoomId <= 0)
      createChatRoom(0, chattingRoom.chatRoomResponseList[0]?.sender)
        .then((newChatRoom) => {
          setChattingRoom({
            ...chattingRoom,
            chatRoomResponseList: [newChatRoom],
          });
          console.log('createChatRoom for fetch', newChatRoom);
        });

    setMessageQueue(prev => [...prev, message]);
  }

  function setOnMessageReceived(chatRoomId: number, onMessageReceived: null | ((message: IChattingMessage) => void)) {
    setOnReceiveMessageFunction(chatRoomId, (message: IChattingMessage) => {
      if (onMessageReceived)
        onMessageReceived(message);
    });
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='invite_team_dialog width_min_limit_480'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>채팅</span>
              <h3>{chattingRoom.chatRoomResponseList[0]?.sender.nickname}님과의 채팅</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content chat_page'>
            <ChattingComponent chatRoom={chattingRoom.chatRoomResponseList[0]}
                               sendMessage={sendMessageAsync}
                               setOnMessageReceived={setOnMessageReceived}/>
          </div>

          <div className='dialog_footer'></div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default ChattingDialog;