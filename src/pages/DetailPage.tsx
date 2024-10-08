import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useRecoilValue } from 'recoil';
import api from '../baseURL/baseURL';
import checkIcon from '../assets/check.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BookDto, ChatRoomResponse, FetchDetailPostCard } from '../dataType';
import upDownArrow from '../assets/upDownArrow.svg';
import useCheckLoginStatus from '../services/authService';
import { userState } from '../userState';
import cancelIcon from '../assets/cancelIcon.svg';
import expandLeftIcon from '../assets/expandLeft.svg';
import expandRightIcon from '../assets/expandRight.svg';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dropDownRef = useRef<HTMLDivElement>(null);

  const [isUpdateDropDownOpen, setIsUpdateDropDownOpen] =
    useState<boolean>(false);
  const [isImageClicked, setIsImageClicked] = useState<boolean>(false);
  const [bookImageIndex, setBookImageIndex] = useState<number>();

  const [detailPostcardData, setDetailPostCardData] =
    useState<FetchDetailPostCard>();

  const userStateValue = useRecoilValue(userState);
  const isLoggedIn = useCheckLoginStatus();

  // 시간 차이를 계산하여 문자열로 반환하는 함수
  // const calculateTimePassed = (date: Date) => {
  //   const now = new Date();
  //   const postedDate = new Date(date);
  //   const differenceInSeconds = Math.round(
  //     (now.getTime() - postedDate.getTime()) / 1000,
  //   );

  //   const minute = 60;
  //   const hour = minute * 60;
  //   const day = hour * 24;
  //   const month = day * 30;
  //   const year = day * 365;

  //   if (differenceInSeconds < minute) {
  //     return `${differenceInSeconds}초 전`;
  //   }
  //   if (differenceInSeconds < hour) {
  //     return `${Math.floor(differenceInSeconds / minute)}분 전`;
  //   }
  //   if (differenceInSeconds < day) {
  //     return `${Math.floor(differenceInSeconds / hour)}시간 전`;
  //   }
  //   if (differenceInSeconds < month) {
  //     return `${Math.floor(differenceInSeconds / day)}일 전`;
  //   }
  //   if (differenceInSeconds < year) {
  //     return `${Math.floor(differenceInSeconds / month)}개월 전`;
  //   }
  //   return `${Math.floor(differenceInSeconds / year)}년 전`;
  // };

  const carouselLeftArrowClick = () => {
    const carouselPrevButton = document.querySelector(
      '.control-arrow.control-prev',
    );

    if (carouselPrevButton) {
      (carouselPrevButton as HTMLElement).click();
    }
  };

  const carouselRightArrowClick = () => {
    const carouselNextButton = document.querySelector(
      '.control-arrow.control-next',
    );

    if (carouselNextButton) {
      (carouselNextButton as HTMLElement).click();
    }
  };

  // 특정 서적 내용 조회 API 요청 함수
  const fetchDetailPostCard = async () => {
    try {
      const response = await api.get<FetchDetailPostCard>(
        `/books/detail/${id}`,
      );
      setDetailPostCardData(response.data);
    } catch (e) {
      alert(e);
    }
  };

  // 거래 상태 수정 API
  const updateSalesStatus = async (selectedSalesStatus: string) => {
    // if (userStateValue.id === detailPostcardData.userId)  -> 추가해야함
    if (detailPostcardData) {
      try {
        await api.put<BookDto>(
          `books/${detailPostcardData?.bookDto.id}`,
          {
            salesStatus: selectedSalesStatus,
          },
          { withCredentials: true },
        );

        setDetailPostCardData((prevData) => {
          if (!prevData) return undefined; // prevData가 undefined인 경우 처리
          return {
            ...prevData,
            bookDto: {
              ...prevData.bookDto,
              salesStatus: selectedSalesStatus, // salesStatus만 업데이트
            },
          };
        });
        setIsUpdateDropDownOpen(false);
        window.location.reload();
      } catch (e) {
        alert(e);
      }
    }
  };

  // 카카오톡 오픈채팅 링크 이동
  // const moveToOpenChatLink = () => {
  //   window.open(`${detailPostcardData?.bookDto.kakaoLink}`, '_blank');
  // };

  // 수정 페이지로 이동 ('/update/:id')
  // const moveToUpdatePage = () => {
  //   navigate(`/update/${id}`, {
  //     state: { detailPostcardData },
  //   });
  // };

  // 채팅방으로 이동 ('/chat/:buyerId/:sellerId/:bookId/room/:chatRoomId')
  const moveToChatPage = async () => {
    if (detailPostcardData) {
      const { userId, bookDto } = detailPostcardData;
      const { id: sellerId } = userStateValue;
      const { id: bookId } = bookDto;

      try {
        const response = await api.get<ChatRoomResponse>('chat/room', {
          params: {
            sellerId,
            buyerId: userId,
            bookId,
          },
          withCredentials: true,
        });

        const chatRoomId = response.data.chatRoom.id;

        navigate(`/chat/${userId}/${sellerId}/${bookId}/room/${chatRoomId}`);
      } catch (e) {
        console.error('채팅방 정보를 가져오는 데 실패했습니다:', e);
      }
    }
  };

  // 드롭다운 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        // 드롭다운 바깥 클릭 시 드롭다운 닫기
        setIsUpdateDropDownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // 컴포넌트가 언마운트 될 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  // 마운트 시 서적 내용 조회 API 요청
  useEffect(() => {
    // isLoggedIn이 null이 아닐 때만 로직 실행
    if (isLoggedIn !== null) {
      fetchDetailPostCard();
      if (isLoggedIn) {
        window.scrollTo(0, 0);
      } else {
        alert('로그인을 해주세요.');
        navigate('/login');
      }
    }
  }, [id, isLoggedIn]);

  return (
    <div className="box-content flex w-full flex-col items-center sm:mt-2 md:mt-4">
      {/* 책 이미지 */}
      <div className="relative w-full overflow-hidden sm:w-[599px] sm:rounded-md lg:w-[677px] lg:rounded-lg">
        {detailPostcardData?.bookDto.imageUrls ? (
          <Carousel
            axis="horizontal"
            emulateTouch
            showArrows={false}
            showStatus={false}
            swipeable
            infiniteLoop
            showThumbs={false}
            useKeyboardArrows
          >
            {detailPostcardData?.bookDto.imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="aspect-square w-full cursor-pointer"
                onClick={() => {
                  setBookImageIndex(index);
                  setIsImageClicked(true);
                }}
              >
                <img
                  src={imageUrl}
                  alt={`bookImage ${index + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div>Loading...</div>
        )}
        {/* 이미지 좌우 화살표 */}
        {detailPostcardData?.bookDto.imageUrls &&
          detailPostcardData?.bookDto.imageUrls.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-50 transition hover:bg-opacity-70"
                onClick={carouselLeftArrowClick}
              >
                <img src={expandLeftIcon} alt="이전" className="w-full" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-50 transition hover:bg-opacity-70"
                onClick={carouselRightArrowClick}
              >
                <img src={expandRightIcon} alt="다음" className="w-full" />
              </button>
            </>
          )}
      </div>
      {/* 이미지 클릭 시 전체 확대 */}
      {isImageClicked && typeof bookImageIndex === 'number' && (
        <div className="fixed left-0 top-0 z-[1000] h-screen w-screen overflow-hidden bg-black">
          <div className="mx-auto my-auto h-full w-full p-5">
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute top-0 z-10 h-[45px] w-full bg-black bg-opacity-30">
                <img
                  src={cancelIcon}
                  alt="cancel"
                  className="absolute right-0 w-8 cursor-pointer"
                  onClick={() => {
                    setIsImageClicked(false);
                  }}
                />
              </div>
              <img
                src={detailPostcardData?.bookDto.imageUrls[bookImageIndex]}
                alt="bookImage"
                className="h-full max-h-full w-auto max-w-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
      <section className="mt-3 flex w-full flex-col items-center px-3 md:mt-4">
        {/* 책 정보 */}
        <div className="flex w-full items-center sm:w-[599px] lg:w-[677px]">
          <div className="w-full">
            <span className="mb-1 text-xl font-semibold md:mb-2 lg:text-2xl">
              {detailPostcardData?.bookDto.title}
            </span>
            <div className="my-1 flex items-center md:my-2">
              <span className="text-sm text-gray-500 lg:text-base">
                {detailPostcardData?.bookDto.publisher}
              </span>
              {/* <span className="mx-[2px] text-sm text-gray-500 lg:text-base">
                ∙
              </span>
              {detailPostcardData?.bookDto.createAt && (
                <span className="text-sm text-gray-500 lg:text-base">
                  {calculateTimePassed(
                    new Date(detailPostcardData.bookDto.createAt),
                  )}
                </span>
              )} */}
            </div>
            <span className="my-1 text-2xl font-bold md:my-2 lg:text-3xl">
              {parseInt(
                detailPostcardData?.bookDto.price ?? '0',
                10,
              ).toLocaleString()}
              원
            </span>
          </div>
          {/* 거래 상태 드롭다운 */}
          {userStateValue &&
            userStateValue &&
            detailPostcardData &&
            userStateValue.id === detailPostcardData?.userId && (
              <div className="relative mb-3" ref={dropDownRef}>
                <button
                  className="flex w-32 items-center justify-between rounded-lg border-[1px] border-gray-300 px-3 py-2 text-[13px] font-semibold lg:w-36 lg:px-5 lg:py-3 lg:text-[15px]"
                  type="button"
                  onClick={() => setIsUpdateDropDownOpen(!isUpdateDropDownOpen)}
                >
                  <span className="">
                    {detailPostcardData?.bookDto.salesStatus}
                  </span>
                  <img
                    src={upDownArrow}
                    alt="upDownArrow"
                    className=""
                    draggable={false}
                  />
                </button>
                {isUpdateDropDownOpen && (
                  <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:text-base">
                    <li
                      className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer"
                      onClick={() => {
                        updateSalesStatus('판매중');
                      }}
                    >
                      <span className="block truncate font-normal">판매중</span>
                    </li>
                    <li
                      className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer"
                      onClick={() => {
                        updateSalesStatus('판매완료');
                      }}
                    >
                      <span className="block truncate font-normal">
                        판매완료
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            )}
        </div>
        {/* 책 설명 */}
        <div className="mt-4 flex w-full flex-col items-start sm:w-[599px] md:mt-6 lg:mt-8 lg:w-[677px]">
          <span className="text-base leading-6 tracking-normal lg:text-lg">
            {detailPostcardData?.bookDto.description
              .split('\n')
              .map((line, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <br />}
                  <span className="text-base leading-7 tracking-normal lg:text-lg lg:leading-8">
                    {line}
                  </span>
                </React.Fragment>
              ))}
          </span>
        </div>
        {/* 책 상태 */}
        <div className="flex w-full flex-col items-start py-8 sm:w-[599px] md:py-12 lg:w-[677px]">
          {/* 제품상태 */}
          <div className="flex flex-col">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b] md:text-base">
                제품상태
              </span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313] md:text-base">
              {detailPostcardData?.bookDto.condition}
            </span>
          </div>
          {/* 판매여부 */}
          <div className="mt-3 flex flex-col lg:mt-4">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b] md:text-base">
                학년
              </span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313] md:text-base">
              {detailPostcardData?.bookDto.grade}
            </span>
          </div>
          {/* 학년 */}
          <div className="mt-3 flex flex-col lg:mt-4">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b] md:text-base">
                상태
              </span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313] md:text-base">
              {detailPostcardData?.bookDto.salesStatus}
            </span>
          </div>
        </div>
        {/* 채팅 및 게시글 수정 버튼 */}
        {userStateValue &&
        userStateValue &&
        detailPostcardData &&
        userStateValue.id === detailPostcardData?.userId ? (
          ''
        ) : (
          <div className="mb-5 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px] sm:w-[599px] lg:w-[677px]">
            {/* 채팅 버튼 */}
            <button
              className="md:h-13 h-11 w-full rounded-3xl border border-transparent bg-white px-3 font-semibold sm:w-[599px] lg:w-[677px]"
              type="button"
              onClick={moveToChatPage}
            >
              판매자와 채팅하기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default DetailPage;
