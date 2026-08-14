import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderArticles } from '../redux/articleSlice';
import '../css/Slider.css';
import ArticlesList from '../components/ArticlesList';
import { useNavigate } from 'react-router-dom';

function Anasayfa() {
  const BASE_BACKEND_URL = 'https://yazboz-ab8o.onrender.com';
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const { sliderArticles, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchSliderArticles());
  }, [dispatch]);

  const visitArticle = (item)=>{
    
    navigate(`/article/${item.id}`)
  }
  
  const duplicatedItems = sliderArticles.length > 0 
    ? [...sliderArticles, ...sliderArticles, ...sliderArticles] 
    : [];

  return (
    <>
      
      <div className="slider-wrapper">
        {loading && sliderArticles.length === 0 ? (
          <div className="slider-status-message">Slider Yükleniyor...</div>
        ) : error ? (
          <div className="slider-status-message slider-error-message">Hata: {error}</div>
        ) : (
          <div className="slider-track">
            {duplicatedItems.map((item, index) => (
              
              <div className="slider-card" key={index} onClick={()=>visitArticle(item)}>
                <div className="card-image-wrapper">
                  <img 
                    src={item.imageUrl?.startsWith('http') ? item.imageUrl : `${BASE_BACKEND_URL}${item.imageUrl}`} 
                    alt={item.title} 
                  />
                </div>
                <div className="card-title">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <ArticlesList />   
    </>
  );
}

export default Anasayfa;