import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';
import hamburgerIcon from '../assets/hamburger.svg';

function NavBar() {
  return (
    <div className="sticky top-0 z-50 border-b-[1px] border-gray-200">
      <div className="flex h-14 w-screen items-center justify-between bg-white px-5">
        <img
          src={logo}
          alt="logo"
          className="w-[4.5rem] pb-1 hover:cursor-pointer"
        />
        <div className="flex">
          <img src={searchIcon} alt="searchIcon" className="mr-4" />
          <img src={hamburgerIcon} alt="menu" className="" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
