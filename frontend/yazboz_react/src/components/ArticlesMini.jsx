import React from 'react';
import '../css/ArticleMini.css';


function ArticlesMini({ article }) {
  const BASE_BACKEND_URL = 'http://localhost:8081';

  return (
    <div className="article-mini-card">
      <div className="mini-card-image-wrapper">
        <img 
          src={article.imageUrl?.startsWith('http') ? article.imageUrl : `${BASE_BACKEND_URL}${article.imageUrl}`} 
          alt={article.title} 
        />
      </div>

      <div className="mini-card-content">
        <h3 className="mini-card-title">{article.title}</h3>
        <p className="mini-card-summary">{article.summary}</p>
        
        <div className="mini-card-footer">
          <span className="read-more-btn">Devamını Oku &rarr;</span>
        </div>
      </div>
    </div>
  );
}

export default ArticlesMini;