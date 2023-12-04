"use client"
import { useState } from 'react';
import './LoginForm.scss';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      // Validation des entrées (exemple : vérification que les champs ne sont pas vides)
      if (!username || !password) {
        setError('Veuillez saisir le nom d\'utilisateur et le mot de passe.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Mettre le token dans le localStorage
        localStorage.setItem('token', data.token);

        // Rediriger l'utilisateur vers la page appropriée après la connexion réussie
        window.location.href = '/user';
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background-login'>
      <div className="login-form">
        <h1>Connexion :</h1>
        <form>
          <label>
            Mail :
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="button-container">
            <button type="button" onClick={handleLogin} disabled={loading}>
              {loading ? 'En cours...' : 'Se connecter'}
            </button>
            <Link className="Link" href="/user/register">S'enregistrer
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
