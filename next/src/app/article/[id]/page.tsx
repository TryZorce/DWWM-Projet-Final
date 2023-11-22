"use client"
import React from 'react';
import ArticlePage from '@/ui/molecules/ArticleDetail';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import SearchBar from '@/ui/organisms/Searchbar';

const IdDetail = ({ params }) => {
  const { id } = params;

  if (!id) {
    return <p>L'identifiant de l'article est manquant.</p>;
  }

  return <>
  <Header />
  <SearchBar/>
  <ArticlePage id={id} />
  <Footer/>
  </>;
};

export default IdDetail;
