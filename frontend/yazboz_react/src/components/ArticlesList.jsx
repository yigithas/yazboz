import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPageableArticles } from '../redux/articleSlice';
import ArticlesMini from './ArticlesMini';
import { useEffect } from 'react';
import { useState } from 'react';
import "../css/ArticleMini.css";

function ArticlesList() {
    const BASE_BACKEND_URL = 'https://yazboz-ab8o.onrender.com';
    const dispatch = useDispatch();

    const {loading , error , articlesPage} = useSelector((store)=>store.articles);
    const [page, setPage] = useState(0);


    useEffect(() => {
        dispatch(getPageableArticles({page, size : 10}));
      }, [dispatch,page]);

      if (loading && !articlesPage) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata oluştu: {typeof error === 'string' ? error : 'Sunucuya ulaşılamadı'}</div>;

  return (
    <div>
        <div className="articles-container">
        {articlesPage?.content?.length > 0 ? (
          articlesPage.content.map((article) => (
            <ArticlesMini key={article.id} article={article} />
          ))
        ) : (
          <div>Henüz gösterilecek makale yok.</div>
        )}
      </div>
        <div className="pagination-container">
            <button
            className="pagination-btn"
            disabled={articlesPage?.first}
            onClick={()=> setPage(page-1)}
            >Önceki</button>

            <button
            className="pagination-btn"
            disabled={articlesPage?.last}
            onClick={()=> setPage(page+1)}
            >Sonraki</button>
            
        </div>

    </div>
  )
}

export default ArticlesList