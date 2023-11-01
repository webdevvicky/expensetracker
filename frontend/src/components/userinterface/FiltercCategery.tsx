import React, { useState } from "react";
import { Props } from "./ExpenceTable";

interface Category {
  cat: Props[];
}

const Select = ({ cat }: Category) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  const options = cat.map((x, index) => (
    <option key={index} value={x._id}>
      {x.catname}
    </option>
  ));

  return (
    <div className="container">
      <select
        className="form-select"
        aria-label="Default select example"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="null" disabled>
          Open this select menu
        </option>
        {options}
      </select>
    </div>
  );
};

export default Select;
