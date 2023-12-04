import React from 'react';
import './invoice.scss';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';

const Invoice: React.FC = () => {
  return (
    <>
    <Header />
    <div className="invoice-container">
    <h1>Confirmation de Commande</h1>
    <p>Merci pour votre commande !</p>
    <img src="/img/confirmation_commande.png" alt="Confirmation de commande"/>
    </div>
    <Footer />
    </>
  );
};

export default Invoice;