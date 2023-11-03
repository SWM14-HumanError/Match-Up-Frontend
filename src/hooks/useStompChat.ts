import {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {IChattingMessage, IChattingRoom, IChattingRoomList, IMyPageDetail} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';
import Api from '../constant/Api.ts';

function useStompChat(data: IChattingRoomList) {
  const [subQueue, setSubQueue] = useState<IChattingRoom[]>([]);
  const [subIndex, setSubIndex] = useState<number>(-1);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [onReceiveMessage, setOnReceiveMessage] = useState<any[]>([]);
  const [senderInfo, setSenderInfo] = useState<any>({});

  // client 생성 * 삭제
  useEffect(() => {
    const client =  new Client({
      brokerURL: '/ws-stomp',
      connectHeaders: {
        ...authControl.getHeader(),
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

  // sender 사용자 정보 가져와서 저장
  useEffect(() => {
    const userID = authControl.getUserIdFromToken();
    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then((res: IMyPageDetail) => setSenderInfo({
        userId: userID,
        nickname: res.nickname,
        pictureUrl: res.pictureUrl
      }));
  }, []);

  // data.chatRoomResponseList 변경 시 subQueue에 추가 - subscribe 목록
  useEffect(() => {
    const newSubQueue = [...subQueue];
    data.chatRoomResponseList.forEach((chatRoom) => {
      if (chatRoom && !subQueue.find((sub) => sub.chatRoomId === chatRoom.chatRoomId)) {
        newSubQueue.push(chatRoom);
      }
    });
    setSubQueue(newSubQueue);
  }, [data]);

  // subQueue 변경 시 client.subscribe
  useEffect(() => {
    if (!stompClient) return;

    for (let i = subIndex+1; i < subQueue.length; i++) {
      stompClient.subscribe(`/sub-queue/chat/${subQueue[i].chatRoomId}`, (message) => {
        console.log(`Received: ${message.body}`);
        if (onReceiveMessage[i]) {
          onReceiveMessage[i](message.body);
        }
      }, {...authControl.getHeader()});
    }
    setSubIndex(subQueue.length - 1);
  }, [subQueue, stompClient]);

  function sendMessage(chatRoomId: number, message: string) {
    if (!stompClient) return;

    stompClient.publish({
      destination: `/pub/chat/${chatRoomId}`,
      headers: {
        ...authControl.getHeader(),
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        type: 'CHAT',
        roomId: 1,
        sender: senderInfo,
        message:  message,
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

  function setOnReceiveMessageFunction(chatRoomId: number, callback: (message: IChattingMessage) => void) {
    const newOnReceiveMessage = [...onReceiveMessage];
    const index = subQueue.findIndex((sub) => sub.chatRoomId === chatRoomId);

    if (index === -1) return;

    newOnReceiveMessage[index] = callback;
    setOnReceiveMessage(newOnReceiveMessage);
  }

  return { sendMessage, sendRead, setOnReceiveMessageFunction, senderInfo};
}

export default useStompChat;