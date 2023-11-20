// Import necessary dependencies
import React, { useState, useEffect } from 'react';

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
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchArticle function
    fetchArticle();
  }, [id]);

  // Render loading state
  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  // Render error state
  if (error) {
    return <p>Erreur : {error}</p>;
  }

  // Render when no article data is found
  if (!article) {
    return <p>Aucun article trouvé.</p>;
  }

  // Render article data
  return (
    <div>
      <h1>{article.name}</h1>
      <img src={article.image} alt={article.name} />
      <p>Description : {article.description}</p>
      <p>Prix : {article.price} $</p>
      <p>Stock : {article.stock}</p>
    </div>
  );
};

// Export the ArticlePage component
export default ArticlePage;
