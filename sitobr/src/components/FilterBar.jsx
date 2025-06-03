import React from "react";
import "./FilterBar.css";

const FilterBar = ({
  selectedLocation,
  setSelectedLocation,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="filter-bar">
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">Tutti i luoghi</option>
        <option value="milano">Milano</option>
        <option value="cernobbio">Cernobbio</option>
        <option value="napoli">Napoli</option>
      </select>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Tutti i mesi</option>
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

      <button
        className="skew-button"
        onClick={() => {
          setSelectedLocation("");
          setSelectedMonth("");
        }}>
        <span>Reset</span>
      </button>
    </div>
  );
};

export default FilterBar;
