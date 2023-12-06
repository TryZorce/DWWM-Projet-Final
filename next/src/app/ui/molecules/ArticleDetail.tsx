import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../AppContext'; // Assurez-vous d'avoir le bon chemin vers votre AppContext
import Link from 'next/link';
import "./ArticleDetail.scss"

interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ArticlePage: React.FC<{ id: number }> = ({ id }) => {
  const { authenticatedUser } = useContext(AppContext);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

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
    if (article && article.stock > 0 && quantity > 0) {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = updatedCart.findIndex((item: Article) => item.id === article.id);

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.push({ ...article, quantity });
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      console.log(`Article added to the cart: ${article.name}, Quantity: ${quantity}`);
    } else if (quantity <= 0) {
      console.error("La quantité doit être supérieure à zéro.");
    } else {
      console.error("Article is null or out of stock. Unable to add to cart.");
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
      <div className='image-wrapper'>
      <img
        src={`http://127.0.0.1:8000/images/${article.image}`}
        alt={article.name}
        className="article-image"
      />
      </div>
      <div className='article-wrapper'>
      <h1 className='article-name'>{article.name}</h1>
      <p className="article-description">Description :</p>
      <p className="article-description">{article.description}</p>
      <div className='article-container2'>
        <p className="article-price">Prix : {article.price} €</p>
        <p className="article-stock">Stock : {article.stock === 0 ? 'Hors Stock' : article.stock}</p>
      {article.stock > 0 ? (
        <p>
          Quantité :
          <select value={quantity} onChange={handleQuantityChange} className="quantity-select">
            {Array.from({ length: article.stock }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </p>
      ) : null}
      </div>

      {authenticatedUser && article.stock > 0 ? (
  <button onClick={addToCart} className="add-to-cart-button">
    Ajouter au panier
  </button>
) : (
  !authenticatedUser && (
    <Link href="/user/login">
      <button className="login-button">Se connecter</button>
    </Link>
  )
)}
      </div>
    </div>
  );
};

export default ArticlePage;
