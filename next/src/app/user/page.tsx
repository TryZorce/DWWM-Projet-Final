"use client"
import Footer from '@/ui/organisms/Footer';
import Header from '@/ui/organisms/Header';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      // Stocker le token dans le local storage
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (

    <div>
      <Header />
      <input type="text" name="email" placeholder="E-mail" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleInputChange} />
      <button onClick={handleLogin}>Se connecter</button>
      <Link href={"/user/register"}>S'enregistrer</Link>
      <Footer />
    </div>
  );
};

export default Login;