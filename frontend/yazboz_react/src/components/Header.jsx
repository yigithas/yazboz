import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import Navbar from './Navbar';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((store)=>store.auth);

    const handleLogout = (e)=>{
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
    }
    
  return (
    <div className='main-cont'>
        <div>
            <img src={logo} alt="" />
        </div>
        <div>
            <Link to="/" className='selections'>Ana Sayfa</Link>
            <Link to="/tarih" className='selections'>Tarih</Link>
            <Link to="/spor" className='selections'>Spor</Link>
            <Link to="/dijital" className='selections'>Dijital</Link>
            <Link to="/diger" className='selections'>Diğer</Link>
        </div>

        <Navbar></Navbar>

        <div>
            {token ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/create-article" className='selections'>Yazı Paylaş</Link>
            <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '6px 12px',backgroundColor:'#ff4d4f',
                borderRadius:'5px'
             }}>
              Çıkış Yap
            </button>
          </div>
        ) : (
          <Link to="/login">Giriş Yap</Link>
        )}
        </div>
    </div>
  )
}

export default Header