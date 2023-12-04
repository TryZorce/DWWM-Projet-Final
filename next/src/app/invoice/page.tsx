import React from 'react';
import './invoice.scss';

const Invoice: React.FC = () => {
  return (
    <div className="invoice-container">
      <h1>Confirmation de Commande</h1>
      <p>Merci pour votre commande !</p>
    </div>
  );
};

export default Invoice;