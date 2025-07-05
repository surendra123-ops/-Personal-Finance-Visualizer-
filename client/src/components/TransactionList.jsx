import { Pencil, Trash2 } from "lucide-react";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  // ✅ Guard clause to prevent .map error
  if (!Array.isArray(transactions)) return null;

  return (
    <div className="max-w-xl w-full mx-auto mt-8 bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No transactions found. Start by adding one! 🚀
        </p>
      ) : (
        <ul className="divide-y">
          {transactions.map((tx) => (
            <li key={tx._id} className="flex justify-between items-center py-3">
              <div>
                <p className="text-gray-800 font-medium">{tx.description}</p>
                <small className="text-gray-500">
                  {new Date(tx.date).toLocaleDateString("en-IN")}
                </small>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-blue-600">₹{tx.amount}</span>
                <button
                  onClick={() => onEdit(tx)}
                  className="text-yellow-500 hover:text-yellow-600 transition-all"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(tx._id)}
                  className="text-red-500 hover:text-red-600 transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
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
