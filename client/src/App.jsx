import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  PlusCircle,
  Clock,
} from "lucide-react";

import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import CategoryPieChart from "./components/CategoryPieChart";
import EditTransactionModal from "./components/EditTransactionModal";
import BudgetForm from "./components/BudgetForm";
import BudgetChart from "./components/BudgetChart";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./services/api";

import {
  getBudgetsByMonth as getBudgets,
  setBudget as addBudget,
} from "./services/budgetApi"; // ✅ correct source


function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const month = "2025-07"; // Static month for now; make dynamic if needed

  useEffect(() => {
    loadTransactions();
    loadBudgets();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBudgets = async () => {
    try {
      const data = await getBudgets(month);
      setBudgets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

  const handleAdd = async (tx) => {
    try {
      await addTransaction(tx);
      await loadTransactions();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEditClick = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleSaveEdit = async (updatedTx) => {
    try {
      const result = await updateTransaction(updatedTx._id, updatedTx);
      setTransactions((prev) =>
        prev.map((t) => (t._id === result._id ? result : t))
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleBudgetSave = async (budget) => {
    try {
      await addBudget({ ...budget, month });
      await loadBudgets();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  const totalExpenses = transactions.reduce(
    (sum, tx) => sum + (tx.amount || 0),
    0
  );
  const monthlyAverage = transactions.length > 0 ? totalExpenses / 12 : 0;
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-500">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Finance Tracker
                  </h1>
                  <p className="text-sm text-slate-600 hidden sm:block">
                    Manage your expenses beautifully
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Add Transaction</span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Stats */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <StatCard
              title="Total Expenses"
              value={`₹${totalExpenses.toLocaleString()}`}
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              gradient="from-rose-500 to-pink-500"
            />
            <StatCard
              title="Monthly Average"
              value={`₹${monthlyAverage.toLocaleString()}`}
              icon={<Wallet className="h-6 w-6 text-white" />}
              gradient="from-emerald-500 to-teal-500"
            />
            <StatCard
              title="Total Transactions"
              value={transactions.length}
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              gradient="from-blue-500 to-indigo-500"
            />
          </motion.div>

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <AddTransactionForm onAdd={handleAdd} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Charts */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="xl:col-span-1">
                <ExpenseChart transactions={transactions} />
                <div className="mt-8">
                  <CategoryPieChart transactions={transactions} />
                </div>

                {/* Budget Section */}
                <div className="mt-8 space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Budget Settings
                  </h2>
                  <BudgetForm onSave={handleBudgetSave} />
                  <BudgetChart
                    budgets={budgets}
                    transactions={transactions}
                    month={month}
                  />
                </div>
              </div>

              <div className="xl:col-span-1">
                <TransactionList
                  transactions={transactions}
                  onDelete={handleDelete}
                  onEdit={handleEditClick}
                />
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          {!isLoading && recentTransactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Recent Transactions
              </h2>
              <ul className="space-y-2">
                {recentTransactions.map((tx) => (
                  <li
                    key={tx._id}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-slate-200/50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-slate-800 font-medium">
                          {tx.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(tx.date).toLocaleDateString()} &middot;{" "}
                          {tx.category}
                        </p>
                      </div>
                      <p className="font-semibold text-blue-600">
                        ₹{tx.amount}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Edit Modal */}
        <EditTransactionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEdit}
          transaction={editingTx}
        />

        {/* Scroll to top */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 lg:hidden"
          aria-label="Scroll to top"
        >
          <TrendingUp className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-3 bg-gradient-to-r ${gradient} rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default App;
