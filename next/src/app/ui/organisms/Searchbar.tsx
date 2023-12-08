// SearchBar.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "./Searchbar.scss"

interface Article {
  image: string;
  id: number;
  name: string;
  description: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        setError(null);
        return;
      }

      const apiUrl = `http://localhost:8000/api/articles?page=1&name=${searchTerm}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('API Response:', data);

        if (data['hydra:member'] && Array.isArray(data['hydra:member'])) {
          setSearchResults(data['hydra:member']);
          setError(null);
        } else {
          console.error('Unexpected data format:', data);
          setError('Invalid data format received from the server');
        }
      } catch (error) {
        console.error('Error during search:', error);
        setError('Error during the search');
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Recherche..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="searchbar-article-container">
        {error && <p>{error}</p>}
        {searchTerm.trim() !== '' && searchResults.length === 0 && <p>Pas de résultat trouvé</p>}
        {searchResults.length > 0 ? (
          searchResults.map((article) => (
            <div key={article.id} className="searchbar-article-item">
              <Link href={`/article/${article.id}`}>
                <div className="searchbar-list-center">
                  <p className='name-wrapper'>{article.name}</p>
                  <img
                    src={`http://127.0.0.1:8000/images/${article.image}`}
                    alt={article.name}
                    className="searchbar-image"
                  />
                </div>
              </Link>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;