/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchPostCards } from '../dataType';

function PostCard(props: FetchPostCards) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const moveToDetailPage = () => {
    navigate(`/detail/${props.id}`);
  };

  return (
    <article
      className={`mb-8 w-[47%] overflow-hidden hover:cursor-pointer md:mx-[14.5px] md:mb-14 md:w-56 ${currentPath.startsWith('/mypage') ? '' : '2xl:mx-[20px] 2xl:w-[270px]'}`}
      onClick={moveToDetailPage}
    >
      <div className="select-none text-[#212529]">
        {/* 책 이미지 */}
        <div className="relative box-border w-full overflow-hidden rounded-xl bg-[#F8F9FA] pt-[100%] shadow-bookShadow">
          <img
            src={props.imageUrls[0]}
            alt="bookImage"
            className="absolute inset-y-0 box-border h-full w-full overflow-clip rounded-xl border-[1px] border-transparent object-cover"
            style={{ overflowClipMargin: 'content-box' }}
            draggable={false}
          />
        </div>
        {/* 책 설명 */}
        <div className="mt-2 md:mt-3">
          <h2
            className={`mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5 tracking-tight text-[#212529] sm:mb-1 sm:text-base ${currentPath.startsWith('/mypage') ? '' : '2xl:text-lg'}`}
          >
            {props.title}
          </h2>
          <div
            className={`mb-1 text-sm font-bold leading-6 text-[#212529] hover:cursor-pointer sm:text-[15px] ${currentPath.startsWith('/mypage') ? '' : '2xl:text-[17px]'}`}
          >
            {props.price.toLocaleString()}원
          </div>
          <h3
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.8rem] text-xs font-normal leading-5 tracking-tight text-[#373d41] sm:mb-1 sm:text-sm ${currentPath.startsWith('/mypage') ? '' : '2xl:text-base'}`}
          >
            {props.publisher}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
