// components/BudgetForm.jsx
import { useState } from "react";
import { setBudget } from "../services/budgetApi";
import { Folder, DollarSign, Check, Calendar } from "lucide-react";

const categories = ["Food", "Bills", "Transport", "Shopping", "Entertainment", "Other"];

const BudgetForm = ({ month, onSave }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!month || !category || !amount) return;

    try {
      await setBudget({ month, category, amount: Number(amount) });
      setMessage("Budget saved!");
      onSave?.();

      setCategory("");
      setAmount("");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Budget save failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-slate-200"
    >
      <h2 className="font-semibold text-lg text-slate-800">Set Monthly Budget</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border rounded-xl text-slate-700">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span>
            {new Date(`${month}-01`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="₹ Amount"
          className="px-4 py-2 border rounded-xl"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        Save Budget
      </button>

      {message && (
        <div className="flex items-center space-x-2 text-green-600 text-sm pt-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
};

export default BudgetForm;
