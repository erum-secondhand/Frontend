import filterIcon from '../assets/filter.svg';
import upDownArrow from '../assets/upDownArrow.svg';
import PostCard from '../components/PostCard';

function MainPage() {
  return (
    <div className="flex w-full flex-col px-5">
      {/* 필터 및 정렬 */}
      <div className="mx-auto my-0 flex w-full items-center justify-between py-6 md:w-[730px]">
        {/* 필터 버튼 */}
        <button
          className="flex items-center rounded-md border-[1px] border-black px-4 py-2"
          type="button"
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
