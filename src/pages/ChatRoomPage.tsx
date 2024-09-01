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

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes}`;
  };

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const shouldShowDate = (currentIndex: number) => {
    if (currentIndex === 0) return true;
    const currentMessageDate = new Date(messages[currentIndex].timestamp).toDateString();
    const previousMessageDate = new Date(messages[currentIndex - 1].timestamp).toDateString();
    return currentMessageDate !== previousMessageDate;
  };

  return (
    <div className="flex-1 flex-col p-4 text-black overflow-y-auto">
      <div
        ref={chatContainerRef}
        className="flex-1 pb-20"
      >
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {shouldShowDate(index) && (
              <div className="text-center my-4 text-gray-400">
                {formatDate(message.timestamp)}
              </div>
            )}
            <article className="mb-2 last:mb-0">
              <div
                className={`flex items-end ${
                  parseInt(userId || '0', 10) === message.senderId ? 'flex-row-reverse justify-start' : 'flex-row justify-start'
                }`}
              >
                <div
                  className={`max-w-[60%] p-3 text-sm rounded-xl ${
                    parseInt(userId || '0', 10) === message.senderId
                      ? 'bg-blue-200 text-gray-800'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <div className={`flex flex-col text-xs text-gray-400 mt-1 ${
                  parseInt(userId || '0', 10) === message.senderId ? 'mr-2' : 'ml-2'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </article>
          </React.Fragment>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full flex bg-white p-4 shadow-black shadow-2xl rounded-t-lg">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder="메시지 보내기"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full mr-2"
        />
        <button
          onClick={sendMessage}
          disabled={isSending}
        >
          <img src={sendIcon} alt="send" className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}

export default ChatRoomPage;