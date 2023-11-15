import React, { useState, useEffect } from 'react';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setArticles(data['hydra:member']);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des articles : ', error.message);
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
            <img src={`${article.image}`} alt={article.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
