import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  DollarSign,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";

const EditTransactionModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setDescription(transaction.description);
      setDate(transaction.date.slice(0, 10));
    }
  }, [transaction]);

  const validateForm = () => {
    const newErrors = {};
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!date) {
      newErrors.date = "Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave({
        ...transaction,
        amount: Number(amount),
        description,
        date,
      });
      setErrors({});
    } catch (error) {
      console.error("Error updating transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-slate-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
              <h2 className="text-xl font-bold text-slate-900">
                Edit Transaction
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-slate-600" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <InputField
                label="Amount"
                type="number"
                placeholder="0.00"
                icon={<DollarSign className="h-4 w-4" />}
                value={amount}
                onChange={setAmount}
                error={errors.amount}
              />
              <InputField
                label="Description"
                type="text"
                placeholder="Coffee, lunch, groceries..."
                icon={<FileText className="h-4 w-4" />}
                value={description}
                onChange={setDescription}
                error={errors.description}
              />
              <InputField
                label="Date"
                type="date"
                icon={<Calendar className="h-4 w-4" />}
                value={date}
                onChange={setDate}
                error={errors.date}
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl
                    ${
                      isSubmitting
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InputField = ({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => (
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
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white/50 backdrop-blur-sm
          ${
            error
              ? "border-red-300 focus:border-red-500"
              : "border-slate-200 focus:border-blue-500"
          }
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

export default EditTransactionModal;
