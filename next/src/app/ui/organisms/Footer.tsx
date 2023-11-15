import React from 'react';
import Image from 'next/image';
import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer_wrapper'>
            <div className='footer_image'>
                <Image src='/icons/House.png' alt='House Icon' width={32} height={32} />
                <Image src='/icons/User.png' alt='User Icon' width={32} height={32} />
                <Image src='/icons/Cart.png' alt='Cart Icon' width={32} height={32} />
            </div>
        </div>
    );
};

export default Footer;
