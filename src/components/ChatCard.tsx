import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../userState';
import { FetchChatCards } from "../dataType";
import chatUserIcon from '../assets/chatUserIcon.svg';


function ChatCard(props: FetchChatCards) {
  const navigate = useNavigate();
  const userStateValue = useRecoilValue(userState);
  
  // 채팅방 페이지로 이동 ('/chat/:buyerId/:sellerId/room/:bookId')
  const moveToChatRoomPage = () => {
    navigate(`/chat/${props.buyerId}/${props.sellerId}/room/${props.id}`);
  };
  
  // 마지막 업데이트 날짜와 시간 format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return ["Invalid Date", ""];
    }
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return ["Invalid Date", ""];
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const time = date
      .toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace("AM", "오전")
      .replace("PM", "오후");
  
    const formattedDate = `${year}. ${month}. ${day}.`;
    return [formattedDate, time];
  };
  
  const [formattedDate, formattedTime] = formatDate(props.updatedAt);

  return (
    <article
      className="relative min-w-[300px] w-full h-24 border rounded-md shadow-md py-3 px-4 flex items-center cursor-pointer hover:bg-gray-50"
      onClick={moveToChatRoomPage}
    >
      <div className="flex items-center justify-center mr-4">
        <img
          src={chatUserIcon}
          alt="chatUserIcon"
          className="min-w-16 min-h-16 bg-cover rounded-full border border-gray-200"
        />
      </div>
      <div className="w-full flex flex-row">
        <div className="w-2/3 flex flex-col">
          {/* 상대방 이름 */}
          <h2 className="w-full font-semibold mr-2">
            {userStateValue.user.id === props.sellerId ? props.buyerName : props.sellerName}
          </h2>
          {/* 최근 메시지 */}
          <h3 className="text-sm text-gray-400 mt-1 text-ellipsis">
            {props.recentMessage}
          </h3>
        </div>
      </div>
      {/* 마지막 업데이트 날짜와 시간 */}
      <div className="min-w-fit flex flex-col items-end justify-center text-sm text-gray-500">
        <span>{formattedDate}</span> {/* 날짜 */}
        <span>{formattedTime}</span> {/* 시간 */}
      </div>
    </article>
  );
}

export default ChatCard;