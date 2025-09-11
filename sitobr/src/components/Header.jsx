import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./Header.css";
import Logo from "../components/images/LogoBr.png";
import axios from "axios";

const Header = () => {
  const [showPanel, setShowPanel] = useState(false); // newsletter
  const [showContacts, setShowContacts] = useState(false); // contatti
  const [cameFromMobileMenu, setCameFromMobileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleTogglePanel = () => {
    setShowPanel((v) => !v);
    setEmail("");
    setMessage("");
  };

  const handleSubscribe = async () => {
    if (!email) return;
    try {
      await axios.post("http://localhost:8080/api/subscribe", { email });
      setMessage("✅ Iscrizione avvenuta con successo!");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data === "Email già registrata") {
        setMessage("⚠️ Email già registrata.");
      } else {
        setMessage("❌ Errore durante l'iscrizione.");
      }
    }
  };

  useEffect(() => {
    const anyOpen = showPanel || showContacts || mobileMenuOpen;
    document.body.classList.toggle("no-scroll", anyOpen);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPanel(false);
        setShowContacts(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showPanel, showContacts, mobileMenuOpen]);

  const openContactsDesktop = () => {
    setShowContacts(true);
    setCameFromMobileMenu(false);
  };
  const openContactsFromMobile = () => {
    setCameFromMobileMenu(true);
    setMobileMenuOpen(false);
    setShowContacts(true);
  };
  const backToMobileMenu = () => {
    setShowContacts(false);
    if (cameFromMobileMenu) setMobileMenuOpen(true);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" aria-label="Home">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Desktop */}
        <nav className="desktop-nav">
          <ul className="menu">
            <li>
              <Link to="/birre">
                <span>LE NOSTRE BIRRE</span>
              </Link>
            </li>
            <li>
              <Link to="/chi-siamo">
                <span>CHI SIAMO</span>
              </Link>
            </li>
            <li>
              <button
                className="menu-link-button"
                onClick={openContactsDesktop}>
                <span>CONTATTI</span>
              </button>
            </li>
            <li>
              <button className="apply-button" onClick={handleTogglePanel}>
                <span>NEWSLETTER</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile: NEWSLETTER a sinistra, HAMBURGER a destra */}
        <div className="header-actions">
          <button className="apply-button" onClick={handleTogglePanel}>
            <span>NEWSLETTER</span>
          </button>
          <button
            className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
            aria-label="Apri menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* OVERLAY del menu mobile */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "visible" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* MENU MOBILE: drawer da destra */}
      <nav
        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Menu mobile">
        <ul>
          <li>
            <Link to="/birre" onClick={() => setMobileMenuOpen(false)}>
              LE NOSTRE BIRRE
            </Link>
          </li>
          <li>
            <Link to="/chi-siamo" onClick={() => setMobileMenuOpen(false)}>
              CHI SIAMO
            </Link>
          </li>
          <li>
            <button
              className="mobile-menu-link"
              onClick={openContactsFromMobile}>
              CONTATTI
            </button>
          </li>
        </ul>
      </nav>

      {/* OVERLAY NEWSLETTER */}
      <div
        className={`newsletter-overlay ${showPanel ? "visible" : ""}`}
        onClick={handleTogglePanel}
      />

      {/* PANNELLO NEWSLETTER */}
      <aside
        className={`newsletter-panel ${showPanel ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nl-title">
        <button
          className="close-button"
          onClick={handleTogglePanel}
          aria-label="Chiudi pannello">
          ×
        </button>
        <h3 id="nl-title">
          Iscriviti alla Newsletter per rimanere aggiornato su tutti i nostri
          eventi!
        </h3>
        <input
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="confirm-button" onClick={handleSubscribe}>
          Conferma
        </button>
        {message && <p className="newsletter-message">{message}</p>}
      </aside>

      {/* OVERLAY CONTATTI */}
      <div
        className={`contacts-overlay ${showContacts ? "visible" : ""}`}
        onClick={() => setShowContacts(false)}
      />

      {/* PANNELLO CONTATTI */}
      <aside
        className={`contacts-panel ${showContacts ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contacts-title">
        {/* back arrow (solo mobile, via CSS) */}
        <button
          className="contacts-back"
          onClick={backToMobileMenu}
          aria-label="Torna al menu">
          <FiArrowLeft />
        </button>

        <h3 id="contacts-title">Contatti</h3>

        {/* >>> QUI L'AGGIORNAMENTO: numeri uno sotto l'altro <<< */}
        <div className="contacts-content">
          <p>
            <strong>Email:</strong> info@drinkbr.it
          </p>
          <p>
            <strong>Telefono:</strong>
            <br />
            +39 3933518495
            <br />
            +39 3803470184
          </p>
          <p>
            <strong>Sede:</strong> Milano
          </p>
        </div>
      </aside>
    </>
  );
};

export default Header;
