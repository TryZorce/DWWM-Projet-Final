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

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Article[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  const calculateTotal = (item: Article) => {
    return item.price * item.quantity;
  };

  const calculateGrandTotal = () => {
    const grandTotal = cart.reduce((total, item) => total + calculateTotal(item), 0);
    return grandTotal.toFixed(2); // Limiter à deux chiffres après la virgule
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
        </div>
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div>
  );
};

export default CartPage;
