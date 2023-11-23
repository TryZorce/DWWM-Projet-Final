// Footer.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='grid'>
        <div className='inline-flex group'>
          <Link href='/' passHref>
           
              <Image src='/icons/House.png' alt='House Icon' width={32} height={32} />
              <span className='sr-only'>Home</span>
           
          </Link>
        </div>

        <div className='inline-flex group'>
          <Link href='/user' passHref>
           
              <Image src='/icons/User.png' alt='User Icon' width={32} height={32} />
              <span className='sr-only'>User</span>
           
          </Link>
        </div>

        <div className='inline-flex group'>
          <Link href='/cart' passHref>
           
              <Image src='/icons/Cart.png' alt='Cart Icon' width={32} height={32} />
              <span className='sr-only'>Cart</span>
           
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
