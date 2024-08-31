/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, KeyboardEvent, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import api from '../baseURL/baseURL';
import logo from '../assets/logo.svg';
import sellingIcon from '../assets/sellingIcon.svg';
import personIcon from '../assets/personIcon.svg';
import searchIcon from '../assets/search.svg';
import searchBoldIcon from '../assets/searchBold.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import cancelIcon from '../assets/cancel.svg';
import myPageIcon from '../assets/myPageIcon.svg';
import chatIcon from '../assets/chatIcon.svg';
import prevIcon from '../assets/prevIcon.svg';
import '../theme.css';
import { FetchPostCards } from '../dataType';
import { searchPostCardsState } from '../recoilState';
import { userState } from '../userState';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const setSearchPostCards = useSetRecoilState(searchPostCardsState);
  const [userStateValue, setUserStateValue] = useRecoilState(userState);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 아이콘 클릭 이벤트 핸들러
  const handleSearchIconClick = () => {
    setSearchClicked(true);
    // 컴포넌트가 렌더링되고 나서 DOM 요소에 접근하기 위해 setTimeout 사용
    setTimeout(() => {
      if (searchInputRef.current) {
        // input 요소에 포커스
        searchInputRef.current.focus();
      }
    }, 0);
  };

  // 검색창 포커스 이벤트 핸들러
  const handleSearchBarFocus = () => {
    if (isSearchBarFocused) {
      setIsSearchBarFocused(false);
    } else {
      setIsSearchBarFocused(true);
    }
  };

  // 검색창 입력 이벤트 핸들러
  const searchBoxHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 메인 페이지로 새로고침 ('/')
  const moveToMainPageWithRefresh = () => {
    window.location.href = '/';
  };

  // 메인 페이지로 이동 ('/')
  const moveToMainPage = () => {
    navigate('/');
  };

  // 판매 등록 페이지로 이동 ('/sell')
  const moveToSellPage = () => {
    navigate('/sell');
  };

  // 채팅 목록 페이지로 이동 ('/chat/:id')
  const moveToChatPage = () => {
    navigate(`/chat`);
  }

  // 로그인 페이지로 이동 ('/login')
  const moveToLoginPage = () => {
    navigate('/login');
  };

  // 마이 페이지로 이동 ('/mypage/:id')
  const moveToMyPage = () => {
    navigate(`/mypage/${userStateValue.user.id}`);
  };

  // 검색 API 요청
  const fetchSearchPostCards = async () => {
    setSearchClicked(false); // 검색창 숨기기

    if (searchText === '') {
      alert('검색어를 입력해주세요!');
      return;
    }

    try {
      const response = await api.get<FetchPostCards[]>('/books/search', {
        params: {
          title: searchText,
        },
      });

      // 검색 결과가 있는 경우에만 보여주기
      if (response.data.length !== 0) {
        setSearchPostCards(response.data);
        navigate('/');
      } else {
        alert('검색 결과가 없습니다!');
      }
    } catch (error) {
      alert(error);
    }
  };

  // 로그아웃 API 요청
  const logOutRequest = async () => {
    try {
      const response = await api.post<string>(
        '/users/logout',
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        setUserStateValue({
          isLoggedIn: false,
          user: {
            email: '',
            id: 0,
            major: '',
            name: '',
            studentId: '',
          },
        });
      }
      moveToMainPageWithRefresh();
    } catch (e) {
      alert(e);
    }
  };

  // 검색창 엔터키 이벤트 핸들러
  const searchBoxHandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSearchPostCards();
    }
  };

  return (
    <>
      {/* 검색 바 */}
      {searchClicked ? (
        <div className="sticky top-0 z-[60] mx-auto border-b-[1px] border-gray-200">
          <div className="flex h-14 w-full items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem]">
            <div className="mr-4 flex h-10 w-full items-center rounded-md bg-gray-100 md:h-12">
              <div
                className={`relative flex w-full items-center overflow-hidden rounded-md bg-gray-100 py-0.5 ${isSearchBarFocused && 'border border-solid border-gray-400 transition'}`}
              >
                <input
                  ref={searchInputRef}
                  id="search-box"
                  className="mx-4 h-9 w-full bg-gray-100 text-sm text-gray-950 placeholder-gray-500 outline-none max-[340px]:mx-0 lg:h-11 lg:text-base"
                  placeholder="책 제목을 검색해주세요"
                  aria-label="search-box"
                  autoComplete="off"
                  name="search"
                  onChange={searchBoxHandleChange}
                  onKeyDown={searchBoxHandleKeyDown}
                  onFocus={handleSearchBarFocus}
                  onBlur={handleSearchBarFocus}
                />
                <img
                  src={searchBoldIcon}
                  alt="검색"
                  className="absolute right-4 w-6 cursor-pointer"
                  onClick={fetchSearchPostCards}
                />
              </div>
            </div>
            <button
              type="button"
              className="appearance-none whitespace-nowrap border-0 bg-none p-0 text-lg font-semibold leading-6 text-gray-950 md:text-xl"
              onClick={() => {
                setSearchClicked(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-50 border-b-[1px] border-gray-200">
          <div className="flex h-14 w-full items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem] md:px-10">
            {/* 채팅방일 경우 뒤로가기 버튼 나타남 */}
            {currentPath.includes('/room/') && !menuOpen && (
              <img
                src={prevIcon}
                alt="prev"
                className="w-4 mr-3 hover:cursor-pointer lg:mr-56"
                onClick={moveToChatPage}
              />
            )}
            <img
              src={logo}
              alt="logo"
              className="w-[4.5rem] pb-1 hover:cursor-pointer md:w-20"
              onClick={moveToMainPageWithRefresh}
            />
            {/* 1024px 이상일 경우 검색바 나타남(채팅하기 페이지 제외) */}
            <div className={`hidden ${!currentPath.includes('/chat/') ? 'lg:ml-24 lg:flex lg:w-1/2' : ''}`}>
              <div className="mr-4 flex h-10 w-full items-center rounded-md bg-gray-200 md:h-12">
                <div
                  className={`relative flex w-full items-center overflow-hidden rounded-md bg-gray-100 py-0.5 ${isSearchBarFocused && 'border border-solid border-gray-400 transition'}`}
                >
                  <input
                    ref={searchInputRef}
                    id="search-box"
                    className="mx-4 h-9 w-full bg-gray-100 text-sm text-gray-950 placeholder-gray-500 outline-none max-[340px]:mx-0 lg:h-11 lg:text-base"
                    placeholder="책 제목을 검색해주세요"
                    aria-label="search-box"
                    autoComplete="off"
                    name="search"
                    onChange={searchBoxHandleChange}
                    onKeyDown={searchBoxHandleKeyDown}
                    onFocus={handleSearchBarFocus}
                    onBlur={handleSearchBarFocus}
                  />
                  <img
                    src={searchBoldIcon}
                    alt="검색"
                    className="absolute right-4 w-6 cursor-pointer"
                    onClick={fetchSearchPostCards}
                  />
                </div>
              </div>
            </div>
            {/* 검색 및 햄버거 아이콘 (1024px 미만) */}
            <div className="flex lg:hidden">
              {/* 채팅하기 페이지에서는 검색 아이콘 숨김 */}
              {!currentPath.includes('/chat/') && (
                <img
                  src={searchIcon}
                  alt="검색"
                  className="mr-4 hover:cursor-pointer md:w-7"
                  onClick={handleSearchIconClick}
                />
              )}
              {menuOpen ? (
                <img
                  src={cancelIcon}
                  alt="menu"
                  className="hover:cursor-pointer md:w-7"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                />
              ) : (
                <img
                  src={hamburgerIcon}
                  alt="menu"
                  className="hover:cursor-pointer md:w-7"
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                />
              )}
            </div>
            {/* 판매하기 및 로그인 버튼 (1024px 이상) */}
            <div className="md hidden space-x-4 lg:flex">
              <div
                className="flex cursor-pointer items-center space-x-1"
                onClick={moveToSellPage}
              >
                <img
                  src={sellingIcon}
                  alt="판매"
                  className="w-6 hover:cursor-pointer"
                />
                <span className="text-nowrap text-sm">판매하기</span>
              </div>
              {userStateValue.isLoggedIn && !currentPath.includes('/room/') && (
                <div 
                  className="flex cursor-pointer items-center space-x-1"
                  onClick={moveToChatPage}
                >
                  <img
                    src={chatIcon}
                    alt="채팅"
                    className="w-5 mr-1 hover:cursor-pointer"
                  />
                  <span className="text-nowrap text-sm">채팅하기</span>
                </div>
              )}
              <div
                className="flex cursor-pointer items-center space-x-1"
                onClick={() => {
                  if (userStateValue.isLoggedIn) {
                    logOutRequest();
                  } else {
                    moveToLoginPage();
                  }
                }}
              >
                <img
                  src={personIcon}
                  alt="로그인 / 로그아웃"
                  className="w-6 hover:cursor-pointer"
                />
                <span className="text-nowrap text-sm">
                  {userStateValue.isLoggedIn ? '로그아웃' : '로그인'}
                </span>
              </div>
              {userStateValue.isLoggedIn && (
                <div
                  className="flex cursor-pointer items-center space-x-1"
                  onClick={moveToMyPage}
                >
                  <img
                    src={myPageIcon}
                    alt="MY"
                    className="w-6 hover:cursor-pointer"
                  />
                  <span className="text-nowrap text-sm">MY</span>
                </div>
              )}
            </div>
          </div>
          {/* 메뉴 드롭다운 */}
          {menuOpen && (
            <div
              className={`${userStateValue.isLoggedIn ? 'h-51 md:h-65' : 'h-24 md:h-36'} absolute flex w-screen flex-col bg-white`}
            >
              <button
                className={`${currentPath === '/' || currentPath.startsWith('/detail') ? 'text-orange-500' : 'text-gray-950'} ${userStateValue.isLoggedIn ? 'h-1/4' : 'h-1/2'} w-full py-3 active:bg-gray-200 md:text-lg`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  moveToMainPage();
                }}
              >
                중고서적 거래
              </button>
              {userStateValue.isLoggedIn && (
                <button
                  className={`${currentPath === '/sell' ? 'text-orange-500' : 'text-gray-950'} ${userStateValue.isLoggedIn ? 'h-1/4' : 'h-1/2'} w-full py-3 active:bg-gray-200 md:text-lg`}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    moveToSellPage();
                  }}
                >
                  판매하기
                </button>
              )}
              {userStateValue.isLoggedIn && (
                <button
                  className={`${currentPath.includes('/chat/') ? 'text-orange-500' : 'text-gray-950'} ${userStateValue.isLoggedIn ? 'h-1/4' : 'h-1/2'} w-full py-3 active:bg-gray-200 md:text-lg`}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    moveToChatPage();
                  }}
                >
                  채팅하기
                </button>
              )}
              {userStateValue.isLoggedIn && (
                <button
                  className={`${currentPath.includes('/mypage/') ? 'text-orange-500' : 'text-gray-950'} ${userStateValue.isLoggedIn ? 'h-1/4' : 'h-1/2'} w-full py-3 active:bg-gray-200 md:text-lg`}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    moveToMyPage();
                  }}
                >
                  마이페이지
                </button>
              )}
              <button
                className={`${currentPath === '/login' ? 'text-orange-500' : 'text-gray-950'} ${userStateValue.isLoggedIn ? 'h-1/4' : 'h-1/2'} w-full py-3 active:bg-gray-200 md:text-lg`}
                type="button"
                onClick={() => {
                  if (userStateValue.isLoggedIn) {
                    setMenuOpen(false);
                    logOutRequest();
                  } else {
                    setMenuOpen(false);
                    moveToLoginPage();
                  }
                }}
              >
                {userStateValue.isLoggedIn ? '로그아웃' : '로그인'}
              </button>
            </div>
          )}
        </div>
      )}
      {/* menuOpen이 true이거나 searchClicked가 true일 때 배경색상 어둡게 만들기 */}
      {menuOpen || searchClicked ? (
        <div
          className="fixed inset-0 z-40 bg-[rgba(23,23,26,0.5)]"
          onClick={() => {
            setMenuOpen(false);
            setSearchClicked(false);
          }}
        />
      ) : null}
    </>
  );
}

export default NavBar;