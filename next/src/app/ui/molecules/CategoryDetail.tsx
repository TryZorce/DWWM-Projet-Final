// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './CategoryDetail.scss'; // Import your SCSS file

// Define the Article interface
interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Define the Category interface
interface Category {
  categoryId: number;
  categoryname: string;
  image: string;
  articles: string[]; // Assuming articles are represented as URLs
}

const CategoryPage: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryPages = async () => {
      try {
        if (!categoryId) {
          throw new Error("L'identifiant de la catégorie est manquant.");
        }

        const response = await fetch(`http://localhost:8000/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data: Category = await response.json();
        setCategoryInfo(data);

        if (data.articles && Array.isArray(data.articles)) {
          const articlesData = await Promise.all<Article>(
            data.articles.map(async (articleUrl: string) => {
              const fullArticleUrl = `http://localhost:8000${articleUrl}`;

              try {
                const articleResponse = await fetch(fullArticleUrl);

                if (!articleResponse.ok) {
                  throw new Error(`Erreur HTTP pour l'article : ${articleResponse.status}`);
                }

                const articleData = await articleResponse.json();
                if (typeof articleData === 'object' && 'id' in articleData) {
                  return articleData as Article;
                } else {
                  throw new Error('Format de données d\'article invalide.');
                }
              } catch (articleError) {
                if (articleError instanceof Error) {
                  throw new Error(`Erreur lors de la récupération de l'article : ${articleError.message}`);
                } else {
                  throw new Error('Erreur inconnue lors de la récupération de l\'article.');
                }
              }
            })
          );

          setArticles(articlesData);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erreur inconnue.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPages();
  }, [categoryId]);

  if (loading) {
    return <p className="loading-message">Chargement en cours...</p>;
  }

  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }

  if (!categoryInfo) {
    return <p className="no-info-message">Aucune information trouvée pour cette catégorie.</p>;
  }

  return (
    <div className="category-container">
      <h3>Liste d'articles</h3>
      <div className="category-info">
        <h2>{categoryInfo.categoryname}</h2>
        <img src={categoryInfo.image} alt={categoryInfo.categoryname} />
      </div>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.id} className="article-item">
            <h4>{article.name}</h4>
            <img src={`http://127.0.0.1:8000/images/${article.image}`} alt={article.name} className="article-image" />
            <p className="article-description">Description : {article.description}</p>
            <p className="article-price">Prix : {article.price.toFixed(2)} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
