import { useNavigate } from 'react-router-dom';
import { FetchChatCards } from '../dataType';

function ChatCard(props: FetchChatCards) {
  const navigate = useNavigate();
  // const userStateValue = useRecoilValue(userState);

  // 채팅방 페이지로 이동 ('/chat/:buyerId/:sellerId/:bookId/room/:bookId')
  const moveToChatRoomPage = () => {
    if (props) {
      const { sellerId, buyerId, bookId, id } = props;

      navigate(`/chat/${buyerId}/${sellerId}/${bookId}/room/${id}`);
    }
  };

  // 날짜와 시간을 서울 시간으로 변환 (UTC+9 적용)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return ['Invalid Date', ''];
    }

    // 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return ['Invalid Date', ''];
    }

    // UTC 시간에 9시간을 더해 서울 시간으로 변환
    date.setHours(date.getHours() + 9);

    // 날짜와 시간을 'YYYY.MM.DD.' 형식으로 포맷팅
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // 시간을 '오전/오후' 형식으로 변환
    const time = date
      .toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .replace('AM', '오전')
      .replace('PM', '오후');

    const formattedDate = `${year}. ${month}. ${day}.`;
    return [formattedDate, time];
  };

  const [formattedDate, formattedTime] = formatDate(props.updatedAt);

  return (
    <article
      className="relative flex h-24 w-full min-w-[300px] cursor-pointer items-center justify-between rounded-md border px-4 py-3 shadow-md hover:bg-gray-50 sm:h-28"
      onClick={moveToChatRoomPage}
    >
      <div className="min-w-3/12 mr-2 flex h-full min-h-full w-3/12 items-center justify-center overflow-hidden rounded-sm">
        <img
          src={props.bookImage}
          alt="bookIamge"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mr-2 flex w-5/12 flex-row">
        <div className="flex w-full flex-col">
          <span className="text-lg font-bold sm:text-xl">
            {props.buyerName}
          </span>
          {/* 상대방 이름 */}
          {/* <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold"> */}
          {/* {userStateValue.id === props.sellerId
              ? props.buyerName
              : props.sellerName} */}
          {/* {props.bookTitle} */}
          {/* </h2> */}
          {/* 최근 메시지 */}
          <h3 className="mt-1 w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400 sm:text-lg ">
            {props.recentMessage}
          </h3>
        </div>
      </div>
      {/* 마지막 업데이트 날짜와 시간 */}
      <div className="flex w-3/12 flex-col items-end justify-center text-gray-500">
        <span className="whitespace-nowrap text-sm sm:text-base">
          {formattedDate}
        </span>{' '}
        {/* 날짜 */}
        <span className="whitespace-nowrap text-sm sm:text-base">
          {formattedTime}
        </span>{' '}
        {/* 시간 */}
      </div>
    </article>
  );
}

export default ChatCard;
