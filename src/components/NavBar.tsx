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
import hamburgerIcon from '../assets/hamburger.svg';
import cancelIcon from '../assets/cancel.svg';
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

  // 로그인 페이지로 이동 ('/login')
  const moveToLoginPage = () => {
    navigate('/login');
  };

  // 검색창 입력 이벤트 핸들러
  const searchBoxHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 검색 API 요청
  const fetchSearchPostCards = async (e: KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키 눌렀는지 확인
    if (e.key === 'Enter') {
      setSearchClicked(false); // 검색창 숨기기

      try {
        const response = await api.get<FetchPostCards[]>('/books/search', {
          params: {
            title: searchText,
          },
        });
        console.log(response.data);

        // 검색 결과가 있는 경우에만 보여주기
        if (response.data.length !== 0) {
          setSearchPostCards(response.data);
        } else {
          alert('검색 결과가 없습니다!');
        }
      } catch (error) {
        console.log(error);
      }
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
      console.log(response.data);
      if (response.status === 200) {
        setUserStateValue({
          isLoggedIn: false,
          userData: { id: 0, message: '' },
        });
      }
      moveToMainPageWithRefresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* 검색 바 */}
      {searchClicked ? (
        <div className="sticky top-0 z-[60] mx-auto border-b-[1px] border-gray-200">
          <div className="flex h-14 w-full items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem]">
            <div className="mr-4 flex h-10 w-full items-center rounded-md bg-gray-100 md:h-12">
              <div className="relative flex w-full items-center overflow-hidden rounded-md bg-gray-100 py-0.5">
                <input
                  ref={searchInputRef}
                  id="search-box"
                  className="mx-3 h-9 w-full bg-gray-100 text-sm text-gray-950 placeholder-gray-500 outline-none max-[340px]:mx-0 lg:h-11 lg:text-base"
                  placeholder="책 제목을 검색해주세요."
                  aria-label="search-box"
                  autoComplete="off"
                  name="search"
                  onChange={searchBoxHandleChange}
                  onKeyDown={fetchSearchPostCards}
                />
              </div>
            </div>
            <button
              type="button"
              className="appearance-none whitespace-nowrap border-0 bg-none p-0 font-Pretendard text-lg font-semibold leading-6 text-gray-950 md:text-xl"
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
          <div className="flex h-14 w-screen items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem] md:px-10">
            <img
              src={logo}
              alt="logo"
              className="w-[4.5rem] pb-1 hover:cursor-pointer md:w-20"
              onClick={moveToMainPageWithRefresh}
            />
            {/* 1024px 이상일 경우 검색바 나타남 */}
            <div className="hidden lg:ml-24 lg:flex lg:w-3/5">
              <div className="mr-4 flex h-10 w-full items-center rounded-md bg-gray-200 md:h-12">
                <div className="relative flex w-full items-center overflow-hidden rounded-md bg-gray-100 py-0.5">
                  <input
                    ref={searchInputRef}
                    id="search-box"
                    className="mx-3 h-9 w-full bg-gray-100 text-sm text-gray-950 placeholder-gray-500 outline-none max-[340px]:mx-0 lg:h-11 lg:text-base"
                    placeholder="책 제목을 검색해주세요."
                    aria-label="search-box"
                    autoComplete="off"
                    name="search"
                    onChange={searchBoxHandleChange}
                    onKeyDown={fetchSearchPostCards}
                  />
                </div>
              </div>
            </div>
            {/* 검색 및 햄버거 아이콘 (1024px 미만) */}
            <div className="flex lg:hidden">
              <img
                src={searchIcon}
                alt="검색"
                className="mr-4 hover:cursor-pointer md:w-7"
                onClick={handleSearchIconClick}
              />
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
                <span className="font-Pretendard text-sm">판매하기</span>
              </div>
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
                <span className="font-Pretendard text-sm">
                  {userStateValue.isLoggedIn ? '로그아웃' : '로그인'}
                </span>
              </div>
            </div>
          </div>
          {/* 메뉴 드롭다운 */}
          {menuOpen && (
            <div className="absolute flex h-36 w-screen flex-col bg-white md:h-48">
              <button
                className={`${currentPath === '/' || currentPath.startsWith('/detail') ? 'text-orange-500' : 'text-gray-950'} h-1/2 w-full py-3 active:bg-gray-200 md:text-lg`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  moveToMainPage();
                }}
              >
                중고서적 거래
              </button>
              <button
                className={`${currentPath === '/sell' ? 'text-orange-500' : 'text-gray-950'} h-1/2 w-full py-3 active:bg-gray-200 md:text-lg`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  moveToSellPage();
                }}
              >
                판매하기
              </button>
              <button
                className={`${currentPath === '/login' ? 'text-orange-500' : 'text-gray-950'} h-1/2 w-full py-3 active:bg-gray-200 md:text-lg`}
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
