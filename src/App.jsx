import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import OsmBranda from "./pages/OsmBranda";
import OsmGarden from "./pages/OsmGarden";
import OsmTente from "./pages/OsmTente";
import OsmReklam from "./pages/OsmReklam";
import Navbar from "./components/Navbar";
import MockupEditor from "./components/MockupEditor";


function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Ana layout yönetimi
function MainLayout() {
  const location = useLocation(); // Mevcut sayfanın yolunu alır

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/hizmetler" element={<Services />} />
        
        {/* Hizmetler alt sayfaları */}
        <Route path="/osmbranda" element={<OsmBranda />} />
        <Route path="/osmgarden" element={<OsmGarden />} />
        <Route path="/osmtente" element={<OsmTente />} />
        <Route path="/osmreklam" element={<OsmReklam />} />
      </Routes>
    </>
  );
}

export default App;
