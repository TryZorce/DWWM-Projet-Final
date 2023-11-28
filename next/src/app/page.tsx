'use client'
import React, { useState } from 'react';
import Header from './ui/organisms/Header';
import ArticleList from './ui/molecules/ArticleList';
import Footer from './ui/organisms/Footer';
import CategoryList from './ui/molecules/CategoryList';
import SearchBar from './ui/organisms/Searchbar';
import HeroBanner from './ui/molecules/HeroBanner';

const Page = () => {

  
  return (
    <div>
      <Header/>
      <SearchBar/>
      <HeroBanner/>
      <CategoryList/>
      <ArticleList/>
      <Footer/>
    </div>
  );
};

export default Page;
