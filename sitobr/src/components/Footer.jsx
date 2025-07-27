import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://www.instagram.com/drinkbrit?igsh=MWxveTRjcmx2eHR0eA=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram">
          <FaInstagram className="icon" />
        </a>
        <a
          href="https://www.tiktok.com/@drinkbrit?_t=ZN-8wgCPAGdklq&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok">
          <FaTiktok className="icon" />
        </a>
      </div>
      <p className="copyright">
        Copyright &copy; 2025 - P.IVA 13110090969 - Tutti i diritti riservati
      </p>
      <button
        className="secret-admin-button"
        onClick={() => window.dispatchEvent(new Event("showAdminLogin"))}>
        .
      </button>
    </footer>
  );
};

export default Footer;
