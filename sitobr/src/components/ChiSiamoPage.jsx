import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/images/LogoBr.png";
import "./ChiSiamoPage.css";

const ChiSiamoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="chi-siamo-container">
      <img src={Logo} alt="Logo" className="chi-siamo-logo" />
      <div className="chi-siamo-content">
        <h1>Chi Siamo</h1>
        <p>
          {/* Qui puoi inserire la tua storia, missione, valori, ecc. */}
          Siamo un gruppo di appassionati di birra artigianale che organizza
          eventi unici per condividere la nostra passione con il pubblico. Ogni
          evento è pensato per far scoprire nuove birre, incontrare mastri
          birrai e vivere esperienze indimenticabili in compagnia.
        </p>
      </div>
      <button className="back-home-button" onClick={() => navigate("/")}>
        Torna alla Home Page
      </button>
    </div>
  );
};

export default ChiSiamoPage;
