import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const ExpenseContext = createContext();

// Provider component
export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      try {
        setExpenses(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse expenses from localStorage", e);
      }
    }
  }, []);

  // Save to localStorage on expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense
  const addExpense = (data) => {
    const newExpense = {
      ...data,
      id: Date.now(), // simple unique ID
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Set currently editing ID
  const startEditing = (id) => {
    setEditingId(id);
  };
  // Save edited expense
  const saveExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setEditingId(null);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        editingId,
        startEditing,
        saveExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

// Hook to use context
export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used inside ExpenseProvider");
  }
  return context;
}
