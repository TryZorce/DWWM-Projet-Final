"use client"
import React, { useEffect, useState } from 'react';
import CategoryPage from '@/ui/molecules/CategoryDetail';

const IdDetail = ({ params }) => {
  const { id } = params;

  if (!id) {
    return <p>L'identifiant de l'article est manquant.</p>;
  }

  return <CategoryPage categoryId={id} />;
};

export default IdDetail;
