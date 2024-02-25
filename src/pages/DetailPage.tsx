/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import checkIcon from '../assets/check.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { FetchDetailPostCard } from '../dataType';
import React from 'react';

function DetailPage() {
  const { id } = useParams();

  const [detailPostcardData, setDetailPostCardData] =
    useState<FetchDetailPostCard>();

  // 특정 서적 내용 조회 API 요청 함수
  const fetchDetailPostCard = async () => {
    try {
      const response = await axios.get<FetchDetailPostCard>(
        `http://localhost:8080/books/detail/${id}`,
      );
      console.log(response.data);
      setDetailPostCardData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // 카카오톡 오픈채팅 링크 이동
  const moveToOpenChatLink = () => {
    window.open(`${detailPostcardData?.kakaoLink}`, '_blank');
  };

  useEffect(() => {
    fetchDetailPostCard();
  }, [id]);

  return (
    <div className="box-content flex w-full flex-col items-center sm:mt-2 md:mt-4">
      {/* 책 이미지 */}
      <div className="w-full overflow-hidden sm:w-[599px] sm:rounded-md lg:w-[677px] lg:rounded-lg">
        {detailPostcardData?.imageUrls ? (
          <Carousel
            axis="horizontal"
            emulateTouch
            infiniteLoop
            showArrows={false}
            showStatus={false}
            swipeable
            showThumbs={false}
            useKeyboardArrows
          >
            {detailPostcardData?.imageUrls.map((imageUrl, index) => (
              <div key={index} className="aspect-square w-full">
                <img
                  src={imageUrl}
                  alt={`bookImage ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <section className="mt-3 flex w-full flex-col items-center px-3 md:mt-4">
        {/* 책 정보 */}
        <div className="flex w-full flex-col items-start space-y-1 sm:w-[599px] md:space-y-2 lg:w-[677px] lg:space-y-3">
          <span className="font-Pretendard text-xl font-semibold lg:text-2xl">
            {detailPostcardData?.title}
          </span>
          <div className="flex items-center">
            <span className="font-Pretendard text-sm text-gray-500 lg:text-base">
              {detailPostcardData?.publisher}
            </span>
            <span className="mx-[2px] font-Pretendard text-sm text-gray-500 lg:text-base">
              ∙
            </span>
            <span className="font-Pretendard text-sm text-gray-500 lg:text-base">
              12시간 전
            </span>
          </div>
          <span className="font-Pretendard text-2xl font-bold lg:text-3xl">
            {parseInt(detailPostcardData?.price ?? '0', 10).toLocaleString()}원
          </span>
        </div>
        {/* 책 설명 */}
        <div className="mt-4 flex w-full flex-col items-start sm:w-[599px] md:mt-6 lg:mt-8 lg:w-[677px]">
          <span className="font-Pretendard text-base leading-6 tracking-normal lg:text-lg">
            {detailPostcardData?.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                <span className="font-Pretendard text-base leading-7 tracking-normal lg:text-lg lg:leading-8">
                  {line}
                </span>
              </React.Fragment>
            ))}
          </span>
        </div>
        {/* 책 상태 */}
        <div className="flex w-full flex-col items-start py-6 sm:w-[599px] md:py-10 lg:w-[677px]">
          <div className="flex flex-col">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b] md:text-base">
                제품상태
              </span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313] md:text-base">
              {detailPostcardData?.condition}
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b] md:text-base">
                학년
              </span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313] md:text-base">
              {detailPostcardData?.grade}
            </span>
          </div>
        </div>
        {/* 채팅 버튼 */}
        <div className="mb-5 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px] sm:w-[599px] lg:w-[677px]">
          <button
            className="md:h-13 h-11 w-full rounded-3xl border border-transparent bg-white font-Pretendard font-semibold sm:w-[599px] lg:w-[677px]"
            type="button"
            onClick={moveToOpenChatLink}
          >
            판매자와 채팅하기
          </button>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
