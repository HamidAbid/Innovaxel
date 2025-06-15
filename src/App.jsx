// src/App.jsx
import React from "react";
import InputForm from "./components/InputForm";
import ExpenseList from "./components/ExpenseList";
import Chart  from "./components/Chart";

function App() {
  return (
    
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
        <InputForm />
        <ExpenseList />
        <Chart/>
      </div>
    
  );
}

export default App;
