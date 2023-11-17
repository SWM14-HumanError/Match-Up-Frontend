import {useEffect, useRef, useState} from 'react';
import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import {IChattingMessage, IChattingRoom, IChattingRoomList, IMyPageDetail} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';
import Alert from '../constant/Alert.ts';
import Api from '../constant/Api.ts';

const dummySender = {
  userId: -1,
  nickname: '',
  pictureUrl: null,
  level: null,
}

export const TEST_VERSION = '0.0.9';

// Todo: console.log 없애기
function useStompChat(data: IChattingRoomList) {
  const roomQueue = useRef<IChattingRoom[]>([]); // data 직잡 변경 불가
  const [subscriptionQueue, setSubscriptionQueue] = useState<StompSubscription[]>([]); // roomQueue와 index 매칭
  const allSubscribes = useRef<StompSubscription[]>([]);
  const subscribeIsDeleted = useRef<boolean[]>([]);
  const subscriptionFuncs = useRef<(((message: IMessage) => void)|null)[]>([]);

  const stompClient = useRef<Client | null>(null);
  const senderInfo = useRef<IChattingRoom['sender']>(dummySender);


  // client 생성 * 삭제
  useEffect(() => {
    const host = window.location.host;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const client = new Client({
      brokerURL: `${protocol}//${host}/ws-stomp`,
      // reconnectDelay: 5000,
      connectHeaders: {
        Authorization: authControl.getToken() ?? '',
      },
      onConnect: () => {
        console.log('<<chatting connected>>');

        subscriptionFuncs.current.forEach((func, index) => {
          if (func) {
            subscribe(roomQueue.current[index].chatRoomId, func);
          }
        });
      },
      // onStompError: (frame: any) => {
      //   console.log('onStompError!!!!!');
      //   console.log(`Broker reported error: ${frame.headers['message']}`);
      //   console.log(`Additional details: ${frame.body}`);
      // },
      onWebSocketError: (event: any) => {
        console.log('onWebSocketError!!!!!');
        console.error(event);

        authControl.retainAuthTokenOnly();
        // console.log('document.cookie', document.cookie);
      },
      onDisconnect: (frame: any) => {
        console.log(`
          <<chatting disconnected>>
          Broker reported error: ${frame.headers['message']}
          Additional details: ${frame.body}
          chatting disconnected: active: ${client.active}, connected: ${client.connected}
        `);
      }
    });
    client.activate();
    stompClient.current = client;

    return () => {
      if (!client) return;

      client?.deactivate();
    }
  }, []);

  // sender 사용자 정보 가져와서 저장
  useEffect(() => {
    const userID = authControl.getUserIdFromToken();
    console.log('updateUserInfo - useStompChat', userID);

    if (!userID || userID <= 0) return;

    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then((res: IMyPageDetail) =>
        senderInfo.current = {
          userId: userID,
          nickname: res.nickname ?? '',
          pictureUrl: res.pictureUrl,
          level: res.bestPositionLevel,
        }
      );
  }, []);

  // data.chatRoomResponseList 변경 시 subQueue에 추가 - subscribe 목록
  useEffect(() => {
    const newSubQueue = [...roomQueue.current];
    data.chatRoomResponseList.forEach((chatRoom) => {
      if (chatRoom && chatRoom.chatRoomId > 0 && !roomQueue.current.find((sub) => sub.chatRoomId === chatRoom.chatRoomId)) {
        newSubQueue.push({...chatRoom});
      }
    });
    roomQueue.current = newSubQueue;

    // roomQueue.current.forEach((_, index) => {
    //   subscribe(roomQueue.current[index].chatRoomId, () => {});
    // });
  }, [data]);

  // subscribe 목록 변경 시 비활성화 된 subscribe 삭제
  useEffect(() => {
    console.log('subscriptionQueue - useStompChat', subscriptionQueue);

    allSubscribes.current.forEach((sub, index) => {
      if (subscribeIsDeleted.current[index]) return;

      if (!subscriptionQueue.some((sub2) => sub2 && sub2.id === sub.id)) {
        console.log('unsubscribe', sub.id);
        sub.unsubscribe();
        subscribeIsDeleted.current[index] = true;
      }
    });
    console.log(subscriptionQueue, allSubscribes.current, subscribeIsDeleted.current);
  }, [subscriptionQueue]);


  function sendMessage(chatRoomId: number, message: string) {
    if (!stompClient.current || !stompClient.current.connected) {
      Alert.show('채팅 서버와 연결이 끊어졌습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }

    console.log('sendMessage - useStompChat', chatRoomId, message, senderInfo.current);
    stompClient.current.publish({
      destination: `/pub/chat/${chatRoomId}`,
      headers: {
        ...authControl.getHeader(),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CHAT',
        roomId: chatRoomId,
        sender: senderInfo.current,
        message: message,
      })
    });
  }

  function sendRead(chatRoomId: number) {
    if (!stompClient.current || !stompClient.current.connected) {
      Alert.show('채팅 서버와 연결이 끊어졌습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }

    stompClient.current.publish({
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
      sender: sender ?? senderInfo.current,
      peopleCount: 2,
      unreadCount: 0,
      lastChat: new Date().toISOString(),
      lastChatTime: new Date().toISOString(),
    }

    roomQueue.current = roomQueue.current.map((sub, index) =>
      index === dataIndex ? newChatRoom : sub
    );

    return {...newChatRoom};
  }

  function subscribe(chatRoomId: number, callback: (message: IMessage) => void) {
    if (!chatRoomId || chatRoomId <= 0) return;

    if (!stompClient.current || !stompClient.current.connected) {
      Alert.show('채팅 서버와 연결이 끊어졌습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }

    const LENGTH = roomQueue.current.length;
    const index = roomQueue.current.findIndex((sub) => sub.chatRoomId === chatRoomId);

    const subscription = stompClient.current.subscribe(
      `/sub-queue/chat/${chatRoomId}`, callback, {...authControl.getHeader()}
    );

    allSubscribes.current.push(subscription);
    subscribeIsDeleted.current.push(false);
    subscriptionFuncs.current.push(callback);
    setSubscriptionQueue(prev => Array.from({ length: LENGTH },
      (_, i) => i === index ? subscription : prev[i] ?? null
    ));
  }

  const setOnReceive = (chatRoomId: number, callback: (message: IChattingMessage) => void) => {
    subscribe(chatRoomId, (message) => {
      console.log('setOnReceive - useStompChat', JSON.parse(message.body), message.body);
      if (callback) {
        callback(JSON.parse(message.body));
      }
    });
  };

  return {sendMessage, sendRead, setOnReceiveMessageFunction: setOnReceive, createChatRoom};
}

export default useStompChat;