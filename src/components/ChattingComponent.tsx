import {useEffect, useRef, useState} from 'react';
import UserImage from './UserImage.tsx';
import TierSvg from './svgs/Tier/TierSvg.tsx';
import useUserInfo from '../hooks/useUserInfo.ts';
import useRevInfScroll4Widget from '../hooks/useRevInfScroll4Widget.ts';
import {IChattingMessage, IChattingRoom} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';

interface IChattingComponent {
  chatRoom: IChattingRoom|null|undefined;
  sendMessage: (chatRoomId: number, message: string) => void;
  setOnMessageReceived: (chatRoomId: number, onMessageReceived: null | ((message: IChattingMessage) => void)) => void;
}
const dummy = {
  chatMessageResponseList: [],
  size: 0,
  hasNextSlice: false
}

const IS_READ = 1;

function ChattingComponent({chatRoom, sendMessage, setOnMessageReceived}: IChattingComponent) {
  const infScrollLayoutRef = useRef<HTMLUListElement>(null);
  const prevChatRoomId = useRef<number>(-1);
  const [chatContents, setChatContents] = useState<string>('');

  const {isAvailableUser, fixedNickname, fixedPositionLevel} = useUserInfo(chatRoom?.sender.nickname ?? null, chatRoom?.sender.level ?? null);
  const {data, setReqParams, changeDataAll} = useRevInfScroll4Widget(`/api/v1/chat/room/${chatRoom?.chatRoomId ?? -1}`, 'chatMessageResponseList', infScrollLayoutRef, dummy, {page: 0});
  const [newChatData, setNewChatData] = useState<IChattingMessage[]>([]);

  const myUserId = authControl.getUserIdFromToken();

  // 채팅방이 바뀌면 채팅방 초기 설정
  useEffect(() => {
    if (!chatRoom)
      return;
    setReqParams({page: 0});

    setOnMessageReceived(prevChatRoomId.current, null);
    setOnMessageReceived(chatRoom?.chatRoomId ?? -1, (message: IChattingMessage) => {
      changeDataAll(msg => ({...msg, isRead: IS_READ}));
      setNewChatData(prev => [...prev, message]);
    });

    prevChatRoomId.current = chatRoom?.chatRoomId ?? -1;
    setNewChatData([]);
  }, [chatRoom?.chatRoomId]);

  // 페이지를 로드하거나 | 메세지를 보내면 맨 아래로 이동하게 하기
  useEffect(() => {
    if (data.size === 20 && !!data.chatMessageResponseList[0] || !!newChatData.length && newChatData[newChatData.length - 1].sender.userId === myUserId) {
      infScrollLayoutRef.current?.scrollTo(0, infScrollLayoutRef.current.scrollHeight);
    }
  }, [data, newChatData]);

  function sendMessageThisRoom() {
    if (!chatRoom || !chatContents)
      return;

    console.log('sendMessageThisRoom', chatContents);
    sendMessage(chatRoom.chatRoomId, chatContents);
    setChatContents('');
  }

  if (!chatRoom)
    return (<p></p>);

  return (
    <div className='chatting_layout'>
      <div className='user_profile_layout'>
        <UserImage profileImageURL={chatRoom.sender.pictureUrl} isAvailableUser={isAvailableUser}/>
        <div className='user_profile_div'>
          <TierSvg width={20} height={20} tier={fixedPositionLevel} />
          <span>{fixedNickname}</span>
        </div>
      </div>

      <div className='chat_contents_layout'>
        <ul ref={infScrollLayoutRef}>
          { data.chatMessageResponseList.length === 0 && newChatData.length === 0 ? (
            <p>채팅이 없습니다 <br/> 대화를 작성하여 채팅을 시작해보세요</p>
          ) : (
            data.chatMessageResponseList.map((chatMessage: IChattingMessage|null, index: number) => chatMessage && (
              <MessageView key={index} chatMessage={chatMessage} myUserId={myUserId} />
            )))}
        </ul>
        <ul className='not_reverse'>
          { newChatData.map((chatMessage: IChattingMessage|null, index: number) => chatMessage && (
            <MessageView key={index} chatMessage={chatMessage} myUserId={myUserId} />
          ))}
        </ul>
      </div>

      <div className='chat_submit_layout'>
        <textarea name='' id=''
                  placeholder='대화 작성하기'
                  value={chatContents}
                  onChange={e => setChatContents(e.target.value)}/>
        <button type='button'
                onClick={sendMessageThisRoom}
                disabled={!chatContents}>보내기</button>
      </div>
    </div>
  )
}

interface IMessageView {
  chatMessage: IChattingMessage;
  myUserId: number;
}
function MessageView({chatMessage, myUserId}: IMessageView) {
  const {message, isRead, sender} = chatMessage;
  // Fixme: Sender가 null 인 경우 찾기

  if (!sender) {
    console.log('sender is null', chatMessage, myUserId);
    return (<li><span>오류</span></li>);
  }

  return (
    <li className={myUserId === sender.userId ? 'my_chat' : ''}>
      <span>{message}</span>
      {!isRead && (<span className='is_read'>안읽음</span>)}
    </li>
  );
}

export default ChattingComponent;