import React from "react";
import "./FilterBar.css";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select>
        <option>Location</option>
      </select>
      <select>
        <option>Search by Month</option>
      </select>
      <button className="skew-button">
        <span>Filter</span>
      </button>
      <button className="skew-button">
        <span>Apply</span>
      </button>
    </div>
  );
};

export default FilterBar;
