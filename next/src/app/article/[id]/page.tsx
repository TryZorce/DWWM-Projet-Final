"use client"
import React from 'react';
import ArticlePage from '@/ui/molecules/ArticleDetail';
import Header from '@/ui/organisms/Header';
import Footer from '@/ui/organisms/Footer';
import SearchBar from '@/ui/organisms/Searchbar';

interface IdDetailProps {
  params: {
    id?: string;
  };
}

const IdDetail: React.FC<IdDetailProps> = ({ params }) => {
  const { id } = params;

  if (!id) {
    return <p>L'identifiant de l'article est manquant.</p>;
  }

  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return <p>L'identifiant de l'article n'est pas valide.</p>;
  }

  return (
    <>
      <Header />
      <SearchBar />
      <ArticlePage id={parsedId} />
      <Footer />
    </>
  );
};

export default IdDetail;
