/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import sampleImage1 from '../assets/sampleImage1.jpeg';
import sampleImage2 from '../assets/sampleImage2.jpeg';
import sampleImage3 from '../assets/sampleImage3.jpeg';
import sampleImage4 from '../assets/sampleImage4.jpeg';
import checkIcon from '../assets/check.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function DetailPage() {
  // 이미지 배열
  const [images, setImages] = useState<string[]>([
    sampleImage1,
    sampleImage2,
    sampleImage3,
    sampleImage4,
  ]);

  return (
    <div className="flex w-full flex-col items-center">
      {/* 책 이미지 */}
      <div className="w-full overflow-hidden">
        {/* <img
          src={sampleImage1}
          alt="sampleImage"
          className="mx-auto my-0 sm:w-[599px]"
        /> */}
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
          {images.map((image, index) => (
            <div key={index} className="aspect-square w-full">
              {' '}
              {/* 정사각형 비율로 이미지를 유지하기 위한 클래스 추가 */}
              <img
                src={image}
                alt={`sampleImage ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <section className="mt-3 flex w-full flex-col items-center px-3">
        {/* 책 정보 */}
        <div className="flex w-full flex-col items-start space-y-1 sm:w-[599px]">
          <span className="font-Pretendard text-xl font-semibold">
            스튜어트 미분적분학 8판
          </span>
          <div className="flex items-center">
            <span className="font-Pretendard text-sm text-gray-500">
              경문사
            </span>
            <span className="mx-[2px] font-Pretendard text-sm text-gray-500">
              ∙
            </span>
            <span className="font-Pretendard text-sm text-gray-500">
              12시간 전
            </span>
          </div>
          <span className="font-Pretendard text-2xl font-bold">10,000원</span>
        </div>
        {/* 책 설명 */}
        <div className="mt-4 flex w-full flex-col items-start sm:w-[599px]">
          <span className="font-Pretendard text-base leading-6 tracking-normal">
            책 정말 깨끗이 썼습니다 정말이에요 저를 믿어주세요 사실 구라에요
            겁나 더럽게 썼습니다 ㅋ
          </span>
        </div>
        {/* 책 상태 */}
        <div className="flex w-full flex-col items-start py-6 sm:w-[599px]">
          <div className="flex flex-col">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b]">제품상태</span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313]">
              새상품
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="mr-5 flex min-w-[95px] items-center">
              <img src={checkIcon} alt="dot" />
              <span className="ml-[6px] text-sm text-[#5a616b]">학년</span>
            </div>
            <span className="block pl-6 pt-1 text-sm font-medium tracking-[0.2px] text-[#141313]">
              1학년
            </span>
          </div>
        </div>
        {/* 채팅 버튼 */}
        <div className="mb-5 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px] sm:w-[599px]">
          <button
            className="h-11 w-full rounded-3xl border border-transparent bg-white font-Pretendard font-semibold sm:w-[599px]"
            type="button"
          >
            판매자와 채팅하기
          </button>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
