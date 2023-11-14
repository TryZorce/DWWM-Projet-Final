import React, { useState, useEffect } from 'react';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles',options);
        const data = await response.json();
        setArticles(data['hydra:member']);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles : ', error);
      }
    };

    fetchArticles();
  }, []);
console.log(articles);

  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <p>{article.name}</p>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
