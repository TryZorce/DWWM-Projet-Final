import React, { useState, useEffect } from 'react';
import './ArticleDetail.scss';

interface Article {
  quantity: number;
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ArticlePage: React.FC<{ id: number }> = ({ id }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Article[]>([]);

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
          setError(err.message);
        } else {
          setError("Une erreur inconnue s'est produite.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    if (article) {
      const updatedCart = [...cart];
      const existingItem = updatedCart.find((item) => item.id === article.id);

      if (existingItem) {
        // Si l'article est déjà dans le panier, mettez à jour la quantité
        existingItem.quantity += quantity;
      } else {
        // Sinon, ajoutez l'article avec la quantité
        updatedCart.push({ ...article, quantity });
      }

      // Mettez à jour l'état du panier
      setCart(updatedCart);

      // Ajoutez votre logique pour envoyer le panier au serveur Symfony
      // Vous pouvez utiliser une API fetch pour cela
      fetch('http://localhost:8000/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCart),
      });

      console.log(`Article added to the cart: ${article.name}, Quantity: ${quantity}`);
    }
  };

  if (loading) {
    return <p className="loading-message">Chargement en cours...</p>;
  }

  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }

  if (!article) {
    return <p className="no-article-message">Aucun article trouvé.</p>;
  }

  return (
    <div className="article-container">
      <img src={`http://127.0.0.1:8000/images/${article.image}`} alt={article.name} className="article-image" />
      <h1 className='article-name'>{article.name}</h1>
      <p className="article-description">Description : {article.description}</p>
      <div className='article-container2'>
        <p className="article-price">Prix : {article.price} €</p>
        <p className="article-stock">Stock : {article.stock}</p>
      </div>
      <p>
        Quantité :
        <select value={quantity} onChange={handleQuantityChange}>
          {Array.from({ length: article.stock }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </p>

      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  );
};

export default ArticlePage;