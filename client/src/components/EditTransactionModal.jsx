import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditTransactionModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setDescription(transaction.description);
      setDate(new Date(transaction.date).toISOString().slice(0, 10));
    }
  }, [transaction]);

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
    onSave({ ...transaction, amount: Number(amount), description, date });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Edit Transaction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Amount"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Description"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditTransactionModal;
