import React from "react";
import { Link } from "react-router-dom";
import "../styles/OsmGarden.css";

function OsmGarden() {
  return (
    <div className="service-page">
      <h1>osmgarden.</h1>
      <p>Yapım aşamasındayız. Lütfen güncellemeler için daha sonra tekrar kontrol edin.</p>
      <Link to="/" className="back-home">Anasayfaya Dön</Link>
    </div>
  );
}

export default OsmGarden;
