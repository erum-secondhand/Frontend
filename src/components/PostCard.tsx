import sampleImage1 from '../assets/sampleImage1.jpeg';

function PostCard() {
  return (
    <article className="mb-10 w-[47%] overflow-hidden hover:cursor-pointer">
      <div className="select-none text-[#212529]">
        {/* 책 이미지 */}
        <div className="shadow-bookShadow relative box-border w-full overflow-hidden rounded-xl bg-[#F8F9FA] pt-[100%]">
          <img
            src={sampleImage1}
            alt="bookImage"
            className="absolute inset-y-0 box-border w-full overflow-clip rounded-xl border-[1px] border-transparent"
            style={{ overflowClipMargin: 'content-box' }}
          />
        </div>
        {/* 책 설명 */}
        <div className="mt-2">
          <h2 className="mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5 tracking-[-0.02px] text-[#212529]">
            스튜어트 미분적분학 8판
          </h2>
          <h3 className="font-Pretendard overflow-hidden text-ellipsis whitespace-nowrap text-[0.8rem] font-normal leading-6 tracking-[-0.02px] text-[#212529]">
            경문사
          </h3>
          <div className="font-Pretendard mb-1 text-sm font-bold leading-6 text-[#212529] hover:cursor-pointer">
            10,000원
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
