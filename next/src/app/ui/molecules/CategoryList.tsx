// ListCategory.tsx
import React from 'react';
import Image from '../atoms/Image';
import ImageNext  from 'next/image';
import './CategoryList.scss' // Assurez-vous d'importer correctement le composant Image

const categoryData = [
  {
    id: 1,
    imageSrc: '/img/Category1.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 1',
  },
  {
    id: 2,
    imageSrc: '/img/Category2.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 2',
  },
  {
    id: 3,
    imageSrc: '/img/Category3.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 3',
  },
  {
    id: 4,
    imageSrc: '/img/Category4.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 4',
  },
  {
    id: 5,
    imageSrc: '/img/Category5.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 5',
  },
  {
    id: 6,
    imageSrc: '/img/Category6.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 6',
  },
  {
    id: 7,
    imageSrc: '/img/Category7.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 7',
  },
  {
    id: 8,
    imageSrc: '/img/Autre.png', // Ajoutez le chemin vers l'image
    text: 'Catégorie 8',
  },
];

const CategoryList = () => {
  //const handleClick = (category) => {
    //console.log(`Image cliquée pour la catégorie : ${category.text}`);
//  };

  return (
    <div className="list-category">
      <p>Catégorie :</p>
      {categoryData.map((category) => (
        <div key={category.id} className="category-item">
          <a
            href="#"
            onClick={(e) => {
  //            e.preventDefault();
    //          handleClick(category);
            }}
          >
            <Image src={category.imageSrc} isRound={false} />
          </a>
          <p>{category.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;