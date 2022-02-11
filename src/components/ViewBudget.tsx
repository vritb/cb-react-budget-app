import React from "react";

type ViewBudgetProps = {
	budget: Number;
	handleEditClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ViewBudget = ({budget, handleEditClick} : ViewBudgetProps) => {
  return (
    <>
      <span>Budget: £{budget}</span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleEditClick}
      >
        Edit
      </button>
    </>
  );
};

export default ViewBudget;
