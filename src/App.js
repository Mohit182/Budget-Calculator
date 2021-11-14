import React, { useState } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import { v4 as uuidv4 } from "uuid";

const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car payment", amount: 400 },
  { id: uuidv4(), charge: "credit card bill", amount: 1200 },
];

const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  const chargeHandler = (event) => {
    setCharge(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuidv4(), charge: charge, amount: amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
    } else {
      //alerhandler
    }
  };

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          amountHandler={amountHandler}
          chargeHandler={chargeHandler}
          submitHandler={submitHandler}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
