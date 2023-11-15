import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.scss';

const Footer = () => {
    return (
        <div className='footer_wrapper'>
            <div className='footer_image'>
                <Link href='/'>
                   
                        <Image src='/icons/House.png' alt='House Icon' width={32} height={32} />
                    
                </Link>
                <Link href='/user'>
                    
                        <Image src='/icons/User.png' alt='User Icon' width={32} height={32} />
                    
                </Link>
                <Link href='/cart'>
                    
                        <Image src='/icons/Cart.png' alt='Cart Icon' width={32} height={32} />
                    
                </Link>
            </div>
        </div>
    );
};

export default Footer;
