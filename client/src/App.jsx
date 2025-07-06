import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, BarChart3, TrendingUp } from "lucide-react";

// Components
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import EditTransactionModal from "./components/EditTransactionModal";
import BudgetForm from "./components/BudgetForm";
import BudgetChart from "./components/BudgetChart";
import CategoryPieChart from "./components/CategoryPieChart";
import ExpenseChart from "./components/ExpenseChart";
import MonthSelector from "./components/MonthSelector";
import StatsCards from "./components/StatsCards";

// Services
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
} from "./services/api";
import { setBudget, getBudgets, getAllBudgets } from "./services/budgetApi";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allTransactions, allBudgets] = await Promise.all([
          getAllTransactions(),
          getAllBudgets(),
        ]);
        setTransactions(allTransactions);
        setBudgets(allBudgets);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(tx =>
    tx.date.startsWith(currentMonth)
  );

  // Handle adding new transaction
  const handleAddTransaction = async (transactionData) => {
    try {
      const newTransaction = await addTransaction(transactionData);
      setTransactions(prev => [...prev, newTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Handle editing transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Handle updating transaction
  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      const updated = await updateTransaction(updatedTransaction.id, updatedTransaction);
      setTransactions(prev =>
        prev.map(tx => (tx.id === updated.id ? updated : tx))
      );
      setIsEditModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // Handle deleting transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // Handle budget save
  const handleBudgetSave = async () => {
    try {
      const updatedBudgets = await getBudgets(currentMonth);
      setBudgets(prev => {
        const filtered = prev.filter(b => b.month !== currentMonth);
        return [...filtered, ...updatedBudgets];
      });
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">ExpenseTracker</h1>
                <p className="text-slate-600">Manage your finances with ease</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">
                  {currentMonthTransactions.length} transactions this month
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Month Selector */}
          <MonthSelector
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />

          {/* Stats Cards */}
          <StatsCards
            transactions={currentMonthTransactions}
            budgets={budgets}
            month={currentMonth}
          />

          {/* Add Transaction Form */}
          <AddTransactionForm
            onAdd={handleAddTransaction}
            month={currentMonth}
          />

          {/* Budget Form */}
          <BudgetForm
            month={currentMonth}
            onSave={handleBudgetSave}
          />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExpenseChart
              transactions={currentMonthTransactions}
              month={currentMonth}
            />
            <CategoryPieChart
              transactions={currentMonthTransactions}
              month={currentMonth}
            />
          </div>

          {/* Budget Chart */}
          <BudgetChart
            budgets={budgets}
            transactions={transactions}
            month={currentMonth}
          />

          {/* Transaction List */}
          <TransactionList
            transactions={currentMonthTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            month={currentMonth}
          />
        </div>
      </main>

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleUpdateTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
}

export default App;