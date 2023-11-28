import React from 'react';
import LoginForm from '@/ui/organisms/LoginForm'; // Replace 'path-to-your' with the actual path to the LoginForm component
import Footer from '@/ui/organisms/Footer';
import Header from '@/ui/organisms/Header';
import Link from 'next/link';

const Login = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <Link href="/user/register">S'enregistrer</Link>
      <Footer />
    </div>
  );
};

export default Login;
