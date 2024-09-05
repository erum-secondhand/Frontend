import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import api from '../baseURL/baseURL';
import {
  ChatMessage,
  ChatRoom,
  ChatRoomResponse,
  FetchChatMessage,
} from '../dataType';
import { userState } from '../userState';
import sendIcon from '../assets/sendIcon.svg';

// WebSocket URL
const productionSocketDomain = import.meta.env.VITE_SOCKET_URL;
const socket = io(productionSocketDomain || 'http://localhost:8080');

function ChatRoomPage() {
  const navigate = useNavigate();
  const {
    buyerId: buyerIdParam,
    sellerId: sellerIdParam,
    bookId: bookIdParam,
    chatRoomId: chatRoomIdParam,
  } = useParams();
  const userStateValue = useRecoilValue(userState);

  const buyerId = buyerIdParam ? parseInt(buyerIdParam, 10) : NaN;
  const sellerId = sellerIdParam ? parseInt(sellerIdParam, 10) : NaN;
  const chatRoomId = chatRoomIdParam ? parseInt(chatRoomIdParam, 10) : NaN;
  const bookId = bookIdParam ? parseInt(bookIdParam, 10) : NaN;

  const [messages, setMessages] = useState<FetchChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 로그아웃 상태이거나 판매자 혹은 구매자 아닐 경우
    if (
      !userStateValue.id ||
      (userStateValue.id !== buyerId && userStateValue.id !== sellerId)
    ) {
      alert('올바른 접근이 아닙니다.');
      navigate('/');
      return;
    }

    socket.connect();

    // 수신된 메세지 받기
    socket.on('sendMessage', (message: FetchChatMessage) => {
      if (message.chatRoom.id === chatRoomId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // 채팅방 정보 가져오기
    const fetchChatRoomDetails = async () => {
      try {
        const response = await api.get<ChatRoomResponse>(`chat/room`, {
          params: {
            sellerId,
            buyerId,
            bookId,
          },
          withCredentials: true,
        });

        // 채팅방 정보 저장
        setChatRoom(response.data.chatRoom);

        // 채팅 기록 저장
        setMessages(response.data.messages);
      } catch (error) {
        console.error('채팅방 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchChatRoomDetails();

    return () => {
      socket.emit('leaveRoom', { chatRoomId });
      socket.disconnect();
    };
  }, [buyerId, sellerId, bookId, chatRoomId, userStateValue.id, navigate]);

  // 메시지 업데이트 후 스크롤을 맨 아래로 이동
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  // 메시지 전송
  const sendMessage = () => {
    if (inputMessage.trim() === '' || !socket) return;

    setIsSending(true);

    const messageData: ChatMessage = {
      chatRoomId,
      personId: userStateValue.id,
      content: inputMessage.trim(),
    };

    socket.emit('sendMessage', messageData);
    setInputMessage('');
    setIsSending(false);
  };

  // 메세지 입력바 엔터키 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // '2024. 01. 01' 형식으로 날짜 출력
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  }
  // '오후 9:00' 형식으로 시간 출력
  function formatTime(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Seoul',
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  }

  // 메세지끼리 전송 날짜가 다를 때 상단에 날짜 표시할지 여부 반환
  const shouldShowDate = (currentIndex: number): boolean => {
    if (currentIndex === 0) return true;

    const currentMessage = new Date(messages[currentIndex].updateAt);
    const prevMessage = new Date(messages[currentIndex - 1].updateAt);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    const currentMessageDate = new Intl.DateTimeFormat('ko-KR', options).format(
      currentMessage,
    );
    const previousMessageDate = new Intl.DateTimeFormat(
      'ko-KR',
      options,
    ).format(prevMessage);

    return currentMessageDate !== previousMessageDate;
  };

  return (
    <div className="flex flex-col">
      {/* 채팅 메시지 영역 */}
      <div
        className="mb-16 w-full flex-1 overflow-y-auto p-5"
        ref={chatContainerRef}
      >
        {/* 책 정보 */}
        {chatRoom && (
          <div className="fixed left-1/2 top-28 flex w-11/12 -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-between rounded-xl border border-solid border-gray-200 bg-gray-100 px-5 py-3 text-sm shadow-md">
            <div className="flex flex-col gap-1 font-bold ">
              <span className="text-sm">
                [{chatRoom.book.salesStatus}({chatRoom.book.type}/
                {chatRoom.book.condition})]
              </span>
              <span className="text-base">{chatRoom.book.title}</span>
            </div>
            <p className="text-base font-semibold text-gray-800">
              {parseInt(chatRoom.book.price, 10).toLocaleString()}원
            </p>
          </div>
        )}
        {messages.map(
          (message, index) =>
            message && (
              <React.Fragment key={message.id}>
                {shouldShowDate(index) && (
                  <div className="my-4 mt-20 text-center text-gray-400">
                    {formatDate(message.updateAt)}
                  </div>
                )}
                <article className="mb-2 last:mb-0">
                  <div
                    key={index}
                    className={`mb-2 flex items-end ${message.person.id === userStateValue.id ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}
                  >
                    <div
                      className={`max-w-[60%] break-all rounded-lg p-2 ${message.person.id === userStateValue.id ? 'bg-blue-400 text-white' : 'bg-gray-300 text-black'}`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`mt-1 flex flex-col text-xs text-gray-400 ${
                        message.person.id === userStateValue.id
                          ? 'mr-2'
                          : 'ml-2'
                      }`}
                    >
                      <span>{formatTime(message.updateAt)}</span>
                    </div>
                  </div>
                </article>
              </React.Fragment>
            ),
        )}
      </div>
      {/* 메시지 입력 영역 */}
      <div className="fixed bottom-0 w-full rounded-t-2xl border-t bg-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={isSending}
            className="ml-2 rounded-r-lg text-white"
          >
            <img
              src={sendIcon}
              alt="send"
              className="h-8 min-h-8 w-8 min-w-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;
