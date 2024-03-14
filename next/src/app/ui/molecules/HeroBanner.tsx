// HeroBanner.tsx
import React, { useState, useEffect } from 'react';
import './HeroBanner.scss'; 

interface HeroBannerProps {
  interval?: number; 
}

const HeroBanner: React.FC<HeroBannerProps> = ({ interval = 5000 }) => {
  const images = [
    '/img/HeroBanner/HeroBanner1.jpg ',
    '/img/HeroBanner/HeroBanner2.jpg',
    '/img/HeroBanner/HeroBanner3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className="hero-banner">
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default HeroBanner;
