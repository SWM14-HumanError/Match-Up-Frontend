import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import ChattingComponent from '../ChattingComponent.tsx';
import useStompChat from '../../hooks/useStompChat.ts';
import {IChattingMessage, IChattingRoomList} from '../../constant/interfaces.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/InviteTeamDialog.scss';
import '../../styles/pages/ChatPage.scss';

interface IInviteDialog {
  targetUserId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChattingDialog({targetUserId, isOpen, setIsOpen}: IInviteDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [chattingRoom, setChattingRoom] = useState<IChattingRoomList>({
    chatRoomResponseList: [],
    hasNextSlice: false,
    size: 0,
  });
  const {sendMessage, setOnReceiveMessageFunction, senderInfo} = useStompChat(chattingRoom);


  // 채팅방이 있는지 확인 후, 채팅방이 있다면 채팅방 불러오기
  // Todo: 채팅방 없는지 확인하는 API 연결
  useEffect(() => {
    
    setIsLoading(true);
    Api.fetch2Json('/api/v1/chat/room')
      .then(data => {
        setChattingRoom({
          ...data,
          chatRoomResponseList: data.chatRoomResponseList.splice(0, 1)
        });
      })
      .finally(() => setIsLoading(false));
  }, [targetUserId]);

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
                               sendMessage={sendMessage}
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