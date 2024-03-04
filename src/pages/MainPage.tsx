/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import api from '../baseURL/baseURL';
import { FetchPostCards } from '../dataType';
import { searchPostCardsState } from '../recoilState';
import PostCard from '../components/PostCard';
import banner from '../assets/banner.png';
import useCheckLoginStatus from '../services/authService';

function MainPage() {
  useCheckLoginStatus();
  // 필터 필요시 사용
  // const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  // 정렬 필요시 사용
  // const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  // const [price, setPrice] = useState<string>('');
  // const [grade, setGrade] = useState<string>('');
  // const [bookType, setBookType] = useState<string>('');
  // const [bookCondition, setBookCondition] = useState<string>('');

  const [postCardData, setPostCardData] = useState<FetchPostCards[]>([]);

  const searchPostCards = useRecoilValue(searchPostCardsState);

  // 모든 상태를 초기화하는 함수
  // const resetFilters = () => {
  //   setPrice('');
  //   setGrade('');
  //   setBookType('');
  //   setBookCondition('');
  // };

  // // 필터 아코디언 토글 -> 필요시 사용
  // const toggleAccordion = () => {
  //   setIsFilterOpen(!isFilterOpen);
  // };

  // 포스트카드 GET API 요청 함수
  const fetchPostCards = async () => {
    try {
      const response = await api.get<FetchPostCards[]>('/books');
      console.log(response.data);
      setPostCardData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    // 포스트카드 fetch 함수
    fetchPostCards();
  }, []);

  return (
    <>
      {/* 배너 사진 */}
      <div className="w-full bg-[#FFF3B7]">
        <img
          src={banner}
          alt="배너"
          className="mx-auto mb-10 sm:w-[599px] md:w-[730px]"
          draggable={false}
        />
      </div>
      <div className="flex w-full">
        <span className="mx-auto my-8 text-2xl font-semibold sm:my-11 sm:text-[26px] md:my-16 md:text-3xl md:font-bold lg:text-[32px]">
          중고거래 인기서적
        </span>
      </div>
      <div className="flex w-full flex-col px-5">
        {/* 포스트 카드 */}
        {searchPostCards.length > 0 ? (
          <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px] 2xl:w-[1200px]">
            {searchPostCards.map((post) => (
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
        ) : (
          <div className="mx-auto my-0 mt-2 flex w-full flex-wrap justify-between text-left md:w-[730px] 2xl:w-[1200px]">
            {postCardData.map((post) => (
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
        )}
        {/* 필터 및 정렬  -> 필요하면 사용 */}
        {/* <div className="mx-auto my-0 flex w-full items-center justify-between py-6 md:w-[730px]">
          필터 버튼
          <button
            className="flex items-center rounded-md border-[1px] border-black px-4 py-2"
            type="button"
            onClick={toggleAccordion}
          >
            <img src={filterIcon} alt="filter" />
            <span className="ps-[0.625rem] text-sm font-semibold">
              필터
            </span>
          </button>
          정렬
          <div className="relative">
            <button
              className="flex w-40 items-center justify-between rounded-lg border-[1px] border-gray-300 px-3 py-2 text-[13px] font-semibold"
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className="">가격순</span>
              <img src={upDownArrow} alt="upDownArrow" className="" />
            </button>
            정렬 드롭다운
            {isSortOpen && (
              <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <li className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer">
                  <span className="block truncate font-normal">최신순</span>
                </li>
                <li className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer">
                  <span className="block truncate font-normal">낮은가격순</span>
                </li>
                <li className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer">
                  <span className="block truncate font-normal">높은가격순</span>
                </li>
              </ul>
            )}
          </div>
        </div> */}
        {/* 필터 아코디언 -> 필요 시 사용 */}
        {/* <motion.div
          className="fixed left-0 top-0 z-[1000] flex h-full w-[370px] transform flex-col bg-white"
          initial={{ x: -500 }}
          animate={{ x: isFilterOpen ? 0 : -500 }}
          transition={{ duration: 0.3 }}
        >
          닫기 버튼
          <div className="flex h-14 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 py-0.5 pe-5 md:pe-7">
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
          필터 콘텐츠
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col px-5 py-7 md:px-7">
              필터 텍스트 및 초기화 버튼
              <div className="flex w-full items-center justify-between">
                <span className="text-xl font-semibold text-gray-950">
                  필터
                </span>
                <button
                  type="button"
                  className="hover:text-heading mt-0.5 flex-shrink text-xs transition duration-150 ease-in focus:outline-none"
                  onClick={resetFilters}
                >
                  초기화
                </button>
              </div>
              가격 선택
              <div className="mt-5 flex flex-col items-start">
                <p className="font-semibold md:text-lg">가격</p>
                <ul className="mt-4 flex flex-col space-y-4">
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="price"
                            value="under10000"
                            checked={price === 'under10000'}
                            onChange={() => setPrice('under10000')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            1만원 이하
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="price"
                            value="10000to20000"
                            checked={price === '10000to20000'}
                            onChange={() => setPrice('10000to20000')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            1만원 ~ 2만원 이하
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="price"
                            value="20000to30000"
                            checked={price === '20000to30000'}
                            onChange={() => setPrice('20000to30000')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            2만원 ~ 3만원 이하
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="price"
                            value="over30000"
                            checked={price === 'over30000'}
                            onChange={() => setPrice('over30000')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            3만원 이상
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              학년 선택
              <div className="mt-5 flex flex-col items-start">
                <p className="font-semibold md:text-lg">학년</p>
                <ul className="mt-4 flex flex-col space-y-4">
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="grade"
                            value="1"
                            checked={grade === '1'}
                            onChange={() => setGrade('1')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            1학년
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="grade"
                            value="2"
                            checked={grade === '2'}
                            onChange={() => setGrade('2')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            2학년
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="grade"
                            value="3"
                            checked={grade === '3'}
                            onChange={() => setGrade('3')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            3학년
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="grade"
                            value="4"
                            checked={grade === '4'}
                            onChange={() => setGrade('4')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            4학년
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="grade"
                            value="other"
                            checked={grade === 'other'}
                            onChange={() => setGrade('other')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            기타
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              서적 분류 (전공 / 교양)
              <div className="mt-5 flex flex-col items-start">
                <p className="font-semibold md:text-lg">
                  서적 분류
                </p>
                <ul className="mt-4 flex flex-col space-y-4">
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="bookType"
                            value="major"
                            checked={bookType === 'major'}
                            onChange={() => setBookType('major')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            전공
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="bookType"
                            value="elective"
                            checked={bookType === 'elective'}
                            onChange={() => setBookType('elective')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            교양
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              서적 상태 (중고 / 새 책)
              <div className="mt-5 flex flex-col items-start">
                <p className="font-semibold md:text-lg">
                  서적 상태
                </p>
                <ul className="mt-4 flex flex-col space-y-4">
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="bookCondition"
                            value="used"
                            checked={bookCondition === 'used'}
                            onChange={() => setBookCondition('used')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            중고
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="relative flex items-center justify-between">
                      <label className="flex cursor-pointer items-center text-sm text-gray-950">
                        <a href="#" className="flex items-center">
                          <input
                            type="radio"
                            name="bookCondition"
                            value="new"
                            checked={bookCondition === 'new'}
                            onChange={() => setBookCondition('new')}
                            className="h-5 w-5 cursor-pointer rounded-full border border-gray-300 text-gray-950 transition duration-500 ease-in-out checked:bg-gray-950 hover:border-gray-950 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
                          />
                          <span className="relative ms-2 text-sm text-gray-950">
                            새 책
                          </span>
                        </a>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          검색 버튼
          <button
            type="button"
            className="absolute bottom-0 flex h-14 w-full flex-shrink-0 items-center justify-center bg-gray-950 px-7 text-sm leading-4 text-white md:text-base"
          >
            검색
          </button>
        </motion.div> */}
        {/* 필터 열렸을 때 배경 어둡게 -> 필요 시 사용 */}
        {/* {isFilterOpen ? (
          <div
            className="fixed inset-0 z-[900] bg-[rgba(23,23,26,0.5)]"
            onClick={() => {
              setIsFilterOpen(false);
            }}
          />
        ) : null} */}
      </div>
    </>
  );
}

export default MainPage;
