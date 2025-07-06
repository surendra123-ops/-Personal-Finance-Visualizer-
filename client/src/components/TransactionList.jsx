import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Pencil, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const TransactionList = ({ transactions, onDelete, onEdit, month }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'date') {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else if (sortBy === 'description') {
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
      } else if (sortBy === 'amount') {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sortBy === 'category') {
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return sorted;
  }, [transactions, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-4 w-4 text-slate-400" />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-blue-600" /> : 
      <ArrowDown className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Transactions in {new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        
        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <div className="flex space-x-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('date')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${sortBy === 'date' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <span>Date</span>
              {getSortIcon('date')}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('description')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${sortBy === 'description' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <span>Description</span>
              {getSortIcon('description')}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('amount')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${sortBy === 'amount' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <span>Amount</span>
              {getSortIcon('amount')}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('category')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${sortBy === 'category' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <span>Category</span>
              {getSortIcon('category')}
            </motion.button>
          </div>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <p className="text-slate-500">No transactions available for this month.</p>
      ) : (
        <div className="space-y-3">
          {sortedTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-4 bg-white/50 rounded-xl border border-slate-200/50 hover:bg-white/80 transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">{tx.description}</p>
                  <span className="font-semibold text-lg text-blue-600">₹{tx.amount}</span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-slate-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {tx.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(tx)}
                  className="p-2 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(tx.id)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;