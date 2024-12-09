import {NavLink} from '@remix-run/react';
import type {HeaderProps} from './Header.types';
import SearchIcon from '~/assets/svgs/search.svg';
import MenIcon from '~/assets/svgs/men.svg';
import CartIcon from '~/assets/svgs/cart.svg';
import UserIcon from '~/assets/svgs/user.svg';

const Header = ({header, onCartToggle}: HeaderProps) => {
  const {menu, shop} = header ?? {};
  return (
    <div className="relative">
      <header className="absolute z-10 flex flex-row justify-between bg-white p-4 rounded-lg max-w-screen mt-5 left-10 right-10">
        <NavLink
          className="font-bold text-xl flex items-center"
          to={shop?.primaryDomain.url ?? '/'}
        >
          {shop?.name}
        </NavLink>
        <div className="flex flex-row gap-x-10 justify-center items-center">
          <button>
            <img src={SearchIcon} alt="Search Icon" />
          </button>
          {menu?.items.map((item) => (
            <NavLink className="font-normal" key={item.id} to={item.url ?? ''}>
              {item.title}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-row justify-between gap-7 items-center">
          <div className="flex flex-row gap-1">
            <button className="flex flex-row justify-center items-center bg-gray-200 rounded-lg px-6 py-3.5 gap-x-2.5">
              <span>Men</span>
              <div className="flex items-center justify-center rounded-full bg-white w-6 h-6">
                <img src={MenIcon} alt="Men Icon" />
              </div>
            </button>
            <NavLink
              className="bg-black text-white rounded-lg px-6 py-3.5"
              to="/quiz"
            >
              Take The Quiz
            </NavLink>
          </div>
          <div className="flex flex-row gap-5">
            <button>
              <img src={UserIcon} alt="User Icon" />
            </button>
            <button onClick={onCartToggle}>
              <img src={CartIcon} alt="Cart Icon" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
