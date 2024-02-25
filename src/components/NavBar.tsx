/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, KeyboardEvent, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import cancelIcon from '../assets/cancel.svg';
import '../theme.css';
import axios from 'axios';
import { FetchPostCards } from '../dataType';
import { searchPostCardsState } from '../RecoilState';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const setSearchPostCards = useSetRecoilState(searchPostCardsState);

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

  const moveToMainPageWithRefresh = () => {
    window.location.href = '/';
  };

  const moveToMainPage = () => {
    navigate('/');
  };

  const moveToSellPage = () => {
    navigate('/sell');
  };

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
        const response = await axios.get<FetchPostCards[]>(
          'http://localhost:8080/books/search',
          {
            params: {
              title: searchText,
            },
          },
        );
        console.log(response.data);
        setSearchPostCards(response.data);
      } catch (e) {
        console.log(e);
      }
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
          <div className="flex h-14 w-screen items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem]">
            <img
              src={logo}
              alt="logo"
              className="w-[4.5rem] pb-1 hover:cursor-pointer md:w-20"
              onClick={moveToMainPageWithRefresh}
            />
            <div className="flex">
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
          </div>
          <div
            id="progress-bar"
            className="absolute bottom-0 left-0 h-[2px] w-full"
          />
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
                  setMenuOpen(false);
                  moveToLoginPage();
                }}
              >
                로그인
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
