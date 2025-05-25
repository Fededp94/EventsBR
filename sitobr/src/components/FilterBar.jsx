import React from "react";
import "./FilterBar.css";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select>
        <option disabled selected>
          Luogo
        </option>
        <option value="milano">Milano</option>
        <option value="napoli">Cernobbio</option>
        <option value="torino">Napoli</option>
      </select>

      <select>
        <option disabled selected>
          Cerca dal Mese
        </option>
        <option value="01">Gennaio</option>
        <option value="02">Febbraio</option>
        <option value="03">Marzo</option>
        <option value="04">Aprile</option>
        <option value="05">Maggio</option>
        <option value="06">Giugno</option>
        <option value="07">Luglio</option>
        <option value="08">Agosto</option>
        <option value="09">Settembre</option>
        <option value="10">Ottobre</option>
        <option value="11">Novembre</option>
        <option value="12">Dicembre</option>
      </select>

      <button className="skew-button">
        <span>Filtra</span>
      </button>
      <button className="skew-button">
        <span>Reset</span>
      </button>
    </div>
  );
};

export default FilterBar;
