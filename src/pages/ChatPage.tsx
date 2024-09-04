import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatCard from '../components/ChatCard';
import { FetchChatCards } from '../dataType';
import api from '../baseURL/baseURL';
import useCheckLoginStatus from '../services/authService';

function ChatPage() {
  const isLoggedIn = useCheckLoginStatus();
  const navigate = useNavigate();
  const [chatCardData, setChatCardData] = useState<FetchChatCards[] | null>(
    null,
  );

  // const userStateValue = useRecoilValue(userState);

  // 서버에서 채팅 목록을 가져오는 함수
  const fetchUserChatCards = async () => {
    try {
      const response = await api.get<FetchChatCards[]>(`chat/list`, {
        withCredentials: true,
      });

      // user가 참가한 채팅방만 받아오기
      // const filteredChatCards = response.data.filter(
      //   (chatCard) =>
      //     chatCard.sellerId === userStateValue.id ||
      //     chatCard.buyerId === userStateValue.id,
      // );

      const filteredChatCards = response.data;

      setChatCardData(filteredChatCards);
    } catch (e) {
      alert('Error fetching chat cards');
      console.error(e);
    }
  };

  // 로그인 상태를 체크하고, 로그인되어 있으면 채팅 목록을 가져오는 함수
  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      if (isLoggedIn === null) {
        return;
      }
      if (isLoggedIn) {
        await fetchUserChatCards();
        window.scrollTo(0, 0);
      } else {
        alert('로그인을 해주세요.');
        navigate('/login');
      }
    };
    checkLoginAndFetchData();
  }, [isLoggedIn, navigate]);

  return (
    <section className="mx-auto my-0 flex h-full w-full flex-col items-start px-5 sm:w-[599px]">
      <div className="ml-2 mt-5 text-lg font-bold">채팅목록</div>
      <section className="mt-3 flex w-full flex-col gap-4 pb-10">
        {/* 채팅 카드 */}
        {chatCardData && chatCardData.length > 0 ? (
          chatCardData.map((chatCard, index) => (
            <ChatCard
              key={index}
              id={chatCard.id}
              buyerId={chatCard.buyerId}
              buyerName={chatCard.buyerName}
              sellerId={chatCard.sellerId}
              sellerName={chatCard.sellerName}
              bookId={chatCard.bookId}
              bookTitle={chatCard.bookTitle}
              updatedAt={chatCard.updatedAt}
              recentMessage={chatCard.recentMessage}
            />
          ))
        ) : (
          <div className="ml-2 text-sm text-gray-500">
            참여 중인 채팅방이 없습니다.
          </div>
        )}
      </section>
    </section>
  );
}

export default ChatPage;
