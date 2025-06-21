import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Ana sayfada mı olduğumuzu kontrol et
  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar ${isHome ? "home-navbar" : ""}`}>
      {/* Logo (Ana sayfadaysa gizlenebilir) */}
      {!isHome && (
        <div className="logo">
          <Link to="/">
            <img
              src="images/logo.png"
              alt="OSM Branda"
              className="logo-image"
            />
          </Link>
        </div>
      )}

      {/* Menü İkonları */}
      <div className="nav-icons">
        {/* Hizmetler Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={(e) => {
            if (
              !dropdownRef.current ||
              !dropdownRef.current.contains(e.relatedTarget)
            ) {
              setDropdownOpen(false);
            }
          }}
        >
          <Link to="/hizmetler" className="nav-icon">
            <img
              src="images/services.png"
              alt="Hizmetler"
              className="w-6 h-6"
            />
          </Link>

          {/* Dropdown Menü */}
          {dropdownOpen && (
            <ul ref={dropdownRef} className="dropdown-menu">
              <li>
                <Link to="/osmbranda" onClick={() => setDropdownOpen(false)}>
                  osmbranda.
                </Link>
              </li>
              <li>
                <Link to="/osmgarden" onClick={() => setDropdownOpen(false)}>
                  osmgarden.
                </Link>
              </li>
              <li>
                <Link to="/osmtente" onClick={() => setDropdownOpen(false)}>
                  osmtente.
                </Link>
              </li>
              <li>
                <Link to="/osmajans" onClick={() => setDropdownOpen(false)}>
                  osmajans.
                </Link>
              </li>
            </ul>
          )}
        </div>

        <Link to="/iletisim" className="nav-icon" data-name="İletişim">
          <img src="images/phone.svg" alt="İletişim" className="w-6 h-6" />
        </Link>
        <Link to="/hakkimizda" className="nav-icon" data-name="Hakkımızda">
          <img src="images/user.svg" alt="Hakkımızda" className="w-6 h-6" />
        </Link>
      </div>

      {/* Mobil Menü */}
      <div className="mobile-menu">
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
        {isOpen && (
          <ul className="menu-items">
            <li>
              <Link to="/hizmetler" onClick={() => setIsOpen(false)}>
                Hizmetler
              </Link>
            </li>
            <li>
              <Link to="/iletisim" onClick={() => setIsOpen(false)}>
                İletişim
              </Link>
            </li>
            <li>
              <Link to="/hakkimizda" onClick={() => setIsOpen(false)}>
                Hakkımızda
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
