import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchArticlesByTitle } from '../redux/articleSlice';
import ArticlesMini from '../components/ArticlesMini';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // URL'deki ?q=kelime değerini alır
  const dispatch = useDispatch();

  const { searchResults, loading, error } = useSelector((store) => store.articles);

  useEffect(() => {
    if (query) {
      dispatch(searchArticlesByTitle({ keyword: query, page: 0, size: 10 }));
    }
  }, [dispatch, query]);

  return (
    <div className="search-page-container">
      <h2>Arama Sonuçları: "{query}"</h2>

      {loading ? (
        <p>Aranıyor...</p>
      ) : error ? (
        <p className="error-text">Hata: {error}</p>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="articles-list">
          {searchResults.map((article) => (
            <ArticlesMini key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p>Aradığınız kriterlere uygun makale bulunamadı.</p>
      )}
    </div>
  );
}

export default SearchPage;