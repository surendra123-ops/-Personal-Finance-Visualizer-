import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Receipt, Search } from "lucide-react";
import { useState } from "react";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  if (!Array.isArray(transactions)) return null;

  const filteredTransactions = transactions
    .filter((tx) =>
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return a.description.localeCompare(b.description);
      }
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
            <Receipt className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Transaction History
            </h2>
            <p className="text-sm text-slate-600">
              {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="description">Sort by Description</option>
        </select>
      </div>

      {/* Transaction Items */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4 mx-auto w-fit">
              <Receipt className="h-12 w-12 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium mb-2">
              {searchTerm ? "No transactions found" : "No transactions yet"}
            </p>
            <p className="text-sm text-slate-400">
              {searchTerm
                ? "Try adjusting your search term"
                : "Add your first transaction to get started"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredTransactions.map((tx, index) => (
              <motion.div
                key={tx._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:bg-white/70 transition-all duration-200"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium text-slate-900 truncate">
                    {tx.description}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-lg font-bold text-red-600 flex-shrink-0">
                    ₹{tx.amount.toLocaleString()}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(tx)}
                      className="p-2 rounded-lg bg-blue-100/70 text-blue-600 hover:bg-blue-200 transition-colors"
                      aria-label="Edit transaction"
                    >
                      <Pencil className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(tx._id)}
                      className="p-2 rounded-lg bg-red-100/70 text-red-600 hover:bg-red-200 transition-colors"
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionList;
