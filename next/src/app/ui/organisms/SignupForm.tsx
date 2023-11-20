import React, { useState } from 'react';
import './SignupForm.scss';

const InscriptionForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // New state for success message

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic form validation
      if (!user.name || !user.email || !user.password || !user.phone) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      // You can add more specific form validation here (e.g., email format, password criteria)

      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        // Set success state to true
        setSuccess(true);

        // Reset form and error state
        setUser({
          name: '',
          email: '',
          password: '',
          phone: '',
        });
        setError(null);
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
    </div>
  );
};

export default InscriptionForm;
