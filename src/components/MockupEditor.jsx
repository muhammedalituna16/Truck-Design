import React, { useState, useRef, useEffect } from "react";
import "./MockupEditor.css";
import tirBase from "../assets/tir.png";
import kamyonBase from "../assets/kamyon.png";
import kamyonetBase from "../assets/kamyonet.png";
import html2canvas from "html2canvas";
import brandaTexture from "../assets/brandaTexture.png";
import tirIcon from "../assets/a.png";
import kamyonIcon from "../assets/b.png";
import kamyonetIcon from "../assets/c.png";
import { FaRedoAlt } from "react-icons/fa";
import emailjs from "emailjs-com";

const MockupEditor = () => {
  const [brandaColor, setBrandaColor] = useState("#eeeeee");
  const [firmaIsmi, setFirmaIsmi] = useState("");
  const [fontFamily, setFontFamily] = useState("Anton");
  const [fontSize, setFontSize] = useState(50);
  const [firmaColor, setFirmaColor] = useState("#000000");
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(200);
  const [isDesignFinished, setIsDesignFinished] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const vehicleRef = useRef(null);
  const containerRef = useRef(null);

  const [showAnimation, setShowAnimation] = useState(false);
  const [vehicleType, setVehicleType] = useState("tir");

  const vehicleTemplates = {
    tir: {
      image: tirBase,
      brandaStyle: {
        width: "67%", // genişliğe göre oran
        height: "49%", // resmin yüksekliğine göre
        top: "5%", // resmin yüksekliğine göre
        left: "28%", // genişliğe göre
      },
    },
    kamyon: {
      image: kamyonBase,
      brandaStyle: {
        width: "73%",
        height: "62%",
        top: "9%",
        left: "30%",
      },
    },
    kamyonet: {
      image: kamyonetBase,
      brandaStyle: {
        width: "52%",
        height: "51%",
        top: "12%",
        left: "40%",
      },
    },
  };

  const getEventCoordinates = (e) => {
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
    return {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleDown = (e, elementName) => {
    e.preventDefault();
    const { x, y } = getEventCoordinates(e);
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX =
      ((x - containerRect.left) / containerRect.width) * 100 -
      elements[elementName].x;
    const offsetY =
      ((y - containerRect.top) / containerRect.height) * 100 -
      elements[elementName].y;

    setDragData({
      activeElement: elementName,
      offset: { x: offsetX, y: offsetY },
    });
  };

  const handleMove = (e) => {
    if (!dragData.activeElement || !containerRef.current) return;
    const { x, y } = getEventCoordinates(e);
    const containerRect = containerRef.current.getBoundingClientRect();

    const newX =
      ((x - containerRect.left) / containerRect.width) * 100 -
      dragData.offset.x;
    const newY =
      ((y - containerRect.top) / containerRect.height) * 100 -
      dragData.offset.y;

    setElements((prev) => ({
      ...prev,
      [dragData.activeElement]: {
        x: Math.max(0, Math.min(newX, 100)),
        y: Math.max(0, Math.min(newY, 100)),
      },
    }));
  };

  const handleUp = () => {
    setDragData({ activeElement: null, offset: { x: 0, y: 0 } });
  };

  const [dragData, setDragData] = useState({
    activeElement: null,
    offset: { x: 0, y: 0 },
  });

  const [elements, setElements] = useState({
    text: { x: 50, y: 50 },
    logo: { x: 50, y: 60 },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    if (vehicleRef.current) {
      html2canvas(vehicleRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#fff",
        scale: 1,
      }).then((canvas) => {
        setPreviewImage(canvas.toDataURL("image/png"));
        setShowPreview(true);
      });
    }
  };

  const handleMouseDown = (e, elementName) => {
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();

    const offsetX =
      ((e.clientX - containerRect.left) / containerRect.width) * 100 -
      elements[elementName].x;
    const offsetY =
      ((e.clientY - containerRect.top) / containerRect.height) * 100 -
      elements[elementName].y;

    setDragData({
      activeElement: elementName,
      offset: { x: offsetX, y: offsetY },
    });
  };

  const handleMouseMove = (e) => {
    if (!dragData.activeElement || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX =
      ((e.clientX - containerRect.left) / containerRect.width) * 100 -
      dragData.offset.x;
    const newY =
      ((e.clientY - containerRect.top) / containerRect.height) * 100 -
      dragData.offset.y;

    setElements((prev) => ({
      ...prev,
      [dragData.activeElement]: {
        x: Math.max(0, Math.min(newX, 100)),
        y: Math.max(0, Math.min(newY, 100)),
      },
    }));
  };

  const handleMouseUp = () => {
    setDragData({ activeElement: null, offset: { x: 0, y: 0 } });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragData]);

  const handleLogoMouseDown = (event) => {
    event.preventDefault();
    setLogoDragging(true);
    setLogoOffset({
      x: event.clientX - logoPosition.x,
      y: event.clientY - logoPosition.y,
    });
  };

  const handleDownload = () => {
    if (mockupRef.current) {
      html2canvas(mockupRef.current, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "tasarim.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mockup-container" style={{ backgroundColor: "white" }}>
      <div className="mockup">
        <div
          ref={vehicleRef}
          className={`truck-wrapper ${
            vehicleType === "tir" ? "tir-scale" : ""
          }`}
        >
          <img
            src={vehicleTemplates[vehicleType].image}
            alt="Araç"
            className="vehicle-base"
          />

          <div
            className="branda-container"
            ref={containerRef}
            style={{
              ...vehicleTemplates[vehicleType].brandaStyle,
              position: "absolute",
              backgroundColor: brandaColor,
              zIndex: 5,
              overflow: "hidden",
              borderRadius: "4px",
              border: "1px solid #c9c9c9",
            }}
          >
            <img
              src={brandaTexture}
              alt="Texture"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.25,
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                fontFamily,
                fontSize,
                color: firmaColor,
                left: `${elements.text.x}%`,
                top: `${elements.text.y}%`,
                transform: "translate(-50%, -50%)",
                cursor: dragData.activeElement === "text" ? "grabbing" : "grab",
              }}
              onMouseDown={(e) => handleMouseDown(e, "text")}
              onTouchStart={(e) => handleDown(e, "text")}
            >
              {firmaIsmi}
            </span>

            {logo && (
              <img
                src={logo}
                alt="Logo"
                style={{
                  position: "absolute",
                  left: `${elements.logo.x}%`,
                  top: `${elements.logo.y}%`,
                  width: logoSize,
                  transform: "translate(-50%, -50%)",
                  cursor:
                    dragData.activeElement === "logo" ? "grabbing" : "grab",
                }}
                onMouseDown={(e) => handleMouseDown(e, "logo")}
                onTouchStart={(e) => handleDown(e, "logo")}
              />
            )}
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="vehicle-selection">
          {Object.keys(vehicleTemplates).map((type) => (
            <button
              key={type}
              className={`vehicle-button ${
                vehicleType === type ? "selected" : ""
              }`}
              onClick={() => setVehicleType(type)}
            >
              <img
                src={
                  type === "tir"
                    ? tirIcon
                    : type === "kamyon"
                    ? kamyonIcon
                    : kamyonetIcon
                }
                alt={type}
              />
              <span className="vehicle-label">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div className="right-controls">
          {/* Firma İsmi */}
          <div className="firma-input-wrapper">
            <input
              type="text"
              placeholder="Firma İsmi"
              value={firmaIsmi}
              onChange={(e) => {
                setFirmaIsmi(e.target.value);
              }}
            />
            <FaRedoAlt
              className="refresh-icon"
              onClick={() => setFirmaIsmi("")}
              title="Firma ismini sıfırla"
            />

            {(firmaIsmi || logo) && (
              <div className="firma-ayarlari visible">
                <label>
                  Font
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                  >
                    <option value="Anton">Anton</option>
                    <option value="Oswald">Oswald</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Lobster">Lobster</option>
                    <option value="Bebas Neue">Bebas Neue</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Pacifico">Pacifico</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Merriweather">Merriweather</option>
                    <option value="Dancing Script">Dancing Script</option>
                    <option value="Caveat">Caveat</option>
                    <option value="Bangers">Bangers</option>
                    <option value="Russo One">Russo One</option>
                    <option value="Abril Fatface">Abril Fatface</option>
                    <option value="Satisfy">Satisfy</option>
                    <option value="Comfortaa">Comfortaa</option>
                    <option value="Amatic SC">Amatic SC</option>
                    <option value="Fira Sans">Fira Sans</option>
                    <option value="Titillium Web">Titillium Web</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                    <option value="Barlow">Barlow</option>
                    <option value="Zilla Slab">Zilla Slab</option>
                  </select>
                </label>

                <label>
                  Yazı Büyüklüğü
                  <input
                    type="range"
                    min="8"
                    max="350"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                  />
                </label>

                <label>
                  🎨 Yazı Rengi Seç
                  <input
                    type="color"
                    value={firmaColor}
                    onChange={(e) => setFirmaColor(e.target.value)}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Branda Rengi */}
          <div className="custom-color-picker">
            <label>
              Branda Rengini Seç
              <input
                type="color"
                value={brandaColor}
                onChange={(e) => {
                  setBrandaColor(e.target.value);
                }}
              />
            </label>

            <FaRedoAlt
              className="refresh-icon"
              onClick={() => setBrandaColor("#eeeeee")}
              title="Branda rengini sıfırla"
            />
          </div>

          {/* Logo */}
          <div className="logo-upload-wrapper">
            <label className="custom-file-label">
              Logo Yükle
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleLogoUpload(e);
                }}
                className="hidden-file-input"
              />
            </label>

            <FaRedoAlt
              className="refresh-icon"
              onClick={() => setLogo(null)}
              title="Logoyu sıfırla"
            />

            {logo && (
              <div className="logo-ayari visible">
                <label>
                  Logo Boyutu
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                  />
                </label>
              </div>
            )}
          </div>

          {!isDesignFinished && (
            <div className="design-button-wrapper full-width">
              <button
                onClick={() => setIsDesignFinished(true)}
                className="design-finish-button fade-in show"
              >
                Tasarımımı Tamamladım
              </button>
            </div>
          )}
        </div>
      </div>

      {isDesignFinished && (
        <div className="after-design">
          <h2>Tebrikler! Tasarımın tamamlandı. 🎉</h2>
          <p>
            Bizimle iletişime geçmek için aşağıdaki seçenekleri kullanabilirsin:
          </p>

          <div className="contact-buttons">
            <button onClick={() => window.open("tel:+902247123133")}>
              📞 Bizi Ara
            </button>
            <button onClick={() => window.open("https://wa.me/+905050005353")}>
              💬 WhatsApp'tan Yaz
            </button>
            <button onClick={() => setShowContactForm(true)}>
              📩 Beni Daha Sonra Ara
            </button>
            <button onClick={handlePreview}>👁️ Ön İzleme</button>
          </div>

          {showContactForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                emailjs
                  .send(
                    "service_23ndxyc", // EmailJS'den alacağın service ID
                    "template_n1p9cdi", // EmailJS'den alacağın template ID
                    contactInfo,
                    "Z1ELN-PUKIvj8Rr7P" // EmailJS'den alacağın public key
                  )
                  .then((result) => {
                    alert("Bilgilerin başarıyla gönderildi! 📩");
                    setShowContactForm(false);
                    setContactInfo({ name: "", phone: "", note: "" });
                  })
                  .catch((error) => {
                    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
                    console.error(error);
                  });
              }}
              className="contact-form"
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
          )}
        </div>
      )}

      {showPreview && (
        <div
          className="preview-modal"
          onClick={() => setShowPreview(false)} // siyah alana tıklayınca kapansın
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()} // içeriğe tıklayınca kapanmasın
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            {/* X butonu */}
            <button
              className="preview-close-button"
              onClick={() => setShowPreview(false)}
              aria-label="Kapat"
            >
              &times;
            </button>

            <img
              src={previewImage}
              alt="Önizleme"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />

            <div className="share-options" style={{ marginTop: "20px" }}>
              <div
                className="share-buttons"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(previewImage);
                    alert("Link panoya kopyalandı!");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/48/copy.png"
                    alt="Kopyala"
                  />
                </button>

                <button className="share-button" onClick={handleDownload}>
                  <img
                    src="https://img.icons8.com/fluency-systems-filled/48/download.png"
                    alt="İndir"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockupEditor;
