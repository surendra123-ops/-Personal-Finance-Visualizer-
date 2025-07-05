import { useState } from "react";
import { motion } from "framer-motion"; // Optional, if using framer-motion

const AddTransactionForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!description.trim()) {
      alert("Description is required");
      return;
    }
    if (!date) {
      alert("Date is required");
      return;
    }

    onAdd({ amount: Number(amount), description, date });
    setAmount("");
    setDescription("");
    setDate("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-full mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Add New Transaction</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="e.g. Grocery, Rent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all w-full"
      >
        Add Transaction
      </button>
    </motion.form>
  );
};

export default AddTransactionForm;
