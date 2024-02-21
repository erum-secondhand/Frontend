/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import cancelIcon from '../assets/cancel.svg';
import '../theme.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  const moveToMainPageWithRefresh = () => {
    window.location.href = '/';
  };

  const moveToMainPage = () => {
    navigate('/');
  };

  const moveToSellPage = () => {
    navigate('/sell');
  };

  return (
    <>
      {/* 검색 바 */}
      {searchClicked ? (
        <div className="sticky top-0 z-50 border-b-[1px] border-gray-200">
          <div className="flex h-14 w-screen items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem]">
            <div className="mr-4 flex h-11 w-full items-center rounded-md bg-gray-100">
              <form className="relative w-full overflow-hidden rounded-md bg-gray-100">
                <label
                  htmlFor="search"
                  className="flex items-center bg-gray-100 py-0.5"
                >
                  <input
                    id="search-box"
                    className="mx-3 h-10 w-full bg-gray-100 text-sm text-gray-950 placeholder-gray-500 outline-none max-[340px]:mx-0 lg:h-12 lg:text-base"
                    placeholder="책 제목을 검색해주세요."
                    aria-label="search-box"
                    autoComplete="off"
                    name="search"
                  />
                </label>
              </form>
            </div>
            <button
              type="button"
              className="appearance-none whitespace-nowrap border-0 bg-none p-0 font-Pretendard text-lg font-semibold leading-6 text-gray-950"
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
                alt="searchIcon"
                className="mr-4 hover:cursor-pointer md:w-7"
                onClick={() => {
                  setSearchClicked(true);
                }}
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
            <div className="absolute flex h-24 w-screen flex-col bg-white">
              <button
                className={`${currentPath === '/' ? 'text-orange-500' : 'text-gray-950'} w-full py-3`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  moveToMainPage();
                }}
              >
                중고서적 거래
              </button>
              <button
                className={`${currentPath === '/sell' ? 'text-orange-500' : 'text-gray-950'} w-full py-3`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  moveToSellPage();
                }}
              >
                판매하기
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
