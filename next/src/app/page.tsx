'use client'
import React, { useState } from 'react';
import Header from './ui/organisms/Header';
import ArticleList from './ui/molecules/ArticleList';
import Footer from './ui/organisms/Footer';
import CategoryList from './ui/molecules/CategoryList';

const Page = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  const handleSearch = (query: string) => {
    // Implémentez ici votre logique de recherche en fonction de la requête "query"
    // Vous pouvez appeler une API ou effectuer une recherche dans vos données
    // Pour cet exemple, nous utilisons une liste vide pour les résultats.
    setSearchResults([]);
  };

  return (
    <div>
      <Header/>
      <CategoryList/>
      <ArticleList/>
      <Footer/>
    </div>
  );
};

export default Page;
