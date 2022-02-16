import React, { useState } from "react";

type EditBudgetProps = {
  budget: number;
  handleSaveClick: (value: number) => void;
};

const EditBudget = ({ budget, handleSaveClick }: EditBudgetProps) => {
  const [value, setValue] = useState(budget);
  return (
    <>
      <input
        required
        type="number"
        className="form-control mr-3"
        id="name"
        value={value}
        onChange={(event) => {
          const newValue = parseFloat(event.target.value);
          if (!isNaN(newValue)) setValue(newValue);
        }}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleSaveClick(value)}
      >
        Save
      </button>
    </>
  );
};

export default EditBudget;
