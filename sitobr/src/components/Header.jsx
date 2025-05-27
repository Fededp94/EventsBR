import React from "react";
import "./Header.css";
import Logo from "../components/images/LogoBr.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav>
        <ul className="menu">
          <li>
            <span>CALENDARIO</span>
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
            <button className="apply-button">
              <span>ACCOUNT</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
