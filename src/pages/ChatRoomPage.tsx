import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import api from '../baseURL/baseURL';
import { ChatMessage, ChatRoom, FetchChatMessage } from '../dataType';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../userState';
import sendIcon from '../assets/sendIcon.svg';

// WebSocket URL
const socket = io('http://localhost:8080');

function ChatRoomPage() {
  const navigate = useNavigate();
  const { buyerId: buyerIdParam, sellerId: sellerIdParam, bookId: bookIdParam, chatRoomId: chatRoomIdParam } = useParams();
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
    if (!userStateValue.user.id || (userStateValue.user.id !== buyerId && userStateValue.user.id !== sellerId)) {
      alert('올바른 접근이 아닙니다.');
      navigate('/');
      return;
    }

    socket.connect();
    socket.emit('roomJoined', { chatRoomId });

    socket.on('sendMessage', (message: FetchChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 채팅방 정보 가져오기
      const fetchChatRoomDetails = async () => {
        try {
        const response = await api.get(`chat/room`, {
          params: {
            sellerId,
            buyerId,
            bookId
          },
          withCredentials: true,
        });
          setChatRoom(response.data);
        } catch (error) {
        console.error('채팅방 정보를 가져오는 데 실패했습니다:', error);
        }
      };
  
      fetchChatRoomDetails();
  
    return () => {
      socket.emit('leaveRoom', { chatRoomId });
      socket.disconnect();
    };
  }, [buyerId, sellerId, bookId, chatRoomId, userStateValue.user.id, navigate]);

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
      personId: userStateValue.user.id,
      content: inputMessage.trim(),
    };

    socket.emit('sendMessage', messageData, () => {
      setInputMessage('');
      setIsSending(false);
    });
  };

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

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  }
  
  function formatTime(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Seoul'
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  }  

  const shouldShowDate = (currentIndex: number): boolean => {
    if (currentIndex === 0) return true;
    
    const currentMessage = new Date(messages[currentIndex].updateAt);
    const prevMessage = new Date(messages[currentIndex - 1].updateAt);

    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    };

    const currentMessageDate = new Intl.DateTimeFormat('ko-KR', options).format(currentMessage);
    const previousMessageDate = new Intl.DateTimeFormat('ko-KR', options).format(prevMessage);
  
    return currentMessageDate !== previousMessageDate;
  };

  return (
    <div className="flex-1 flex-col p-4 text-black overflow-y-auto">
      <div
        ref={chatContainerRef}
        className="flex-1 pb-20"
      >
        {messages.map((message, index) => (
          (message.chatRoom.id === chatRoomId && (
          <React.Fragment key={message.id}>
            {shouldShowDate(index) && (
              <div className="text-center my-4 text-gray-400">
                  {formatDate(message.updateAt)}
              </div>
            )}
            <article className="mb-2 last:mb-0">
                <div key={index} className={`mb-2 flex items-end ${message.person.id === userStateValue.user.id ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                  <div className={`max-w-[60%] p-2 rounded-lg ${message.person.id === userStateValue.user.id ? 'bg-blue-400 text-white' : 'bg-gray-300 text-black'}`}>
                    {message.content}
                </div>
                <div className={`flex flex-col text-xs text-gray-400 mt-1 ${
                    message.person.id === userStateValue.user.id ? 'mr-2' : 'ml-2'
                }`}>
                    <span>{formatTime(message.updateAt)}</span>
                </div>
              </div>
            </article>
          </React.Fragment>
          ))
        ))}
      </div>
      {/* 메시지 입력 영역 */}
      <div className="fixed w-full bottom-0 p-4 border-t rounded-t-2xl bg-white">
        <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
            placeholder="메시지를 입력하세요..."
            className="flex-1 py-2 px-4 border rounded-full focus:outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={isSending}
            className="text-white rounded-r-lg ml-2"
          >
            <img
              src={sendIcon}
              alt="send"
              className="w-8 h-8"
            />
        </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;