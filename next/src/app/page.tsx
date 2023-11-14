'use client'
import React, { useState } from 'react';
import Header from './ui/organisms/Header';
import ArticleList from './ui/molecules/ListArticle';

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
      <h2>Résultats de la recherche :</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <ArticleList/>
    </div>
  );
};

export default Page;
