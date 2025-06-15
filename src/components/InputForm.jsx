import React, { useState } from "react";
import { useExpenses } from "../store/ExpenseContext";
import { toast } from "react-toastify";

export default function InputForm() {
  const { addExpense } = useExpenses();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};
    const requiredFields = ["title", "amount", "date", "category"];

    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && !formData[field].trim())
      ) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.amount && Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      addExpense({ ...formData, amount: Number(formData.amount) });
      toast.success("Expense added!");

      // Reset form
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        notes: "",
      });
      setErrors({});
    } else {
      toast.error("Please fix the form errors");
    }
  }

  return (
    <div className="mx-auto flex justify-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] max-w-lg"
      >
        <label className="font-bold">Title</label>
        <input
          type="text"
          name="title"
          className="bg-slate-200 focus:outline-0 p-2"
          value={formData.title}
          onChange={handleChange}
          
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <label className="font-bold">Amount</label>
        <input
          type="number"
          name="amount"
          className="bg-slate-200 focus:outline-0 p-2"
          value={formData.amount}
          onChange={handleChange}
          
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

        <label className="font-bold">Choose a Category</label>
        <select
          name="category"
          className="bg-slate-200 focus:outline-0 p-2"
          value={formData.category}
          onChange={handleChange}
          
        >
          <option value="">Select a category</option>
          <option value="Grocery">Grocery</option>
          <option value="Utilities">Utilities</option>
          <option value="Transport">Transport</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <label className="font-bold">Date</label>
        <input
          type="date"
          name="date"
          className="bg-slate-200 focus:outline-0 p-2"
          value={formData.date}
          onChange={handleChange}
          
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        <label className="font-bold">Notes (optional)</label>
        <textarea
          rows={3}
          name="notes"
          className="bg-slate-200 focus:outline-0 p-2"
          value={formData.notes}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-700 text-white p-2 rounded hover:bg-green-600 mt-2"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
