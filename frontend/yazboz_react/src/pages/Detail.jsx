import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleDetail } from '../redux/articleSlice';
import '../css/Detail.css';
import { useParams } from 'react-router-dom';

function Detail() {
  const BASE_BACKEND_URL = 'http://localhost:8081';

  const {id} = useParams();
  const dispatch = useDispatch();
  const { loading, error, detailPage } = useSelector((store) => store.articles);

  useEffect(() => {
    if (id) {
      dispatch(getArticleDetail(id));
    }
  }, [dispatch, id]);

  // Yüklenme ve Hata kontrolleri
  if (loading || !detailPage) return <div className="detail-status">Makale detayı yükleniyor...</div>;
  if (error) return <div className="detail-status detail-error">Hata oluştu: {error}</div>;

  return (
    <div className="article-detail-card">
      <div className="detail-image-wrapper">
        <img 
          src={detailPage.imageUrl?.startsWith('http') ? detailPage.imageUrl : `${BASE_BACKEND_URL}${detailPage.imageUrl}`} 
          alt={detailPage.title} 
        />
      </div>

      <div className="detail-content">
        <h1 className="detail-title">{detailPage.title}</h1>

        <div className="detail-meta">
          <span className="detail-writer">
            Yazar: <strong>{detailPage.writerNickname || detailPage.writerNickName || 'Anonim'}</strong>
          </span>
          <span className="detail-date">Tarih: {detailPage.createdAt}</span>
        </div>

        <p className="detail-body">{detailPage.content}</p>
      </div>
    </div>
  );
}

export default Detail;