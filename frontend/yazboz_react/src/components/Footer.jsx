import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Sol Kısım: Logove Açıklama */}
        <div className="footer-brand">
          <h3 className="footer-logo">YazBoz</h3>
          <p className="footer-description">
            Teknoloji, dijital kültür, tarih ve spor dünyasından en güncel makaleler ve özgün içerikler.
          </p>
        </div>

        {/* Orta Kısım: Hızlı Bağlantılar */}
        <div className="footer-links-group">
          <h4 className="footer-title">Kategoriler</h4>
          <ul className="footer-links">
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/tarih">Tarih</Link></li>
            <li><Link to="/spor">Spor</Link></li>
            <li><Link to="/dijital">Dijital</Link></li>
            <li><Link to="/diger">Diğer</Link></li>
          </ul>
        </div>

        {/* Sağ Kısım: Sosyal Medya & İletişim */}
        <div className="footer-social-group">
          <h4 className="footer-title">Bizi Takip Edin</h4>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
          </div>
        </div>

      </div>

      {/* Alt Kısım: Telif Hakkı */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} YazBoz. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}

export default Footer;