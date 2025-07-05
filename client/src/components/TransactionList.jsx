// components/TransactionList.jsx
import React from "react";
import { Trash2, Pencil } from "lucide-react";

const TransactionList = ({ transactions, onDelete, onEdit, month }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Transactions in {new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>
      {transactions.length === 0 ? (
        <p className="text-slate-500">No transactions available for this month.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {transactions.map((tx) => (
            <li key={tx._id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-800">{tx.description}</p>
                <p className="text-sm text-slate-500">
                  {new Date(tx.date).toLocaleDateString()} • {tx.category}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-blue-600">₹{tx.amount}</span>
                <button
                  onClick={() => onEdit(tx)}
                  className="text-indigo-500 hover:text-indigo-700 transition"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(tx._id)}
                  className="text-rose-500 hover:text-rose-700 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
