import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Services.css";

function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-page">
      <h1 className="title">Hizmetlerimiz</h1>

      <div className="services-container">
        {/* osmbranda */}
        <button className="service-button lexend-font" onClick={() => navigate("/osmbranda")}>
          osmbranda.
        </button>

        {/* osmgarden */}
        <button className="service-button lexend-font" onClick={() => navigate("/osmgarden")}>
          osmgarden.
        </button>

        {/* osmtente */}
        <button className="service-button lexend-font" onClick={() => navigate("/osmtente")}>
          osmtente.
        </button>

        {/* osmajans */}
        <button className="service-button lexend-font" onClick={() => navigate("/osmreklam")}>
          osmreklam.
        </button>
      </div>
    </div>
  );
}

export default Services;
