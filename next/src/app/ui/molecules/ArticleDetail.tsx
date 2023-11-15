import React, { useState, useEffect } from 'react';

const CartsPage = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/carts/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setCarts(data['hydra:member']);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des articles : ', error.message);
      }
    };

    fetchCarts();
  }, []);

  console.log(carts);

  return (
    <div>
      <h1>Votre panier</h1>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <p>{cart.name}</p>
            <p>{cart.description}</p>
            <img src={`${cart.image}`} alt={cart.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartsPage;
