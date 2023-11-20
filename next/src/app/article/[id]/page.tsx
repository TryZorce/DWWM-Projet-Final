"use client"
import React from 'react';
import ArticlePage from '@/ui/molecules/ArticleDetail';

// Destructure the id from the params directly in the function parameters
const IdDetail = ({ params }) => {
  const { id } = params;

  // Ensure that an id is present before rendering the ArticlePage
  if (!id) {
    return <p>L'identifiant de l'article est manquant.</p>;
  }

  // Render the ArticlePage component with the extracted id
  return <ArticlePage id={id} />;
};

export default IdDetail;
