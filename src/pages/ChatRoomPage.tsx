import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import io, { Socket } from 'socket.io-client';
import sendIcon from '../assets/sendIcon.svg';
import api from '../baseURL/baseURL';
import { ChatMessage, ChatRoom } from '../dataType';
import { useParams } from 'react-router-dom';

// WebSocket URL
const SOCKET_URL = 'http://localhost:8080';

function ChatRoomPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  const { userId, roomId } = useParams<{ userId: string; roomId: string }>();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socketConnection = io(SOCKET_URL);
    setSocket(socketConnection);
  
    socketConnection.on('connect', () => {
      const socketId = socketConnection.id; // WebSocket ID
      const fetchChatRoomDetails = async () => {
        try {
          const response = await api.get<ChatRoom>(
            'chat/room',
            { 
              params: { sellerId: 2, buyerId: 1, bookId: roomId, socketId },
              withCredentials: true 
            }
          );
          setChatRoom(response.data);
        } catch (error) {
          console.error('Failed to fetch chat room details:', error);
        }
      };
  
      fetchChatRoomDetails();
    });
  
    return () => {
      socketConnection.disconnect();
    };
  }, []);  

  useEffect(() => {
    if (socket && chatRoom?.id) {
      socket.emit('roomJoined', chatRoom.id);
    }
    return () => {
      if (socket && chatRoom?.id) {
        socket.emit('leaveRoom', chatRoom.id);
      }
    };
  }, [socket, chatRoom]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || isSending || !userId || !socket) return;

    const userIdNumber = parseInt(userId, 10);

    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: userIdNumber,
      content: inputMessage,
      timestamp: new Date(),
    };

    setIsSending(true);
    try {
      socket.emit('sendMessage', { chatRoomId: chatRoom?.id, ...newMessage });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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