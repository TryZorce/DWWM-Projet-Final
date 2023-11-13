// Header.tsx
import React from 'react';
import SearchBar from '../organisms/Searchbar';
import Image from 'next/image';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Image
            src="/icons/Logo.png"
            alt="Logo Image"
            width={100}
            height={100}
          />
        </div>
        <div className="header-right">
          <SearchBar onSearch={() => {}} />
        </div>
      </div>
    </header>
  );
};

export default Header;
