"use client"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import Link from 'next/link';
import "./styles.scss"

const MesCommandes: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userEmail = decodedToken.username;
          const userResponse = await fetch(`http://127.0.0.1:8000/api/users?page=1&email=${userEmail}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error(`Error fetching user ID: ${userResponse.status} - ${userResponse.statusText}`);
          }

          const userData = await userResponse.json();
          const userId = userData['hydra:member'][0]?.id;

          const ordersResponse = await fetch(`http://127.0.0.1:8000/api/carts?page=1&user=${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!ordersResponse.ok) {
            throw new Error(`Error fetching user orders: ${ordersResponse.status} - ${ordersResponse.statusText}`);
          }

          const ordersData = await ordersResponse.json();
          setOrders(ordersData['hydra:member']);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setError('Error fetching user orders');
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className='commande-container'>
      <Header />
      <div className='container'>
        <h1>Mes Commandes</h1>
        <ul>
          {orders.map((order: any) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              {/* Ajoutez d'autres détails de la commande si nécessaire */}
            </li>
          ))}
        </ul>
        <Link href='/user-profile'>Retour au profil</Link>
      </div>
      <Footer />
    </div>
  );
};

export default MesCommandes;
