import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./BirrePage.css";
import ItalianPilsImg from "../components/images/ItalianPils.jpg";
import HeimiImg from "../components/images/Heimi.jpg";
import ChristmasTriple from "../components/images/FrontChristmas.jpg";

const beers = [
  {
    id: 1,
    name: "Italian Pils - Classy",
    image: ItalianPilsImg,
    description:
      "Birra in stile Italian Pils, composta principalmente da luppoli americani in dry hopping che donano sentori di agrumato, floreale e fruttato, accompagnati da un corpo scorrevole ma presente. Gradazione alcolica del 5% che rende la bevuta molto semplice e rinfrescante.",
  },
  {
    id: 2,
    name: "Christmas Triple - Holy Hangover",
    image: ChristmasTriple,
    description: "Birra dal gusto pieno con sentori di cioccolato e vaniglia.",
  },
  {
    id: 3,
    name: "Italian Pils - House Pils",
    image: HeimiImg,
    description:
      "Birra in stile Italian Pils, in collaborazione con Heimi prevenzione e salute, composta principalmente da luppoli americani in dry hopping che donano sentori di agrumato, floreale e fruttato, accompagnati da un corpo scorrevole ma presente. Gradazione alcolica del 5% che rende la bevuta molto semplice e rinfrescante.",
  },
];

const BirrePage = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="birre-page">
      <button className="back-button" onClick={() => navigate("/")}>
        <FiArrowLeft size={24} />
      </button>

      <h2>Le nostre birre</h2>

      <div className="birra-cards">
        {beers.map((birra, index) => (
          <div
            key={birra.id}
            className={`birra-card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}>
            <div className="birra-card-inner">
              <div className="birra-card-front">
                <img src={birra.image} alt={birra.name} />
              </div>
              <div className="birra-card-back">
                <h3>{birra.name}</h3>
                <p>{birra.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirrePage;
