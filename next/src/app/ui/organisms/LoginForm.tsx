"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginForm.scss';

interface LoginUser {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginUser, setLoginUser] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!loginUser.email || !loginUser.password) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
      });

      if (response.ok) {
        // Handle successful login, e.g., redirect to another page
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      setError('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={loginUser.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={loginUser.password} onChange={handleChange} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
