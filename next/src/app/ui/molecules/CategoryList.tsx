import React, { useState, useEffect } from 'react';
import Image from '../atoms/Image';
import './CategoryList.scss';

const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setCategoryData(data['hydra:member']);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="list-category">
      <p>Catégorie :</p>
      {categoryData.map((category) => (
        <div key={category.id} className="category-item">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Handle click if needed
            }}
          >
             <img src={`${category.image}`} alt={category.name} />
          </a>
          <p>{category.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
