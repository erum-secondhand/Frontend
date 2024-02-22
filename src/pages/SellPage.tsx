/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useState, useRef, useEffect } from 'react';
import cameraIcon from '../assets/camera.svg';
import deleteIcon from '../assets/delete.svg';

function SellPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedBookState, setSelectedBookState] = useState<string>('중고');
  const [openChatLink, setOpenChatLink] = useState<string>('');
  const [isValidLink, setIsValidLink] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray); // 선택된 파일들을 상태에 저장
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  // 선택된 파일 미리보기
  const renderFilePreviews = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="relative m-1">
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="h-20 w-20 rounded object-cover"
          style={{ objectFit: 'contain' }}
        />
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => handleRemoveFile(index)} // 삭제 핸들러 호출
          className="absolute right-0 top-0 text-white hover:cursor-pointer"
        />
      </div>
    ));
  };

  const handleGradeClick = (grade: string) => {
    // 이미 선택된 학년을 클릭하면 선택 취소
    if (selectedGrade === grade) {
      setSelectedGrade('');
    } else {
      setSelectedGrade(grade);
    }
  };

  const handleSortClick = (sort: string) => {
    // 이미 선택된 서적 분류를 클릭하면 선택 취소
    if (selectedSort === sort) {
      setSelectedSort('');
    } else {
      setSelectedSort(sort);
    }
  };

  const handleBookStateClick = (state: string) => {
    setSelectedBookState(state);
  };

  // 오픈채팅방 링크 유효 검사
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOpenChatLink(value);
    // 링크가 https://open.kakao.com/o/ 로 시작하는지 검사
    setIsValidLink(value.startsWith('https://open.kakao.com/o/'));
  };

  // 마운트 시 페이지 가장 상단에서 시작
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="mx-auto my-0 flex w-full flex-col items-start px-5 sm:w-[599px]">
      {/* 사진 등록 */}
      <div className="mt-4 flex items-center px-5 pb-1.5">
        <div>
          <input
            ref={fileInputRef}
            name="media"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="mr-1.5 flex h-20 w-20 items-center justify-center rounded bg-[#f1f4f6] md:h-24 md:w-24"
            type="button"
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center">
              <img
                src={cameraIcon}
                alt="camera"
                className="h-8 w-8 md:h-9 md:w-9"
              />
              <p className="mt-1 text-xs text-gray-500 md:text-sm">사진 등록</p>
            </div>
          </button>
        </div>
        {selectedFiles.length > 0 && (
          <div className="mr-2 flex flex-wrap rounded">
            {renderFilePreviews()}
          </div>
        )}
      </div>
      {/* 판매 정보 */}
      <form className="mt-6 flex w-full flex-col items-center lg:mt-8">
        <div className="flex w-full flex-col space-y-7 px-5">
          {/* 책 제목 */}
          <div className="block">
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="서적 제목"
              className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 font-Pretendard text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
              autoComplete="off"
              spellCheck="false"
              aria-invalid="false"
            />
          </div>
          {/* 출판사 */}
          <div className="block">
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="출판사"
              className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 font-Pretendard text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
              autoComplete="off"
              spellCheck="false"
              aria-invalid="false"
            />
          </div>
          {/* 저자 */}
          <div className="block">
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="저자"
              className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 font-Pretendard text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
              autoComplete="off"
              spellCheck="false"
              aria-invalid="false"
            />
          </div>
          {/* 학년 선택 */}
          <section>
            <p className="mt-2 font-Pretendard font-semibold md:text-lg">
              서적 학년 정보
            </p>
            <div className="mt-3 flex h-14 w-full overflow-hidden rounded-md border border-solid border-gray-300 text-[13px] font-medium">
              {['1학년', '2학년', '3학년', '4학년', '기타'].map(
                (grade, index, array) => (
                  <button
                    key={index}
                    className={`w-1/5 py-3 md:text-sm ${selectedGrade === grade ? 'bg-gray-200' : ''} ${index !== array.length - 1 ? 'border-r border-gray-300' : ''}`}
                    type="button"
                    onClick={() => handleGradeClick(grade)}
                  >
                    {grade}
                  </button>
                ),
              )}
            </div>
            <p className="mt-6 font-Pretendard font-semibold md:text-lg">
              서적 분류
            </p>
            <div className="mt-3 flex h-14 w-full overflow-hidden rounded-md border border-solid border-gray-300 text-[13px] font-medium">
              {['전공', '교양'].map((sort, index, array) => (
                <button
                  key={index}
                  className={`w-1/2 py-3 md:text-sm ${selectedSort === sort ? 'bg-gray-200' : ''} ${index !== array.length - 1 ? 'border-r border-gray-300' : ''}`}
                  type="button"
                  onClick={() => handleSortClick(sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          </section>
          {/* 판매 가격 입력 */}
          <div className="mt-5 flex flex-col">
            <div className="-mb-3 flex h-12 w-full origin-top-left items-center justify-between rounded border border-solid border-gray-300 p-6 px-4">
              <label
                htmlFor="search"
                className="flex w-full items-center py-0.5"
              >
                <span className="text-sm md:text-base">₩</span>
                <input
                  name="bookPrice"
                  type="number"
                  inputMode="numeric"
                  className="ml-1 h-11 w-2/3 bg-white text-sm focus:outline-none disabled:opacity-100 md:ml-2 md:h-12 md:text-base "
                  placeholder="판매가격"
                />
              </label>
            </div>
          </div>
          {/* 책 설명 입력 */}
          <section className="flex flex-col space-y-5">
            <div className="relative">
              <div>
                <p className="mt-6 font-Pretendard font-semibold md:text-lg">
                  상태 설명
                </p>
                <textarea
                  name="bookDescription"
                  id="bookDescription"
                  className="mt-3 inline-block h-[265px] w-full resize-none appearance-none items-center overflow-x-scroll rounded border border-solid border-gray-300 bg-white px-4 pb-7 pt-4 align-middle text-sm text-black outline-none transition duration-300 ease-in-out placeholder:leading-7 placeholder:text-gray-500 focus:border-black focus:shadow focus:outline-none focus:ring-0 md:text-base"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="- 서적 제목(자세한 제목)
- 구매 시기
- 오염 여부
- 하자 여부
* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요."
                  maxLength="1000"
                />
                <span className="absolute -bottom-6 right-2 text-sm leading-5 text-gray-400 md:-bottom-8 md:text-base">
                  0 / 1000
                </span>
              </div>
            </div>
            {/* 책 상태 입력 */}
            <div className="mt-6 flex flex-col">
              <p className="font-Pretendard font-semibold md:text-lg">
                서적 상태
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  className={`mb-2 h-10 w-20 rounded-md border border-solid font-Pretendard md:h-12 md:w-24 ${selectedBookState === '중고' ? 'border-gray-300 bg-gray-300 text-black' : 'border-black bg-white text-black'} font-semibold md:text-lg`}
                  type="button"
                  onClick={() => handleBookStateClick('중고')}
                >
                  중고
                </button>
                <button
                  className={`mb-2 h-10 w-20 rounded-md border border-solid font-Pretendard md:h-12 md:w-24 ${selectedBookState === '새 책' ? 'border-gray-300 bg-gray-300 text-black' : 'border-black bg-white text-black'} font-semibold md:text-lg`}
                  type="button"
                  onClick={() => handleBookStateClick('새 책')}
                >
                  새 책
                </button>
              </div>
            </div>
            {/* 오픈채팅방 링크 */}
            <div className="block">
              <input
                id="bookTitle"
                name="bookTitle"
                type="text"
                placeholder="오픈채팅방 링크"
                className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 font-Pretendard text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
                autoComplete="off"
                spellCheck="false"
                aria-invalid={!isValidLink}
                value={openChatLink}
                onChange={handleLinkChange}
              />
              {!isValidLink && (
                <p className="mt-1 text-xs text-red-500">
                  링크는 "https://open.kakao.com/o/"로 시작해야 합니다.
                </p>
              )}
            </div>
          </section>
        </div>
        {/* 책 등록 */}
        <div className="w-full px-5">
          <div className="my-8 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px]">
            <button
              className="h-12 w-full rounded-3xl border border-transparent bg-white font-Pretendard font-semibold md:h-14 md:text-lg"
              type="submit"
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SellPage;
