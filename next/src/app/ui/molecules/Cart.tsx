import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Cart.scss';

interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Article[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [userId, setUserId] = useState<number | null>(null);
  const [isUserIdLoading, setIsUserIdLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { username?: string };
        if (decodedToken.username) {
          fetchUserId(decodedToken.username);
        } else {
          console.error('Champ "username" manquant dans le token.');
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }, []);

  const fetchUserId = async (username: string) => {
    try {
      setIsUserIdLoading(true);

      const response = await fetch(`http://127.0.0.1:8000/api/users?page=1&email=${username}`);

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Erreur lors de la récupération de l'ID de l'utilisateur : ${response.status} ${response.statusText}. Réponse du serveur : ${responseBody}`);
      }

      const userData = await response.json();

      // Accédez au premier élément du tableau hydra:member
      const firstUser = userData['hydra:member'][0];

      if (firstUser && typeof firstUser.id === 'number') {
        setUserId(firstUser.id);
      } else {
        console.error('ID d\'utilisateur non valide dans la réponse :', firstUser?.id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Une erreur inattendue s\'est produite.');
      }
    } finally {
      setIsUserIdLoading(false);
    }
  };

  const calculateTotal = (item: Article) => {
    return item.price * item.quantity;
  };

  const calculateGrandTotal = () => {
    const grandTotal = cart.reduce((total, item) => total + calculateTotal(item), 0);
    return grandTotal.toFixed(2);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(0, newQuantity);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCommander = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: { username?: string } = jwtDecode(token);
        if (decodedToken.username) {
          await fetchUserId(decodedToken.username);

          // Extract article IDs from the local storage
          const articleIds = cart.map((item) => `/api/articles/${item.id}`);
          
          const response = await fetch('http://127.0.0.1:8000/api/carts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify({
              quantity: 0,
              user: `/api/users/${userId}`,
              articles: articleIds,
            }),
          });

          if (response.ok) {
            console.log('Commande traitée avec succès !');
            setCart([]);
            localStorage.removeItem('cart');
            window.location.href = '/invoice';
          } else {
            console.error('Erreur lors de la commande :', response.status, response.statusText);
          }
        } else {
          console.error('Champ "username" manquant dans le token.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la commande :', error);
    }
  };

  const renderCartItem = (item: Article, index: number) => (
    <li key={item.id} className="cart-item">
      <img
        src={`http://127.0.0.1:8000/images/${item.image}`}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <p>{item.name}</p>
        <p>
          Quantity:{' '}
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
            className="quantity-input"
          />
        </p>
        <p>Price: {item.price} €</p>
        <p>Total: {calculateTotal(item).toFixed(2)} €</p>
        <button onClick={() => handleRemoveItem(index)} className="remove-button">
          Supprimer
        </button>
      </div>
    </li>
  );

  return (
    <div className="cart-container">
      <h1>Panier</h1>
      {cart.length > 0 ? (
        <div>
          <ul>{cart.map(renderCartItem)}</ul>
          <p className="grand-total">Total du panier : {calculateGrandTotal()} €</p>
          <button onClick={handleCommander} className="commander-button">
            Commander
          </button>
        </div>
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div>
  );
};

export default CartPage;
