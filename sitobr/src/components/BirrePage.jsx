import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./BirrePage.css";

const beers = [
  {
    id: 1,
    name: "Birra Chiara",
    image: "/images/birra-chiara.jpg",
    description:
      "Una birra chiara, leggera e rinfrescante, perfetta per l’estate.",
  },
  {
    id: 2,
    name: "Birra Ambrata",
    image: "/images/birra-ambrata.jpg",
    description:
      "Birra dal gusto pieno con sentori di caramello e frutta secca.",
  },
  {
    id: 3,
    name: "Birra Scura",
    image: "/images/birra-scura.jpg",
    description: "Intensa e corposa, con aromi di cioccolato e caffè.",
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
