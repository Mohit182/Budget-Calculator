import React from "react";
import "./App.css";
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";

const initialExpenses = [
  { id: 1, charge: "rent", amount: 1600 },
  { id: 2, charge: "car payment", amount: 400 },
  { id: 3, charge: "credit card bill", amount: 1200 },
];

console.log(initialExpenses);

const App = () => {
  return (
    <>
      <Alert />
      <ExpenseList />
      <ExpenseForm />
    </>
  );
};

export default App;
