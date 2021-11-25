import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

const App = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false, type: null, text: "" });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("we called useeffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const chargeHandler = (event) => {
    setCharge(event.target.value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  const alertHandler = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        alertHandler({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
        alertHandler({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      alertHandler({
        type: "danger",
        text: "charge can not be empty value and amount has to be bigger than zero",
      });
    }
  };

  const clearItemHandler = () => {
    setExpenses([]);
    alertHandler({ type: "danger", text: "all items deleted" });
  };

  const deleteItemHandler = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    alertHandler({ type: "danger", text: "item deleted" });
  };

  const editItemHandler = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          amountHandler={amountHandler}
          chargeHandler={chargeHandler}
          submitHandler={submitHandler}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          deleteItemHandler={deleteItemHandler}
          editItemHandler={editItemHandler}
          clearItemHandler={clearItemHandler}
        />
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
