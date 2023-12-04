import React, { useState } from 'react';
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

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = (props) => {
  const [cart, setCart] = useState<Article[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  const calculateTotal = (item: Article) => {
    return item.price * item.quantity;
  };

  const calculateGrandTotal = () => {
    const grandTotal = cart.reduce((total, item) => total + calculateTotal(item), 0);
    return grandTotal.toFixed(2);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    // Assurez-vous que la nouvelle quantité est au moins égale à zéro
    const validQuantity = Math.max(0, newQuantity);

    const updatedCart = [...cart];
    updatedCart[index].quantity = validQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCommander = () => {
    setCart([]);
    localStorage.removeItem('cart');
    console.log('Commande traitée avec succès !');

    window.location.href = '/invoice';
  };

  return (
    <div className="cart-container">
      <h1>Panier</h1>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item, index) => (
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
                </div>
              </li>
            ))}
          </ul>
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
