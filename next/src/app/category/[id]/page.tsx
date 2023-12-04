"use client"
import React, { useEffect, useState } from 'react';
import CategoryPage from '@/ui/molecules/CategoryDetail';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import SearchBar from '@/ui/organisms/Searchbar';

const IdDetail = ({ params }) => {
  const { id } = params;

  if (!id) {
    return <p>L'identifiant de l'article est manquant.</p>;
  }

  return (
    <>
    <Header />
    <SearchBar/>
    <CategoryPage categoryId={id} />
    <Footer /></>
    )
  ;
};

export default IdDetail;
