import { Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  if (!Array.isArray(transactions)) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full mt-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic py-10">
          No transactions found. Start by adding one 🚀
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {transactions.map((tx) => (
              <motion.li
                key={tx._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4"
              >
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{tx.description}</p>
                  <small className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </small>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">
                    ₹{tx.amount.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => onEdit(tx)}
                    className="p-2 rounded-full text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(tx._id)}
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
