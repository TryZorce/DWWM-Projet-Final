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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (name === 'email' && !emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Veuillez entrer une adresse email valide.' }));
    } else if (name === 'password' && !passwordRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, et un caractère spécial.',
      }));
    } else if (name === 'phone' && !/^\d{10}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Le numéro de téléphone doit contenir 10 chiffres.' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || !acceptedTerms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        acceptedTerms: !acceptedTerms ? 'Veuillez accepter les conditions générales d\'utilisation.' : '',
      }));
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
        setErrors({});
        localStorage.setItem('token', responseData.token);
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || 'Erreur lors de l\'inscription' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      setErrors({ general: 'Erreur lors de l\'inscription' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const { name, email, password, phone } = user;
    const newErrors: Record<string, string> = {};

    if (!name) {
      newErrors.name = 'Veuillez entrer votre nom.';
    }

    if (!email) {
      newErrors.email = 'Veuillez entrer votre adresse email.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide.';
    }

    if (!password) {
      newErrors.password = 'Veuillez entrer votre mot de passe.';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, et un caractère spécial.';
    }

    if (!phone) {
      newErrors.phone = 'Veuillez entrer votre numéro de téléphone.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Le numéro de téléphone doit contenir exactement 10 chiffres.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='background-login'>
      <div className='register-form'>
        <h1 className='register-title'>Inscription :</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nom & Prénom : 
            <input type="text" name="name" value={user.name} onChange={handleChange} />
            {errors.name && <p className='error-message'>{errors.name}</p>}
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            {errors.email && <p className='error-message'>{errors.email}</p>}
          </label>
          <label>
            Téléphone :
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
            {errors.phone && <p className='error-message'>{errors.phone}</p>}
          </label>
          <label>
            Mot de passe:
            <input type="password" name="password" value={user.password} onChange={handleChange} />
            {errors.password && <p className='error-message'>{errors.password}</p>}
          </label>
          <label className='checkbox'>
            <input type="checkbox" name="acceptedTerms" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} />
            <span>
              J'accepte les <Link href="/conditions">conditions générales d'utilisation</Link>
            </span>
          </label>
          {errors.acceptedTerms && <p className='error-message'>{errors.acceptedTerms}</p>}
          {errors.general && <p className='error-message'>{errors.general}</p>}
          <div className='button-container'>
            <button type="submit" disabled={!acceptedTerms || loading}>
              {loading ? 'En cours...' : 'S\'inscrire'}
            </button>
          </div>
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
