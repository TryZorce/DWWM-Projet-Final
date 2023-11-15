import React, { useState } from 'react';
import './SignupForm.scss'
const InscriptionForm = () => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Gérer la réponse du backend
      } else {
        console.error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom:
        <input type="text" name="nom" value={user.nom} onChange={handleChange} />
      </label>
      <label>
        Prénom:
        <input type="text" name="prenom" value={user.prenom} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </label>
      <label>
        Mot de passe:
        <input type="password" name="motDePasse" value={user.motDePasse} onChange={handleChange} />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default InscriptionForm;
