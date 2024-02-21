/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router-dom';
import sampleImage1 from '../assets/sampleImage1.jpeg';

function PostCard() {
  const navigate = useNavigate();

  const moveToDetailPage = () => {
    navigate('/detail/1');
  };

  return (
    <article
      className="mb-8 w-[47%] overflow-hidden hover:cursor-pointer md:mb-14 md:w-56"
      onClick={moveToDetailPage}
    >
      <div className="select-none text-[#212529]">
        {/* 책 이미지 */}
        <div className="relative box-border w-full overflow-hidden rounded-xl bg-[#F8F9FA] pt-[100%] shadow-bookShadow">
          <img
            src={sampleImage1}
            alt="bookImage"
            className="absolute inset-y-0 box-border w-full overflow-clip rounded-xl border-[1px] border-transparent"
            style={{ overflowClipMargin: 'content-box' }}
          />
        </div>
        {/* 책 설명 */}
        <div className="mt-2 md:mt-3">
          <h2 className="mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5 tracking-tight text-[#212529] md:mb-1 md:text-base">
            스튜어트 미분적분학 8판
          </h2>
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-Pretendard text-[0.8rem] font-normal leading-5 tracking-tight text-[#212529] md:mb-1 md:text-sm">
            경문사
          </h3>
          <div className="mb-1 font-Pretendard text-sm font-bold leading-6 text-[#212529] hover:cursor-pointer md:text-[15px]">
            10,000원
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
