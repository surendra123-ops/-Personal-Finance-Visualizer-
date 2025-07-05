import { useEffect, useState } from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import EditTransactionModal from "./components/EditTransactionModal";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "./services/api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(Array.isArray(data) ? data : []);
  };

  const handleAdd = async (tx) => {
    await addTransaction(tx);
    await loadTransactions();
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
    setTransactions(transactions.map((t) => (t._id === result._id ? result : t)));
    setModalOpen(false);
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all duration-300 font-sans`}>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 sm:mb-0">
            Personal Finance Visualizer 💰
          </h1>
          <button
            className="flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <section>
            <AddTransactionForm onAdd={handleAdd} />
            <ExpenseChart transactions={transactions} />
          </section>
          <section>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          </section>
        </main>

        <EditTransactionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEdit}
          transaction={editingTx}
        />
      </div>

      <button
        onClick={() => document.getElementById("scroll-top").scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 md:hidden"
      >
        ⬆️
      </button>

      <div id="scroll-top"></div>
    </div>
  );
}

export default App;
