// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import './ArticleDetail.scss'; // Import your SCSS file

// Define the Article interface
interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

// ArticlePage component definition
const ArticlePage: React.FC<{ id: number }> = ({ id }) => {
  // State hooks for article data, loading state, and error message
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type as string

  // useEffect for fetching data when id changes
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          throw new Error("L'identifiant de l'article est manquant.");
        }

        const response = await fetch(`http://localhost:8000/api/articles/${id}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data: Article = await response.json();
        setArticle(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Ensure that 'error' is of type string
        } else {
          setError('Une erreur inconnue s\'est produite.');
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchArticle function
    fetchArticle();
  }, [id]);

  // Render loading state
  if (loading) {
    return <p className="loading-message">Chargement en cours...</p>;
  }

  // Render error state
  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }

  // Render when no article data is found
  if (!article) {
    return <p className="no-article-message">Aucun article trouvé.</p>;
  }

  // Render article data
  return (
    <div className="article-container">
      <h1>{article.name}</h1>
      <img src={`http://127.0.0.1:8000/images/${article.image}`} alt={article.name} className="article-image" />
      <p className="article-description">Description : {article.description}</p>
      <p className="article-price">Prix : {article.price} €</p>
      <p className="article-stock">Stock : {article.stock}</p>
    </div>
  );
};

// Export the ArticlePage component
export default ArticlePage;
