import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

// This defines which data belongs to an Expense
export interface Expense {
  id: string;
  name: string;
  cost: number;
}

// Defines the data object to be mananged by state manager
export type State = {
  budget: number;
  expenses: Expense[];
};

// The names used to denote actions for state management
export enum ActionNames {
  SET_BUDGET = "SET_BUDGET'",
  ADD_EXPENSE = "ADD_EXPENSE",
  DELETE_EXPENSE = "DELETE_EXPENSE",
}

// Defines the actions and their data objects for state management
export type Action =
  | { type: ActionNames.SET_BUDGET; limit: number }
  | { type: ActionNames.ADD_EXPENSE; expense: Expense }
  | { type: ActionNames.DELETE_EXPENSE; expenseId: string };

// Defines the interface provided by the AppContext.Provider
export interface AppContextInterface extends State {
  dispatch?: React.Dispatch<Action>;
}

// Sets the initial state when the app loads
const initialState: State = {
  budget: 2000,
  expenses: [
    { id: uuidv4(), name: "Shopping", cost: 50 },
    { id: uuidv4(), name: "Holiday", cost: 300 },
    { id: uuidv4(), name: "Transportation", cost: 70 },
    { id: uuidv4(), name: "Fuel", cost: 40 },
    { id: uuidv4(), name: "Child Care", cost: 500 },
  ],
};

// The reduceer - this is used to update the state, based on the given action
export const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionNames.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.expense],
      };
    case ActionNames.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.expenseId
        ),
      };
    case ActionNames.SET_BUDGET:
      return {
        ...state,
        budget: action.limit,
      };

    default:
      return state;
  }
};

// Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext<AppContextInterface>(initialState);

// Represents the properties of the AppProvider component
export type AppProviderProps = {
  children: React.ReactNode;
};

// Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested (wrapped) components
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer<typeof AppReducer>(
    AppReducer,
    initialState
  );

  // Returns our context. Pass in the values we want to expose
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        dispatch: dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
