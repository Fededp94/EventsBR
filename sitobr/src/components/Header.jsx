import React, { useState } from "react";
import "./Header.css";
import Logo from "../components/images/LogoBr.png";
import axios from "axios";

const Header = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleTogglePanel = () => {
    setShowPanel(!showPanel);
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

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <nav>
          <ul className="menu">
            <li>
              <span>VIENI A BERE CON NOI</span>
            </li>
            <li>
              <span>LE NOSTRE BIRRE</span>
            </li>
            <li>
              <span>CHI SIAMO</span>
            </li>
            <li>
              <span>CONTATTI</span>
            </li>
            <li>
              <button className="apply-button" onClick={handleTogglePanel}>
                <span>NEWSLETTER</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Slide-in panel */}
      <div className={`newsletter-panel ${showPanel ? "open" : ""}`}>
        <button className="close-button" onClick={handleTogglePanel}>
          ×
        </button>
        <h3>
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
      </div>
    </>
  );
};

export default Header;
