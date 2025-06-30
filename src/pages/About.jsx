import React from "react"; 
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import "../styles/About.css"; // ✅ CSS dosyasını dahil ettik.

function About() {
  return (
    <div className="about-container">
      <InformationCircleIcon className="about-icon" />
      <h1 className="about-title">Hakkımızda</h1>
    </div>
  );
}

export default About;
