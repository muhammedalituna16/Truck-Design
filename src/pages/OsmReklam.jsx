import React from "react";
import { Link } from "react-router-dom";
import "../styles/OsmAjans.css";

function OsmAjans() {
  return (
    <div className="service-page">
      <h1>osmajans.</h1>
      <p>Yapım aşamasındayız. Lütfen güncellemeler için daha sonra tekrar kontrol edin.</p>
      <Link to="/" className="back-home">Anasayfaya Dön</Link>
    </div>
  );
}

export default OsmAjans;
