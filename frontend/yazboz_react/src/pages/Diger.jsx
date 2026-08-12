import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getArticlesByType } from '../redux/articleSlice';
import ArticlesMini from '../components/ArticlesMini';


function Diger() {

  const BASE_BACKEND_URL = 'http://localhost:8081';
  const dispatch = useDispatch();
  const {loading,error,typeArticles} = useSelector((store)=>store.articles);

    useEffect(() => {
      dispatch(getArticlesByType("diger"));
    }, [dispatch]);

  return (
    <div>
        {
          typeArticles && typeArticles.map((article)=>(
            <ArticlesMini key={article.id} article={article}/>
          ))
        }
    </div>
  )
}

export default Diger