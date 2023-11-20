"use client"
import Footer from '@/ui/organisms/Footer';
import Header from '@/ui/organisms/Header';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Email
        <input type="text" name="email" placeholder="E-mail" onChange={handleInputChange} />
        </label>
        <label>
          Password
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleInputChange} />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      <Link href="/user/register">S'enregistrer</Link>
      <Footer />
    </div>
  );
};

export default Login;