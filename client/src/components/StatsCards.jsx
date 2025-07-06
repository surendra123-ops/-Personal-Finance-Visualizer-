import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const StatsCards = ({ transactions, budgets, month }) => {
  // ✅ Ensure budgets is an array
  const safeBudgets = Array.isArray(budgets) ? budgets : [];

  // Calculate total expenses for the month
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Calculate total budget for the month
  const totalBudget = safeBudgets
    .filter(b => b.month === month)
    .reduce((sum, b) => sum + b.amount, 0);

  // Calculate budget utilization
  const budgetUtilization =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  // Calculate average daily spending
  const [year, monthIndex] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthIndex, 0).getDate();
  const avgDaily = totalExpenses / daysInMonth;

  const stats = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: DollarSign,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      title: "Total Budget",
      value: `₹${totalBudget.toLocaleString()}`,
      icon: PieChart,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Budget Used",
      value: `${budgetUtilization.toFixed(1)}%`,
      icon: budgetUtilization > 100 ? TrendingUp : TrendingDown,
      color:
        budgetUtilization > 100
          ? "from-red-500 to-pink-600"
          : "from-green-500 to-emerald-600",
      bgColor: budgetUtilization > 100 ? "bg-red-50" : "bg-green-50",
      textColor: budgetUtilization > 100 ? "text-red-700" : "text-green-700",
    },
    {
      title: "Avg Daily",
      value: `₹${avgDaily.toFixed(0)}`,
      icon: TrendingUp,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 ${stat.bgColor}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{stat.title}</p>
              <p className={`text-2xl font-bold text-slate-900 mt-1 ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
