import { useEffect, useState } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import EditTransactionModal from "./components/EditTransactionModal";

import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./services/api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const handleAdd = async (tx) => {
  await addTransaction(tx);   // Save to backend
  await loadTransactions();   // Refresh full list
};



  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter((tx) => tx._id !== id));
  };

  const handleEditClick = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleSaveEdit = async (updatedTx) => {
    const result = await updateTransaction(updatedTx._id, updatedTx);
    setTransactions(
      transactions.map((t) => (t._id === result._id ? result : t))
    );
    setModalOpen(false); // close the modal
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Personal Finance Visualizer 💰
      </h1>

      <AddTransactionForm onAdd={handleAdd} />
      <ExpenseChart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />

      {/* ✅ Modal for Editing Transaction */}
      <EditTransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEdit}
        transaction={editingTx}
      />
    </div>
  );
}

export default App;
