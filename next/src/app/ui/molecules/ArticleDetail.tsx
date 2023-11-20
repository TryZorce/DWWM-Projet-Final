/*import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/article/${id}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!article) {
    return <p>Aucun article trouvé.</p>;
  }

  return (
    <div>
      <h1>{article.name}</h1>
      <img src={`${article.image}`} alt={article.name} />
      <p>Description: {article.description}</p>
      <p>Prix: {article.price} $</p>
      <p>Stock: {article.stock}</p>
    </div>
  );
};

export default ArticlePage;
*/