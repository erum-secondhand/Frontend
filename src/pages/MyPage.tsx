/* eslint-disable react/no-array-index-key */
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

  const [selectedStatus, setSelectedStatus] = useState<string>('판매중');

  const userStateValue = useRecoilValue(userState);
  const isLoggedIn = useCheckLoginStatus();

  // 전공 선택 입력 이벤트 핸들러
  const handleStatusClick = (status: string) => {
    // 이미 선택된 학년을 클릭하면 선택 취소
    if (selectedStatus === status) {
      setSelectedStatus('');
    } else {
      setSelectedStatus(status);
    }
  };

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
    <section className="mx-auto mt-5 flex w-full flex-col items-center sm:w-[599px] md:w-[730px]">
      {/* 유저 정보 */}
      <div className="mb-3 flex w-full items-center gap-12 rounded-lg border-2 border-solid border-gray-200 px-8 py-9 sm:px-10">
        <div className="flex flex-col items-start space-y-4 text-lg font-semibold md:text-xl">
          <span className="">이름</span>
          <span className="">학번</span>
          <span className="">전공</span>
          <span className="text-nowrap">이메일</span>
        </div>
        <div className="flex flex-col items-start space-y-4 text-lg md:text-xl">
          <span className="">{userStateValue.user.name}</span>
          <span className="">{userStateValue.user.studentId}</span>
          <span className="">{userStateValue.user.major}</span>
          <span className="">{userStateValue.user.email}</span>
        </div>
      </div>
      {/* 판매 분류 바 */}
      <ul className="mb-4 flex w-full flex-nowrap justify-between border-b border-[#DADEE5] sm:mb-6 lg:mb-7">
        {['판매중', '판매완료'].map((status, index) => (
          <button
            key={index}
            className={`flex w-1/2 shrink grow cursor-pointer items-center justify-center py-4 text-sm font-medium transition duration-200 ease-in-out md:text-base lg:grow-0 ${selectedStatus === status ? 'border-b-[2px] border-black text-black' : 'text-[#9CA3AF]'}`}
            type="button"
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </button>
        ))}
      </ul>
      {/* 포스트카드 */}
      <div className="flex w-full flex-col items-center px-5 sm:px-0">
        <span className="mb-2 ml-1 w-full text-base text-[#5a5a5a] sm:text-lg">
          {selectedStatus === '판매중'
            ? `총 ${userPostCardData.onSaleBooks.books.length}개`
            : `총 ${userPostCardData.soldOutBooks.books.length}개`}
        </span>
        {/* 판매중인 포스트카드 */}
        <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[759px] md:-translate-x-[14.5px] md:transform md:justify-start">
          {selectedStatus === '판매중' &&
            userPostCardData.onSaleBooks.books.length > 0 &&
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
            ))}
        </div>
        {/* 판매완료 포스트카드 */}
        <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[759px] md:-translate-x-[14.5px] md:transform md:justify-start">
          {selectedStatus === '판매완료' &&
            userPostCardData.soldOutBooks.books.length > 0 &&
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
            ))}
        </div>
      </div>
    </section>
  );
}

export default MyPage;
