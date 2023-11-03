import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import ChattingComponent from '../ChattingComponent.tsx';
import useStompChat from '../../hooks/useStompChat.ts';
import {IChattingMessage, IChattingRoom, IChattingRoomList, IMyPageDetail} from '../../constant/interfaces.ts';
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
  const {createChatRoom, sendMessage, setOnReceiveMessageFunction, senderInfo} = useStompChat(chattingRoom);


  // 채팅방이 있는지 확인 후, 채팅방이 있다면 채팅방 불러오기
  // Todo: 채팅방 없는지 확인하는 API 연결
  useEffect(() => {
    
    setIsLoading(true);
    setMessageQueue([]);
    Promise.all([
      Api.fetch2Json(`/api/v1/profile/${targetUserId}`),
      Api.fetch2Json('/api/v1/chat/room'),
    ])
      .then((res: [IMyPageDetail, IChattingRoomList]) => {
        const [userInfo, chatRoomList] = res;

        if (!!chatRoomList.chatRoomResponseList.length) {
          setChattingRoom({
            ...chattingRoom,
            chatRoomResponseList: [{
              ...newChatData,
              sender: {
                userId: targetUserId,
                nickname: userInfo.nickname ?? '',
                pictureUrl: userInfo.pictureUrl,
                level: userInfo.bestPositionLevel,
              },
            }]
          });
          return;
        }

        setChattingRoom({
          ...chatRoomList,
          chatRoomResponseList: chatRoomList.chatRoomResponseList.splice(0, 1)
        });
      })
      .finally(() => setIsLoading(false));
  }, [targetUserId]);

  // 메세지 큐에 메세지가 있다면, 채팅방이 생성되었을 때 메세지 보내기
  useEffect(() => {
    if (chattingRoom.chatRoomResponseList.length > 1) {
      setChattingRoom({
        ...chattingRoom,
        chatRoomResponseList: [chattingRoom.chatRoomResponseList[1]]
      });
    }

    if (!chattingRoom.chatRoomResponseList.length
      || !chattingRoom.chatRoomResponseList[0]
      || chattingRoom.chatRoomResponseList[0].chatRoomId < 0
      || !messageQueue.length)
      return;

    sendMessage(chattingRoom.chatRoomResponseList[0].chatRoomId, messageQueue[0]);
    setMessageQueue(prev => prev.splice(1));
  }, [chattingRoom.chatRoomResponseList, messageQueue]);

  // 채팅방이 없다면, 메세지 큐에 메세지를 넣어두고, 생성 후 메세지 보내기
  function sendMessageAsync(_: number, message: string) {
    if (!chattingRoom.chatRoomResponseList[0] || chattingRoom.chatRoomResponseList[0].chatRoomId < 0)
      createChatRoom(targetUserId)
        .then((res) => {
          console.log(res);
          // Todo: 채팅방 생성 후, 채팅방 정보를 가져오는 API 연결, 채팅방 정보를 가져오면, 채팅방 정보를 업데이트 하기
          // Fixme: 새로운 채팅방의 정보를 가져오는 방식으로 변경
        });

    setMessageQueue(prev => [...prev, message]);
    console.log(message);
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
        <div className='invite_team_dialog'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>유저</span>
              <h3>채팅</h3>
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
                               setOnMessageReceived={setOnMessageReceived}
                               senderInfo={senderInfo} />
          </div>

          <div className='dialog_footer'></div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default ChattingDialog;