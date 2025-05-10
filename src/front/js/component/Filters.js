import React from "react";
import "../../styles/pets-view.css";

const Filters = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <h4>Filter</h4>
      <div>
        <label>
          <input type="radio" name="gender" value="male" onChange={onFilterChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" onChange={onFilterChange} />
          Female
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="color" value="black" onChange={onFilterChange} />
          Black
        </label>
        <label>
          <input type="checkbox" name="color" value="white" onChange={onFilterChange} />
          White
        </label>
        <label>
          <input type="checkbox" name="color" value="brown" onChange={onFilterChange} />
          Brown
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="size" value="small" onChange={onFilterChange} />
          Small
        </label>
        <label>
          <input type="radio" name="size" value="large" onChange={onFilterChange} />
          Large
        </label>
      </div>
    </div>
  );
};

export default Filters;
