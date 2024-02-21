/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import filterIcon from '../assets/filter.svg';
import upDownArrow from '../assets/upDownArrow.svg';
import PostCard from '../components/PostCard';
import leftArrowIcon from '../assets/leftArrow.svg';

function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 필터 아코디언 토글
  const toggleAccordion = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex w-full flex-col px-5">
      {/* 필터 및 정렬 */}
      <div className="mx-auto my-0 flex w-full items-center justify-between py-6 md:w-[730px]">
        {/* 필터 버튼 */}
        <button
          className="flex items-center rounded-md border-[1px] border-black px-4 py-2"
          type="button"
          onClick={toggleAccordion}
        >
          <img src={filterIcon} alt="filter" />
          <span className="ps-[0.625rem] font-Pretendard text-sm font-semibold">
            필터
          </span>
        </button>
        {/* 정렬 */}
        <button
          className="flex w-40 items-center justify-between rounded-lg border-[1px] border-gray-300 px-3 py-2 text-[13px] font-semibold"
          type="button"
        >
          <span className="">가격순</span>
          <img src={upDownArrow} alt="upDownArrow" className="" />
        </button>
      </div>
      {/* 필터 아코디언 */}
      {isFilterOpen && (
        <div className="fixed left-0 top-0 z-[1000] flex h-full w-[370px] transform flex-col bg-white">
          {/* 닫기 버튼 */}
          <div className="relative flex h-14 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 py-0.5 pe-5 md:pe-7">
            <button
              type="button"
              className="px-5"
              onClick={() => {
                setIsFilterOpen(false);
              }}
            >
              <img src={leftArrowIcon} alt="닫기" className="w-6" />
            </button>
            <h2 className="m-0 w-full pe-6 text-center text-xl font-bold text-gray-950 md:text-2xl">
              필터
            </h2>
          </div>
          <div className="flex flex-col px-5 py-7 md:px-7">
            {/* 필터 텍스트 및 초기화 버튼 */}
            <div className="flex w-full items-center justify-between">
              <span className="font-Pretendard text-xl font-semibold text-gray-950">
                필터
              </span>
              <button
                type="button"
                className="hover:text-heading mt-0.5 flex-shrink text-xs transition duration-150 ease-in focus:outline-none"
              >
                초기화
              </button>
            </div>
            {/* 가격 바 */}
            {/* 학년 선택 */}
            {/* 서적 분류 */}
            {/* 서적 상태 */}
          </div>
        </div>
      )}
      {isFilterOpen ? (
        <div
          className="fixed inset-0 z-[900] bg-[rgba(23,23,26,0.5)]"
          onClick={() => {
            setIsFilterOpen(false);
          }}
        />
      ) : null}
      {/* 포스트 카드 */}
      <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px]">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}

export default MainPage;
