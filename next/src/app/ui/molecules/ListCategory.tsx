// ListCategory.tsx
import React from 'react';
import Image from '../atoms/Image'; // Assurez-vous d'importer correctement le composant Image

const categoryData = [
  {
    id: 1,
    imageSrc: '/images/category1.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 1',
  },
  {
    id: 2,
    imageSrc: '/images/category2.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 2',
  },
  {
    id: 3,
    imageSrc: '/images/category3.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 3',
  },
  {
    id: 4,
    imageSrc: '/images/category4.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 4',
  },
  {
    id: 5,
    imageSrc: '/images/category5.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 5',
  },
  {
    id: 6,
    imageSrc: '/images/category6.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 6',
  },
  {
    id: 7,
    imageSrc: '/images/category7.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 7',
  },
  {
    id: 8,
    imageSrc: '/images/category8.jpg', // Ajoutez le chemin vers l'image
    text: 'Catégorie 8',
  },
];

const ListCategory = () => {
  return (
    <div className="list-category">
      {categoryData.map((category) => (
        <div key={category.id} className="category-item">
          <Image src={category.imageSrc} isRound={false}/>
          <p>{category.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ListCategory;
