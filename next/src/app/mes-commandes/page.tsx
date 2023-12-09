"use client"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import Link from 'next/link';
import "./styles.scss";

const MesCommandes: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (typeof localStorage === 'undefined') {
          throw new Error('LocalStorage is not available');
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is not available');
        }

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

        // Fetch and store articles associated with the cart
        const articlesPromises = ordersData['hydra:member'].map(async (order: any) => {
          const articlesResponse = await Promise.all(order.articles.map((articleLink: string) =>
            fetch(`http://127.0.0.1:8000${articleLink}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
          ));

          const articlesData = await Promise.all(articlesResponse.map(response => response.json()));
          return articlesData;
        });

        const fetchedArticles = await Promise.all(articlesPromises);
        // Flatten the array of arrays into a single array of articles
        const flattenedArticles = fetchedArticles.flat();
        setArticles(flattenedArticles);
      } catch (error) {
        console.error('Error fetching user orders:', error.message);
        setError('Error fetching user orders');
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return <p className="loading-error">Loading...</p>;
  }

  if (error) {
    return <p className="loading-error">{error}</p>;
  }

  return (
    <>
      <Header />
      <div className='commande-container'>
        <div className='container'>
          <div className='title'>Mes Commandes</div>

          {orders.map((order: any, index: number) => (
            <div key={order.id} className='order-container'>
              <div className='order-info'>Commande N°{order.id}</div>

              <ul className='articles-list'>
                {order.articles.map((_articleLink: string, articleIndex: number) => {
                  const currentArticle = articles[index] && articles[index][articleIndex];

                  return (
                    <li key={articleIndex} className='article-item'>
                      <div className='article-info'>
                        <p>{currentArticle?.name}</p>
                        <p>{currentArticle?.price}</p>
                        <p>{currentArticle?.image}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}


          <Link href='/user'>Retour au profil</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MesCommandes;
