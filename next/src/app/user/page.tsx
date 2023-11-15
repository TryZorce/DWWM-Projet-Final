'use client'
import React, { useState } from 'react';
import Header from '../ui/organisms/Header';
import Footer from '../ui/organisms/Footer';
import SignupForm from '../ui/organisms/SignupForm';

const Page = () => {
  return (
    <div>
      <Header/>
      <SignupForm/>
      <Footer/>
    </div>
  );
};

export default Page;
