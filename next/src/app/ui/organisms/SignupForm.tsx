import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SignupForm.scss';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignupForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user.name || !user.email || !user.password || !user.phone) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccess(true);
        setUser({
          name: '',
          email: '',
          password: '',
          phone: '',
        });
        setError(null);

        // Enregistre le token dans le local storage
        localStorage.setItem('token', responseData.token)
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Inscription réussie !</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Identifiant : *
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </label>
        <label>
          Email: *
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <label>
          Téléphone:
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
        </label>
        <label>
          Mot de passe: *
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
