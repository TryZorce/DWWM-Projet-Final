// Header.tsx
import React from 'react';
import SearchBar from '../organisms/Searchbar';
import Image from 'next/image';
import './Header.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link href={'/'}>
            <Image
              src="/icons/Logo.png"
              alt="Logo Image"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="header-right">
          {/* Add the Footer icons here for desktop screens */}
          <Link href='/'>
            <Image
              src='/icons/House.png'
              alt='House Icon'
              width={32}
              height={32}
            />
          </Link>
          <Link href='/user/login'>
            <Image
              src='/icons/User.png'
              alt='User Icon'
              width={32}
              height={32}
            />
          </Link>
          <Link href='/cart'>
            <Image
              src='/icons/Cart.png'
              alt='Cart Icon'
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
