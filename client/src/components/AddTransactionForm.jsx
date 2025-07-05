// components/AddTransactionForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, DollarSign, FileText, Calendar, AlertCircle, Folder
} from "lucide-react";

// Static categories for now
const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"];

const AddTransactionForm = ({ onAdd, month }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMonthLimits = (monthStr) => {
    const [year, month] = monthStr.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    return {
      minDate: start.toISOString().split("T")[0],
      maxDate: end.toISOString().split("T")[0],
    };
  };

  const { minDate, maxDate } = getMonthLimits(month);

  const validateForm = () => {
    const newErrors = {};
    if (!amount || isNaN(amount) || Number(amount) <= 0) newErrors.amount = "Please enter a valid amount";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    else if (date < minDate || date > maxDate)
      newErrors.date = `Date must be between ${minDate} and ${maxDate}`;
    if (!category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await onAdd({ amount: Number(amount), description, date, category });
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("");
      setErrors({});
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
          <Plus className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Add New Transaction</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="Amount"
            icon={<DollarSign className="h-4 w-4" />}
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={setAmount}
            error={errors.amount}
          />
          <FormField
            label="Description"
            icon={<FileText className="h-4 w-4" />}
            type="text"
            placeholder="Coffee, lunch, groceries..."
            value={description}
            onChange={setDescription}
            error={errors.description}
          />
          <FormField
            label="Date"
            icon={<Calendar className="h-4 w-4" />}
            type="date"
            value={date}
            onChange={setDate}
            error={errors.date}
            min={minDate}
            max={maxDate}
          />
        </div>

        {/* Category dropdown */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
            <Folder className="h-4 w-4" />
            <span>Category</span>
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-slate-900
                ${errors.category ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}
                focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-500 text-xs"
              >
                <AlertCircle className="h-3 w-3" />
                <span>{errors.category}</span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl
              ${isSubmitting
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add Transaction</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const FormField = ({ label, icon, type, placeholder, value, onChange, error, min, max }) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
      {icon}
      <span>{label}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm
          ${error ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400`}
      />
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-500 text-xs"
        >
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  </div>
);

export default AddTransactionForm;
