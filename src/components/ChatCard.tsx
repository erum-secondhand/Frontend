import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../userState';
import { FetchChatCards } from "../dataType";
import chatUserIcon from '../assets/chatUserIcon.svg';

function ChatCard (props: FetchChatCards) {
  const navigate = useNavigate();
  const [userStateValue] = useRecoilState(userState);

  // 채팅방 페이지로 이동 ('/chat/:userId/room/:roomId')
  const moveToChatRoomPage = () => {
    // navigate('/chat/${userStateValue.user.id}/room/${props.id}');
    navigate(`/chat/${userStateValue.user.id}/room/1`);
  };

  // 시간 포맷을 초 없이 출력
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <article 
      className="relative min-w-[300px] w-full h-24 border rounded-md shadow-md py-3 px-4 flex items-center cursor-pointer hover:bg-gray-50"
      onClick={moveToChatRoomPage}
    >
      <div className="flex items-center justify-center mr-4">
        <img 
          src={chatUserIcon}
          alt="chatUserIcon"
          className='min-w-16 min-h-16 bg-cover rounded-full border border-gray-200'
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col">
          {/* 상대방 이름 */}
          <h2 className="font-semibold mr-2">
            {props.otherPerson}
          </h2>
          {/* 최근 메시지 */}
          <h3 className="text-sm text-gray-400 mt-1">
            {props.recentMessage}
          </h3>
        </div>
        {/* 마지막 업데이트 시간 */}
        <div className="flex items-center text-sm text-gray-500">
          {formatTime(props.updateAt)}
        </div>
      </div>
    </article>
  );
};

export default ChatCard;