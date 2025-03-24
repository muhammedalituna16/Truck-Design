import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa"; // React Icons eklendi
import "../styles/Contact.css";

function Contact() {
  const latitude = 40.0962691; // Osmanlı Branda & Reklam enlem (latitude)
  const longitude = 29.5208399; // Osmanlı Branda & Reklam boylam (longitude)
  const zoomLevel = 16; // Daha fazla yakınlaştırma

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        {/* Sol Kısım: Harita */}
        <div className="contact-left">
          <div className="map-container">
            <iframe
              title="Harita"
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          {/* Sosyal Medya İkonları (Formun Altında) */}
          <div className="social-icons">
            <a
              href="https://www.instagram.com/osmanli_branda/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100066635494128"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="social-icon" />
            </a>
            <a
              href="https://wa.me/905400011653"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
        </div>

        {/* Sağ Kısım: İletişim Bilgileri + Form */}
        <div className="contact-right">
          {/* İletişim Bilgileri */}
          <div className="contact-info-box">
            <h2>Bize Ulaşın</h2>
            <a href="tel:+905400011653" className="contact-info">
              <PhoneIcon className="contact-icon" />
              <p className="contact-text">+90 224 712 3133</p>
            </a>
            <a href="mailto:info@osmbranda.com" className="contact-info">
              <EnvelopeIcon className="contact-icon" />
              <p className="contact-text">info@osmbranda.com</p>
            </a>
          </div>

          {/* İletişim Formu */}
          <div className="contact-form-box">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="name" placeholder="Adınız" required />
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Mesajınız"
                required
              ></textarea>
              <button type="submit">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
