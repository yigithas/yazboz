import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import logo from '../assets/logo.png';

function Header() {
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
        <div>
            <Link to="/login" className=''>Giriş Yap</Link>
        </div>
    </div>
  )
}

export default Header