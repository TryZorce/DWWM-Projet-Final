'use client'
import React, { useState } from 'react';
import Header from './ui/organisms/Header';
import ArticleList from './ui/molecules/ArticleList';
import Footer from './ui/organisms/Footer';
import CategoryList from './ui/molecules/CategoryList';
import SearchBar from './ui/organisms/Searchbar';

const Page = () => {

  return (
    <div>
      <Header/>
      <SearchBar/>
      <CategoryList/>
      <ArticleList/>
      <Footer/>
    </div>
  );
};

export default Page;
