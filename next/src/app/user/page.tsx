"use client"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import './style.scss';
import Link from 'next/link';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const decodedToken: any = jwtDecode(token);
          const userEmail = decodedToken.username;

          const response = await fetch(`http://localhost:8000/api/users?page=1&email=${userEmail}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data['hydra:member']);
            setLoading(false);
          } else {
            throw new Error(`Erreur réseau: ${response.status} - ${response.statusText}`);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
        setError('Erreur lors de la récupération des informations de l\'utilisateur');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user || user.length === 0) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  const firstUser = user[0];

  return (
    <div className='user-banner'>
      <div className='user-profile-container'>
        <Header />
        <div className='container'>
          <h1>Profil de l'utilisateur</h1>
          <p>Nom: {firstUser.name}</p>
          <p>Email: {firstUser.email}</p>
          <Link className='user-commande' href='/mes-commandes'>Mes Commandes</Link>
        </div>
        <div className='logout-button-container'>
          <button className='logout-button' onClick={handleClearLocalStorage}>
            Ce déconnecter
          </button>
        </div>
        <Footer />
      </div>
    </div>

  );
};

export default UserProfile;
