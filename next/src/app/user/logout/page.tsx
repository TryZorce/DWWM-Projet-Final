"use client"
import Footer from '@/ui/organisms/Footer';
import Header from '@/ui/organisms/Header';
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Header />
      <button onClick={handleLogout}>Se déconnecter</button>
      <Footer/>
    </div>
  );
};

export default Logout;