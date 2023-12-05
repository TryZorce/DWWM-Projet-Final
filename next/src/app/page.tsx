'use client'
import React, { useState } from 'react';
import Header from './ui/organisms/Header';
import ArticleList from './ui/molecules/ArticleList';
import Footer from './ui/organisms/Footer';
import CategoryList from './ui/molecules/CategoryList';
import SearchBar from './ui/organisms/Searchbar';
import HeroBanner from './ui/molecules/HeroBanner';
import "./style.scss"
const Page = () => {


  return (
    <div>
      <Header />
      <SearchBar />
      <HeroBanner />
      <div className='container-home'>
      <h1 className="title">Bienvenue dans l'univers envoûtant des bougies</h1>

      <p className="intro">Explorez des créations artisanales conçues pour éveiller vos sens et transformer votre espace en un sanctuaire de tranquillité.</p>

      <p>Chaque bougie, une histoire. Chaque lueur, une invitation à la détente.</p>

      <ul className="features">
        <li>Découvrez des fragrances envoûtantes</li>
        <li>Transformez votre espace en un sanctuaire de tranquillité</li>
        <li>Créez des moments magiques avec nos bougies</li>
      </ul>

      <p className="description">Explorez notre collection pour trouver la parfaite harmonie entre fragrances envoûtantes et design raffiné.</p>

      <p>Chez nous, chaque flamme est un récit, chaque lumière, une émotion.</p>
      </div>
      <CategoryList />
      <ArticleList />
      <Footer />
    </div>
  );
};

export default Page;
