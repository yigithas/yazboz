import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createArticle } from '../redux/articleSlice';
import '../css/Panel.css';

function Panel() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('diger');
  const [imgFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((store) => store.articles);
  const { user } = useSelector((store) => store.auth);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const submitArticle = (e) => {
    e.preventDefault();

    if (!imgFile) {
      alert('Lütfen resim seçiniz!');
      return;
    }


    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type', type);
    formData.append('image', imgFile);

    dispatch(createArticle(formData))
      .unwrap()
      .then(() => {
        alert('Makale başarıyla eklendi!');
        setTitle('');
        setContent('');
        setType('diger');
        setImageFile(null);
        navigate('/');
      })
      .catch((err) => {
        console.error('Yükleme hatası:', err);
      });
  };

  return (
    <div className="panel-container">
      <div className="panel-card">
        <h2 className="panel-title">Yeni Makale Ekle</h2>
        
        <form className="panel-form" onSubmit={submitArticle}>
          <div className="form-group">
            <label className="form-label">Makale Başlığı</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Başlık giriniz..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kategori / Tür</label>
            <select 
              className="form-select" 
              value={type} 
              onChange={(e) => setType(e.target.value)}
            >
              <option value="diger">Diğer</option>
              <option value="dijital">Dijital</option>
              <option value="spor">Spor</option>
              <option value="tarih">Tarih</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Görsel Yükle</label>
            <input 
              type="file" 
              className="form-file-input"
              accept="image/*"
              onChange={handleImageChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Makale İçeriği</label>
            <textarea 
              className="form-textarea"
              placeholder="Makale içeriğini buraya yazınız..."
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="panel-submit-btn" disabled={loading}>
            {loading ? 'Yayınlanıyor...' : 'Makaleyi Yayınla'}
          </button>
        </form>

        {error && (
          <div className="panel-error-message">
            {typeof error === 'string' ? error : 'Bir hata oluştu'}
          </div>
        )}
      </div>
    </div>
  );
}

export default Panel;