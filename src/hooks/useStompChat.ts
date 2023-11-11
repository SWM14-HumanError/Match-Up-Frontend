import {useEffect, useState} from 'react';
import {Client, StompSubscription} from '@stomp/stompjs';
import {IChattingMessage, IChattingRoom, IChattingRoomList, IMyPageDetail} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';
import Api from '../constant/Api.ts';

const dummySender = {
  userId: -1,
  nickname: '',
  pictureUrl: null,
  level: null,
}

export const TEST_VERSION = '0.0.2';

function useStompChat(data: IChattingRoomList) {
  const [subQueue, setSubQueue] = useState<IChattingRoom[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [senderInfo, setSenderInfo] = useState<IChattingRoom['sender']>(dummySender);

  const [subscriptions, setSubscriptions] = useState<StompSubscription[]>([]);
  const [unSubscribeQueue, setUnSubscribeQueue] = useState<StompSubscription[]>([]);


  // client 생성 * 삭제
  useEffect(() => {
    const host = window.location.host;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const client = new Client({
      brokerURL: `${protocol}//${host}/ws-stomp`,
      // reconnectDelay: 5000,
      connectHeaders: {
        Authorization: authControl.getToken() ?? '',
        // ...authControl.getHeader(),
        // credentials: 'omit',
        // 'Cache-Control': 'no-cache',
      },
      onConnect: () => {
        console.log('chatting connected');
      },
      onStompError: (frame: any) => {
        console.log('onStompError!!!!!');
        console.log(`Broker reported error: ${frame.headers['message']}`);
        console.log(`Additional details: ${frame.body}`);
      },
      onWebSocketError: (event: any) => {
        console.log('onWebSocketError!!!!!');
        console.error(event);
      },
      onDisconnect: (frame: any) => {
        console.log('onDisconnect!!!!!');
        console.log(`Broker reported error: ${frame.headers['message']}`);
        console.log(`Additional details: ${frame.body}`);
      }
    });
    client.activate();
    setStompClient(client);

    return () => {
      if (!client) return;

      client?.deactivate();
    }
  }, []);

  // useEffect(() => {
  //   let stompClient: any = null;
  //   const host = window.location.host;
  //   const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //
  //   stompClient = Stomp.over(function () {
  //     return new WebSocket(`${protocol}//${host}/ws-stomp`)
  //   });
  //   setStompClient(stompClient);
  //
  //   // 필요한 헤더 설정
  //   const headers = {
  //     // 여기에 필요한 헤더를 추가합니다.
  //     // 예: 'Authorization': 'Bearer YourAccessToken',
  //     // 또는 다른 필요한 헤더들...
  //     Authorization: authControl.getToken() ?? '',
  //   };
  //
  //   stompClient.connect(headers, () => {
  //     // 연결이 성공하면 이곳에서 추가적인 작업을 수행할 수 있습니다.
  //     console.log('WebSocket 연결 성공');
  //   }, (error: any) => {
  //     // 연결이 실패하면 이곳에서 오류를 처리할 수 있습니다.
  //     console.error('WebSocket 연결 실패', error);
  //   });
  //
  //   return () => {
  //     if (!stompClient) return;
  //
  //     stompClient.disconnect(() => {
  //       console.log('WebSocket 연결 종료');
  //     });
  //   }
  // }, []);

  // sender 사용자 정보 가져와서 저장
  useEffect(() => {
    const userID = authControl.getUserIdFromToken();
    if (!userID || userID <= 0) return;

    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then((res: IMyPageDetail) => setSenderInfo({
        userId: userID,
        nickname: res.nickname ?? '',
        pictureUrl: res.pictureUrl,
        level: res.bestPositionLevel,
      }));
  }, []);

  // data.chatRoomResponseList 변경 시 subQueue에 추가 - subscribe 목록
  useEffect(() => {
    const newSubQueue = [...subQueue];
    data.chatRoomResponseList.forEach((chatRoom) => {
      if (chatRoom && chatRoom.chatRoomId > 0 && !subQueue.find((sub) => sub.chatRoomId === chatRoom.chatRoomId)) {
        newSubQueue.push(chatRoom);
      }
    });
    setSubQueue(newSubQueue);
  }, [data]);

  // unSubscribeQueue 변경 시 이벤트 제거
  useEffect(() => {
    if (!unSubscribeQueue.length) return;

    unSubscribeQueue.forEach((sub) => {
      console.log('unsubscribe', sub);
      if (!sub) return;
      sub.unsubscribe();
    });
    setUnSubscribeQueue([]);
  }, [unSubscribeQueue]);

  function sendMessage(chatRoomId: number, message: string) {
    if (!stompClient) return;
    console.log('send message real', chatRoomId, message);

    stompClient.publish({
      destination: `/pub/chat/${chatRoomId}`,
      headers: {
        ...authControl.getHeader(),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CHAT',
        roomId: chatRoomId,
        sender: senderInfo,
        message: message,
      })
    });
  }

  function sendRead(chatRoomId: number) {
    if (!stompClient) return;

    stompClient.publish({
      destination: '/queue/chat',
      headers: {
        ...authControl.getHeader(),
        'content-type': 'application/json'
      },
      body: JSON.stringify({'chatRoomId': chatRoomId, 'type': 'READ', 'writer': 'clientB'})
    });
  }

  async function createChatRoom(dataIndex: number, sender: IChattingRoom['sender'] | null | undefined) {
    const res = await Api.fetch(`/api/v1/chat/room/${sender?.userId}`, 'POST');
    const chatRoomId = Number(await res?.text());
    const newChatRoom: IChattingRoom = {
      chatRoomId: chatRoomId,
      sender: sender ?? senderInfo,
      peopleCount: 2,
      unreadCount: 0,
      lastChat: new Date().toISOString(),
      lastChatTime: new Date().toISOString(),
    }

    setSubQueue(prev => prev.map((sub, index) => index === dataIndex ? newChatRoom : sub));

    return {...newChatRoom};
  }

  function setOnReceive(chatRoomId: number, callback: (message: IChattingMessage) => void) {
    const index = subQueue.findIndex((sub) => sub.chatRoomId === chatRoomId);

    if (!stompClient) return;

    if (subscriptions[index])
      setUnSubscribeQueue(prev => [...prev, {...subscriptions[index]}]);

    const newSubscriptions = Array.from({length: subQueue.length}, (_, i) => subscriptions[i] ?? null);

    const subscription = stompClient.subscribe(`/sub-queue/chat/${chatRoomId}`, (message) => {
      if (callback) {
        callback(JSON.parse(message.body));
      }
    }, {...authControl.getHeader()});
    console.log(subQueue, subscriptions.map((sub, i) => i === index ? subscription : sub));
    setSubscriptions(newSubscriptions.map((sub, i) => i === index ? subscription : sub));
  }

  return {sendMessage, sendRead, setOnReceiveMessageFunction: setOnReceive, createChatRoom};
}

export default useStompChat;