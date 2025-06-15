import React, { useState } from "react";
import { useExpenses } from "../store/ExpenseContext";

export default function ExpenseList() {
  const { expenses, deleteExpense, saveExpense } = useExpenses();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditData({ ...expense });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveExpense(editData);
    setEditingId(null);
  };

  // Sort by latest date
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (expenses.length === 0)
    return <p className="text-center mt-5 text-gray-500">No expenses yet.</p>;

  return (
    <div className="mt-10 w-full max-w-6xl mx-auto px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedExpenses.map((exp) => (
          <div key={exp.id} className="bg-slate-100 p-4 rounded shadow">
            {editingId === exp.id ? (
              <div className="space-y-2">
                {["title", "amount", "category", "date", "notes"].map((field) => (
                <input
                key={field}
                name={field}
                type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                value={editData[field]}
                onChange={handleChange}
                placeholder={field}
                className="w-full border p-2 rounded"
              />
              
                ))}
                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 text-white py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-sm md:text-base">
                <p><strong>Title:</strong> {exp.title}</p>
                <p><strong>Amount:</strong> Rs. {exp.amount}</p>
                <p><strong>Category:</strong> {exp.category}</p>
                <p><strong>Date:</strong> {exp.date}</p>
                <p><strong>Notes:</strong> {exp.notes || "—"}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(exp)}
                    className="flex-1 bg-yellow-400 text-black py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
