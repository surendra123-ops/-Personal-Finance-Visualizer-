import { useState } from "react";
import { motion } from "framer-motion";

const AddTransactionForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount (must be a positive number).");
      return;
    }
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    if (!date) {
      alert("Date is required.");
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Add New Transaction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., 500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Rent"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium transition-all"
      >
        Add Transaction
      </button>
    </motion.form>
  );
};

export default AddTransactionForm;
