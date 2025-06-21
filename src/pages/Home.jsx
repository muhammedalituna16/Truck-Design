import React from "react"; 
import { Link } from "react-router-dom";
import "../styles/Home.css";  

function Home() {
  return (
    <div className="home-page">
      {/* Logo */}
      <div className="logo-container">
        <img src="images/logo.png" alt="OSM Branda" className="logo"/>
      </div>

      {/* İçerik */}
      <div className="home-container">
        {/* Resim Alanı */}
        <div className="hero-section">
          <img src="images/company-image.jpg" alt="OSM Branda Şirketi" className="hero-image" />
        </div>

        {/* Metin Alanı */}
        <div className="text-container">
          <h1 className="title">Şirketinizin görünürlüğünü artırın!</h1>
          <p className="description">
            Tır, kamyon ve kamyonet brandalarınızı <br />
            özel tasarım ve logo ekleme seçenekleriyle <br />
            kişiselleştirmek için bizimle iletişime geçin.
          </p>
          <Link to="/osmbranda" className="primary-button">Branda Tasarla</Link>          
        </div>
      </div>
    </div>
  );
}

export default Home;
