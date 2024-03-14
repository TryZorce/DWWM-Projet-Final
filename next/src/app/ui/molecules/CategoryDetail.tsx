import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CategoryDetail.scss';

interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Category {
  categoryId: number;
  categoryname: string;
  image: string;
  articles: string[];
}

const CategoryPage: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryPage = async () => {
      try {
        if (!categoryId) {
          throw new Error("L'identifiant de la catégorie est manquant.");
        }

        const categoryResponse = await fetch(`http://localhost:8000/api/categories/${categoryId}`);
        if (!categoryResponse.ok) {
          throw new Error(`Erreur HTTP : ${categoryResponse.status}`);
        }
        const categoryData: Category = await categoryResponse.json();
        setCategoryInfo(categoryData);

        if (categoryData.articles && Array.isArray(categoryData.articles)) {
          const articlePromises = categoryData.articles.map(async (articleUrl: string) => {
            try {
              const fullArticleUrl = `http://localhost:8000${articleUrl}`;
              const articleResponse = await fetch(fullArticleUrl);

              if (!articleResponse.ok) {
                throw new Error(`Erreur HTTP pour l'article : ${articleResponse.status}`);
              }

              const articleData: Article = await articleResponse.json();
              return articleData;
            } catch (articleError) {
              throw new Error(`Erreur lors de la récupération de l'article : ${articleError.message}`);
            }
          });

          const articlesData = await Promise.all(articlePromises);
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

    fetchCategoryPage();
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
      <h2>Liste d'articles pour {categoryInfo.categoryname}</h2>
      <div className="category-info">
        <h2>{categoryInfo.categoryname}</h2>
        <img src={`http://localhost:8000/images/${categoryInfo.image}`} alt={categoryInfo.categoryname} className='category-image'/>
      </div>
      <div className="article-list">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id}>
            <div className="article-item">
              <div className='list-center'>
                <div className='article-image-container'>
                  <img src={`http://localhost:8000/images/${article.image}`} alt={article.name} className="article-image" />
                </div>
                <p className='article-name'>{article.name}</p>
                <p className="article-price">Prix : {article.price.toFixed(2)} €</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
