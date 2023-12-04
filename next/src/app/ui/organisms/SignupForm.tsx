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
  const initialUser: User = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const [user, setUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (name === 'password' && !passwordRegex.test(value)) {
      setError('Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, et un caractère spécial.');
    } else if (name === 'phone' && !/^\d{10}$/.test(value)) {
      setError('Le numéro de téléphone doit contenir exactement 10 chiffres.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccess(true);
        setUser(initialUser);
        setError(null);
        localStorage.setItem('token', responseData.token);
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

  const validateForm = () => {
    const { name, email, password, phone } = user;

    if (!name || !email || !password || !phone) {
      setError('Veuillez remplir tous les champs.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError('Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, et un caractère spécial.');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Le numéro de téléphone doit contenir exactement 10 chiffres.');
      return false;
    }

    setError(null);
    return true;
  };

  return (
    <div className='background-login'>
      <div className='register-form'>
        <h1 className='register-title'>Inscription :</h1>
        {error && <p className='error-message'>{error}</p>}
        {success && <p className='success-message'>Inscription réussie !</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={user.password} onChange={handleChange} />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'En cours...' : 'S\'inscrire'}
          </button>
        </form>
        <div className='auth-links-container'>
          <Link href="/user/login">
            <p className="Link">Se connecter</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
