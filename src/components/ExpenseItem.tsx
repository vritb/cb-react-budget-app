import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext, ActionNames, Expense } from "../context/AppContext";

const ExpenseItem = ({id, name, cost} : Expense) => {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch!({
      type: ActionNames.DELETE_EXPENSE,
      expenseId: id,
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {name}
      <div>
        <span className="badge badge-primary badge-pill mr-3">
          £{cost}
        </span>
        <TiDelete size="1.5em" onClick={handleDeleteExpense} />
      </div>
    </li>
  );
};

export default ExpenseItem;
