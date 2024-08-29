import { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import { FetchChatCards } from "../dataType";
import { useNavigate } from "react-router-dom";
import api from "../baseURL/baseURL";
import useCheckLoginStatus from "../services/authService";

function ChatPage() {
  const navigate = useNavigate();
  const [chatCardData, setChatCardData] = useState<FetchChatCards[] | null>(null);
  const isLoggedIn = useCheckLoginStatus();

  const fetchUserChatCards = async () => {
    try {
      const response = await api.get<FetchChatCards[]>(
        `chat/list`,
        { withCredentials: true }
      );
      setChatCardData(response.data);
    } catch (e) {
      alert('Error fetching chat cards');
      console.error(e);
    }
  };

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      if (isLoggedIn !== null) {
        if (isLoggedIn) {
          await fetchUserChatCards();
          window.scrollTo(0, 0);
        } else {
          alert('로그인을 해주세요.');
          navigate('/login');
        }
      }
    };
    checkLoginAndFetchData();
  }, [isLoggedIn, navigate]);

  return (
    <section className="mx-auto my-0 flex w-full h-full flex-col items-start px-5 sm:w-[599px]">
      <div className="font-bold text-lg mt-5 ml-2">채팅목록</div>
      <section className="w-full mt-3 flex flex-col gap-4 pb-10">
        {/* 채팅 카드 */}
        {chatCardData && chatCardData.length > 0 ? (
          chatCardData.map((chatCard, index) => (
            <ChatCard
              key={index}
              id={chatCard.id}
              otherPerson={chatCard.otherPerson}
              updateAt={chatCard.updateAt}
              recentMessage={chatCard.recentMessage}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500 ml-2">
            참여 중인 채팅방이 없습니다.
          </div>
        )}
      </section>
    </section>
  );
}

export default ChatPage;
