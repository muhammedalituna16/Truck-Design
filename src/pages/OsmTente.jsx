import React from "react";
import { Link } from "react-router-dom";
import "../styles/OsmTente.css";

function OsmTente() {
  return (
    <div className="service-page">
      <h1>osmtente.</h1>
      <p>Yapım aşamasındayız. Lütfen güncellemeler için daha sonra tekrar kontrol edin.</p>
      <Link to="/" className="back-home">Anasayfaya Dön</Link>
    </div>
  );
}

export default OsmTente;
