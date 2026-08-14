import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getArticlesByType } from '../redux/articleSlice';
import ArticlesMini from '../components/ArticlesMini';
import "../css/ArticleMini.css";


function Diger() {

  const BASE_BACKEND_URL = 'https://yazboz-ab8o.onrender.com';
  const dispatch = useDispatch();
  const {loading,error,typeArticles,typeArticlesPageInfo} = useSelector((store)=>store.articles);
  const [page, setPage] = useState(0);

    useEffect(() => {
      dispatch(getArticlesByType({ type: "diger", page: 0, size: 10 }));
    }, [dispatch,page]);

  return (
    <>
    <div>
        {
          typeArticles && typeArticles.map((article)=>(
            <ArticlesMini key={article.id} article={article}/>
          ))
        }
    </div>

    <div className="pagination-container">
            <button
            className="pagination-btn"
            disabled={typeArticlesPageInfo?.first}
            onClick={()=> setPage(page-1)}
            >Önceki</button>

            <button
            className="pagination-btn"
            disabled={typeArticlesPageInfo?.last}
            onClick={()=> setPage(page+1)}
            >Sonraki</button>
            
        </div>
    </>
  )
}

export default Diger