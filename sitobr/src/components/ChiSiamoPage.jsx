import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../components/images/LogoBr.png";
import "./ChiSiamoPage.css";

const ChiSiamoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="chi-siamo-container">
      <button
        className="back-button"
        onClick={() => navigate("/")}
        aria-label="Torna alla Home">
        <FiArrowLeft />
      </button>

      <img src={Logo} alt="Logo" className="chi-siamo-logo" />

      <div className="chi-siamo-content">
        <h1>Chi Siamo</h1>
        <p>
          Siamo un team di appassionati e produttori di birra artigianale che
          organizza eventi unici per condividere la nostra passione con il
          pubblico. Ogni appuntamento è pensato per far scoprire nuove birre e
          vivere esperienze indimenticabili in compagnia. Il nostro calendario
          spazia dalle serate techno con sound curato ai cineforum con brevi
          introduzioni e dibattiti; realizziamo eventi privati su misura
          (compleanni, lauree, team building) e promuoviamo iniziative sociali
          di piccola riqualificazione urbana, dalla pulizia condivisa a
          micro–interventi sul territorio, che si chiudono sempre con un
          brindisi di quartiere. La birra resta il filo conduttore: produciamo
          birre artigianali, proponiamo degustazioni essenziali e pairing
          semplici. Obiettivo: eventi accessibili, ben organizzati e conviviali
          che avvicinano persone e luoghi. Se cerchi musica, cinema, comunità e
          ottima birra, ci vediamo al prossimo evento. 🍻
        </p>
      </div>
    </div>
  );
};

export default ChiSiamoPage;
