"use client"
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './style.scss'
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('token');

        if (token) {
          // Décoder le token pour obtenir l'adresse e-mail
          const decodedToken: any = jwtDecode(token);
          const userEmail = decodedToken.username;

          // Utiliser l'adresse e-mail pour récupérer les informations de l'utilisateur
          const response = await fetch(`http://localhost:8000/api/users?page=1&email=${userEmail}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data['hydra:member']); // Accéder à la liste d'utilisateurs
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

  if (loading) {
    return <p className="loading-message">Chargement...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user || user.length === 0) {
    return <p className="error-message">Aucun utilisateur trouvé.</p>;
  }

  const firstUser = user[0];

  return (
    <>
    <Header/>
    <div className="user-profile-container">
      <h1>Profil de l'utilisateur</h1>
      <p>Nom: {firstUser.name}</p>
      <p>Email: {firstUser.email}</p>
      <p>Role: {firstUser.roles[0]}</p>
      <p>Téléphone: {firstUser.phone}</p>
    </div>
    <Footer/>
    </>
  );
};

export default UserProfile;