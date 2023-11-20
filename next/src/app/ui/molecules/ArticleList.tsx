import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './ArticleList.scss'

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setArticles(data['hydra:member']);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="article-list-container">
      <p>Liste des Articles</p>
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <Link href={`/article/${article.id}`}>
            <div className='list-center'>
              <p>{article.name}</p>
              <img src={`${article.image}`} alt={article.name} className="image" />
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
