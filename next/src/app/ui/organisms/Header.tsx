"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContext } from '@/AppContext';
import "./Header.scss"

const Header = () => {
  const { authenticatedUser } = useContext(AppContext);

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
          <Link href='/'>
            <Image
              src='/icons/House.png'
              alt='House Icon'
              width={32}
              height={32}
            />
          </Link>
          {authenticatedUser ? (
            <Link href='/user'>
              <Image
                src='/icons/User.png'
                alt='User Icon'
                width={32}
                height={32}
              />
            </Link>
          ) : (
            <Link href='/user/login'>
              <Image
                src='/icons/User.png'
                alt='User Icon'
                width={32}
                height={32}
              />
            </Link>
          )}
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
