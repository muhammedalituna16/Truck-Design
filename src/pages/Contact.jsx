import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "../styles/Contact.css";

function Contact() {
  const latitude = 40.0962691;
  const longitude = 29.5208399;
  const zoomLevel = 16;

  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const [showContactForm, setShowContactForm] = useState(true);

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

          {/* Sosyal Medya İkonları */}
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
          <div className="contact-info-box">
            <h2>Bize Ulaşın</h2>
            <a href="tel:+902247123133" className="contact-info">
              <PhoneIcon className="contact-icon" />
              <p className="contact-text">+90 224 712 3133</p>
            </a>
            <a href="mailto:info@osmbranda.com" className="contact-info">
              <EnvelopeIcon className="contact-icon" />
              <p className="contact-text">info@osmbranda.com</p>
            </a>
          </div>

          {/* Form */}
          {showContactForm && (
            <div className="contact-form-box">
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();

                  emailjs
                    .send(
                      "service_23ndxyc", // EmailJS Service ID
                      "template_n1p9cdi", // EmailJS Template ID
                      {
                        name: contactInfo.name,
                        phone: contactInfo.phone,
                        note: contactInfo.note,
                      },
                      "Z1ELN-PUKIvj8Rr7P" // EmailJS Public Key
                    )
                    .then(() => {
                      alert("Bilgilerin başarıyla gönderildi! 📩");
                      setShowContactForm(false);
                      setContactInfo({ name: "", phone: "", note: "" });
                    })
                    .catch((error) => {
                      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
                      console.error("EmailJS Hatası:", error);
                    });
                }}
              >
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, name: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Notunuz (isteğe bağlı)"
                  value={contactInfo.note}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, note: e.target.value })
                  }
                />
                <button type="submit">Gönder</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
