/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import cancelIcon from '../assets/cancel.svg';
import '../theme.css';

function NavBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const moveToMainPage = () => {
    window.location.href = '/';
  };

  const moveToSellPage = () => {
    navigate('/sell');
  };

  return (
    <>
      <div className="sticky top-0 z-50 border-b-[1px] border-gray-200">
        <div className="flex h-14 w-screen items-center justify-between bg-white px-5 md:h-16 md:max-w-[120rem]">
          <img
            src={logo}
            alt="logo"
            className="w-[4.5rem] pb-1 hover:cursor-pointer md:w-20"
            onClick={moveToMainPage}
          />
          <div className="flex">
            <img
              src={searchIcon}
              alt="searchIcon"
              className="mr-4 hover:cursor-pointer md:w-7"
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
        {/* 메뉴 드롭다운 */}
        {menuOpen && (
          <div className="absolute flex h-24 w-screen flex-col bg-white">
            <button className="w-full py-3" type="button">
              중고서적 거래
            </button>
            <button
              className="w-full py-3"
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
      {/* menuOpen이 true일 때 배경색상 어둡게 만들기 */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(23,23,26,0.5)]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

export default NavBar;
