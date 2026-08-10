import React, { useState } from 'react';
import '../css/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ nickName, password })).unwrap();
      navigate('/'); // Giriş başarılı olunca anasayfaya yönlendir
    } catch (err) {
      console.error("Giriş hatası:", err);
    }
  };

  return (
    <form className='login-container' onSubmit={handleSubmit}>
      <h2>Giriş Yap</h2>
      
      {error && <p style={{ color: '#ff4d4f', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

      <input 
        type="text" 
        placeholder='Kullanıcı Adı'
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        required
      />
      <input 
        type="password" 
        placeholder='Şifre'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
}

export default Login;