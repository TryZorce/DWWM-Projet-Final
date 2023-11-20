import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CategoryList.scss';

const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
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
    <div className="list-category-container">
      <p>Catégorie :</p>
      <div className="list-category">
        {categoryData.map((category) => (
          <div key={category.id} className="category-item">
            <Link href={`/category/${category.id}`}>
              <div className='list-center'>
                <img src={`${category.image}`} alt={category.name} className="image" />
                <p>{category.categoryname}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
