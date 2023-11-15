'use client'
import React, { useState } from 'react';
import Header from '../ui/organisms/Header';
import Footer from '../ui/organisms/Footer';
import ArticleDetail from '@/ui/molecules/ArticleDetail';

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
      <ArticleDetail/>
      <Footer/>
    </div>
  );
};

export default Page;
