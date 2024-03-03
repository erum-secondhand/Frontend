/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { userState } from '../userState';
import PostCard from '../components/PostCard';
import api from '../baseURL/baseURL';
import { FetchUserPostCards } from '../dataType';
import useCheckLoginStatus from '../services/authService';

function MyPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userPostCardData, setUserPostCardData] = useState<FetchUserPostCards>({
    onSaleBooks: {
      books: [],
    },
    soldOutBooks: {
      books: [],
    },
  });

  const userStateValue = useRecoilValue(userState);
  const isLoggedIn = useCheckLoginStatus();

  // 특정 유저별 서적 필터링 및 조회 API 요청
  const fetchUserPostCards = async () => {
    try {
      const response = await api.get<FetchUserPostCards>(
        `books/${userStateValue.user.id}`,
        { withCredentials: true },
      );
      console.log(response.data);
      setUserPostCardData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // isLoggedIn이 null이 아닐 때만 로직 실행
    if (isLoggedIn !== null) {
      if (isLoggedIn) {
        fetchUserPostCards();
        window.scrollTo(0, 0);
      } else {
        alert('로그인을 해주세요.');
        navigate('/login');
      }
    }
  }, [id, isLoggedIn]);

  return (
    <section className="mx-auto mt-5 flex w-full flex-col items-start sm:w-[599px]">
      <div className="flex w-full items-center gap-9 bg-gray-200 px-5 py-9">
        <div className="flex flex-col items-start space-y-4 font-Pretendard text-xl">
          <span className="">이름</span>
          <span className="">학번</span>
          <span className="">전공</span>
          <span className="">이메일</span>
        </div>
        <div className="flex flex-col items-start space-y-4 font-Pretendard text-xl">
          <span className="">{userStateValue.user.name}</span>
          <span className="">{userStateValue.user.studentId}</span>
          <span className="">{userStateValue.user.major}</span>
          <span className="">{userStateValue.user.email}</span>
        </div>
      </div>
      {/* 판매중인 서적 */}
      <div className="flex w-full">
        <span className="mx-auto my-7 font-Pretendard text-2xl font-semibold md:text-3xl">
          판매중인 서적
        </span>
        {/* 판매중인 포스트카드 */}
        <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px]">
          {userPostCardData.onSaleBooks.books.length > 0 ? (
            userPostCardData.onSaleBooks.books.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                imageUrls={post.imageUrls}
                title={post.title}
                publisher={post.publisher}
                price={post.price}
                salesStatus={post.salesStatus}
              />
            ))
          ) : (
            <span>없음</span>
          )}
        </div>
      </div>
      {/* 판매완료 서적 */}
      <div className="flex w-full">
        <span className="mx-auto my-7 font-Pretendard text-2xl font-semibold md:text-3xl">
          판매완료
        </span>
        {/* 판매완료 포스트카드 */}
        <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px]">
          {userPostCardData.soldOutBooks.books.length > 0 ? (
            userPostCardData.soldOutBooks.books.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                imageUrls={post.imageUrls}
                title={post.title}
                publisher={post.publisher}
                price={post.price}
                salesStatus={post.salesStatus}
              />
            ))
          ) : (
            <span>없음</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyPage;
