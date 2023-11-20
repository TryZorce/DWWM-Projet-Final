import React, { useState, useEffect } from 'react';

const CategoryPage = ({ categoryId }) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryPages = async () => {
      try {
        if (!categoryId) {
          throw new Error("L'identifiant de la catégorie est manquant.");
        }

        const response = await fetch(`http://localhost:8000/api/categories/${categoryId}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setCategoryInfo(data);

        if (data.articles && Array.isArray(data.articles)) {
          const articlesData = await Promise.all(data.articles.map(async (articleUrl) => {
            const fullArticleUrl = `http://localhost:8000${articleUrl}`; // Ajout du préfixe correct

            try {
              const articleResponse = await fetch(fullArticleUrl);

              if (!articleResponse.ok) {
                throw new Error(`Erreur HTTP pour l'article : ${articleResponse.status}`);
              }

              return articleResponse.json();
            } catch (articleError) {
              throw new Error(`Erreur lors de la récupération de l'article : ${articleError.message}`);
            }
          }));

          setArticles(articlesData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPages();
  }, [categoryId]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!categoryInfo) {
    return <p>Aucune information trouvée pour cette catégorie.</p>;
  }

  return (
    <div>
      <h3>Liste d'articles</h3>
      <ul>
      <h2>{categoryInfo.categoryname}</h2>
      <img src={categoryInfo.image} alt={categoryInfo.categoryname} />
        {articles.map((article) => (
          <li key={article.id}>
            <h4>{article.name}</h4>
            <img src={article.image} alt={article.name} />
            <p>Description : {article.description}</p>
            <p>Prix : {article.price.toFixed(2)} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
