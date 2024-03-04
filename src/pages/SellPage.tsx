/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../baseURL/baseURL';
import cameraIcon from '../assets/camera.svg';
import deleteIcon from '../assets/delete.svg';
import useCheckLoginStatus from '../services/authService';

function SellPage() {
  const navigate = useNavigate();

  const [bookTitle, setBookTitle] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [bookPrice, setBookPrice] = useState<string>('');
  const [bookDescription, setBookDescription] = useState<string>('');

  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedBookState, setSelectedBookState] = useState<string>('중고');
  const [openChatLink, setOpenChatLink] = useState<string>('');
  const [isValidLink, setIsValidLink] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const isLoggedIn = useCheckLoginStatus();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 메인페이지로 새로고침하는 함수
  const moveToMainPage = () => {
    window.location.href = '/';
  };

  // 사진파일 등록 함수
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 서적 제목 입력 이벤트 핸들러
  const bookTitleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

  // 출판사 입력 이벤트 핸들러
  const publisherHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublisher(e.target.value);
  };

  // 판매가격 입력 이벤트 핸들러
  const bookPriceHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // 첫 자리 0 불가
    value = value.replace(/^0+/, '');

    // 6자리에서 자르기
    if (value.length <= 6) {
      setBookPrice(value);
    }
  };

  // 서적 상태 설명 입력 이벤트 핸들러
  const bookDescriptionHandleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBookDescription(e.target.value);
  };

  // 오픈채팅방 링크 유효 검사 및 입력 이벤트 핸들러
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOpenChatLink(value);
    // 링크가 https://open.kakao.com/o/ 로 시작하는지 검사
    setIsValidLink(value.startsWith('https://open.kakao.com/o/'));
  };

  // 사진파일 변경 이벤트 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFilesArray = Array.from(event.target.files);
      const totalFiles = selectedFiles.length + newFilesArray.length;

      // 선택된 파일들의 총 개수가 10개 이하인지 확인
      if (totalFiles <= 10) {
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
      } else {
        alert('최대 10개의 사진만 등록할 수 있습니다.');
      }
    }
  };

  // 사진파일 삭제 이벤트 핸들러
  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  // 선택된 파일 미리보기
  const renderFilePreviews = () => {
    return selectedFiles.map((file, index) => (
      <div
        key={index}
        className="relative m-1 h-20 w-20 shrink-0 md:h-24 md:w-24"
      >
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="h-20 w-20 rounded object-cover md:h-24 md:w-24"
          draggable={false}
        />
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => handleRemoveFile(index)}
          className="absolute right-0 top-0 text-white hover:cursor-pointer"
          draggable={false}
        />
      </div>
    ));
  };

  // 서적 학년(1, 2, 3, 4, 기타) 선택 이벤트 핸들러
  const handleGradeClick = (grade: string) => {
    // 이미 선택된 학년을 클릭하면 선택 취소
    if (selectedGrade === grade) {
      setSelectedGrade('');
    } else {
      setSelectedGrade(grade);
    }
  };

  // 서적 분류(전공, 교양) 선택 이벤트 핸들러
  const handleSortClick = (sort: string) => {
    // 이미 선택된 서적 분류를 클릭하면 선택 취소
    if (selectedSort === sort) {
      setSelectedSort('');
    } else {
      setSelectedSort(sort);
    }
  };

  // 서적 상태(중고, 새 책) 선택 이벤트 핸들러
  const handleBookStateClick = (state: string) => {
    setSelectedBookState(state);
  };

  // 마운트 시 페이지 가장 상단에서 시작
  useEffect(() => {
    // isLoggedIn이 null이 아닐 때만 로직 실행
    if (isLoggedIn !== null) {
      if (isLoggedIn) {
        window.scrollTo(0, 0);
      } else {
        alert('로그인을 해주세요.');
        navigate('/login');
      }
    }
  }, [isLoggedIn]);

  // 판매 등록 API 요청 함수
  const postBookSell = async () => {
    // 모든 칸을 입력했을 시에만 API 요청
    if (
      selectedFiles &&
      bookTitle &&
      publisher &&
      selectedGrade &&
      selectedSort &&
      bookPrice &&
      bookDescription &&
      selectedBookState &&
      openChatLink &&
      isValidLink
    ) {
      try {
        // 마지막에 위치한 불필요한 개행 문자 제거
        const trimmedDescription = bookDescription.replace(/[\r\n]+$/, '');

        const formData = new FormData();

        // 파일 데이터 추가
        selectedFiles.forEach((file) => {
          formData.append('images', file);
        });

        // 문자열 데이터 추가
        formData.append('title', bookTitle);
        formData.append('publisher', publisher);
        formData.append('grade', selectedGrade);
        formData.append('price', bookPrice);
        formData.append('description', trimmedDescription);
        formData.append('type', selectedSort);
        formData.append('condition', selectedBookState);
        formData.append('kakaoLink', openChatLink);

        const response = await api.post('/books', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        console.log(response.data);
        moveToMainPage();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('모든 칸을 정확히 입력해주세요!');
    }
  };

  return (
    <section className="mx-auto my-0 flex w-full flex-col items-start px-5 sm:w-[599px]">
      {/* 사진 등록 */}
      <div className="mt-4 flex w-full items-center px-5 pb-1.5">
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
                draggable={false}
              />
              {selectedFiles.length > 0 ? (
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  {selectedFiles.length} / 10
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  사진 등록
                </p>
              )}
            </div>
          </button>
        </div>
        {/* 선택한 사진 보여주기 */}
        {selectedFiles.length > 0 && (
          <div className="mr-2 flex overflow-x-auto whitespace-nowrap rounded">
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
              className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
              autoComplete="off"
              spellCheck="false"
              aria-invalid="false"
              onChange={bookTitleHandleChange}
            />
          </div>
          {/* 출판사 */}
          <div className="block">
            <input
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="출판사"
              className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
              autoComplete="off"
              spellCheck="false"
              aria-invalid="false"
              onChange={publisherHandleChange}
            />
          </div>
          {/* 학년 선택 */}
          <section>
            <p className="mt-2 font-semibold md:text-lg">서적 학년 정보</p>
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
            <p className="mt-6 font-semibold md:text-lg">서적 분류</p>
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
                  pattern="\d*"
                  className="ml-1 h-11 w-2/3 bg-white text-sm focus:outline-none disabled:opacity-100 md:ml-2 md:h-12 md:text-base"
                  placeholder="판매가격"
                  value={bookPrice}
                  onChange={bookPriceHandleChange}
                  min="0"
                  max="999999"
                />
              </label>
            </div>
          </div>
          {/* 책 설명 입력 */}
          <section className="flex flex-col space-y-5">
            <div className="relative">
              <div>
                <p className="mt-6 font-semibold md:text-lg">상태 설명</p>
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
                  maxLength={250}
                  value={bookDescription}
                  onChange={bookDescriptionHandleChange}
                />
                <span className="absolute -bottom-6 right-2 text-sm leading-5 text-gray-400 md:-bottom-8 md:text-base">
                  {bookDescription.length} / 250
                </span>
              </div>
            </div>
            {/* 책 상태 입력 */}
            <div className="mt-6 flex flex-col">
              <p className="font-semibold md:text-lg">서적 상태</p>
              <div className="mt-3 flex gap-3">
                <button
                  className={`mb-2 h-10 w-20 rounded-md border border-solid md:h-12 md:w-24 ${selectedBookState === '중고' ? 'border-gray-300 bg-gray-300 text-black' : 'border-black bg-white text-black'} font-semibold md:text-lg`}
                  type="button"
                  onClick={() => handleBookStateClick('중고')}
                >
                  중고
                </button>
                <button
                  className={`mb-2 h-10 w-20 rounded-md border border-solid md:h-12 md:w-24 ${selectedBookState === '새 책' ? 'border-gray-300 bg-gray-300 text-black' : 'border-black bg-white text-black'} font-semibold md:text-lg`}
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
                className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-black transition duration-200 ease-in-out focus:border-black focus:outline-none md:h-12 md:px-5 md:text-base"
                autoComplete="off"
                spellCheck="false"
                aria-invalid={!isValidLink}
                value={openChatLink}
                onChange={handleLinkChange}
              />
              {!isValidLink && (
                <p className="mt-1 text-xs text-red-500">
                  링크는 &quot;https://open.kakao.com/o/&quot;로 시작해야
                  합니다.
                </p>
              )}
            </div>
          </section>
        </div>
        {/* 책 등록 버튼 */}
        <div className="w-full px-5">
          <div className="my-8 flex w-full justify-center rounded-3xl bg-gradient-to-r from-[#3dabe7] to-[#ffde01] p-[1px]">
            <button
              className="h-12 w-full rounded-3xl border border-transparent bg-white font-semibold md:h-14 md:text-lg"
              type="button"
              onClick={() => {
                postBookSell();
              }}
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
