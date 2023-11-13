import React from 'react';
import './Image.scss';

interface ImageProps {
  src: string;
  isRound: boolean;
}

const Image: React.FC<ImageProps> = ({ src, isRound }) => {
  const imageClasses = isRound ? 'image round' : 'image';

  return <img src={src} alt="Image" className={imageClasses} />;
};

export default Image;
