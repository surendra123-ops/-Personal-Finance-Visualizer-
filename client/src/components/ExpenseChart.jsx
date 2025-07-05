import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

// Format and group data by month
const getMonthlyData = (transactions) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthlyTotals = {};

  if (!Array.isArray(transactions)) return [];

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = months[date.getMonth()];
    if (!monthlyTotals[month]) monthlyTotals[month] = 0;
    monthlyTotals[month] += tx.amount;
  });

  return months.map((month) => ({
    month,
    total: monthlyTotals[month] || 0,
  }));
};

// Custom Tooltip for Bar Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/50 rounded-xl p-3 shadow-lg">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-lg font-bold text-blue-600">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseChart = ({ transactions }) => {
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);
  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);
  const highestMonth = data.reduce(
    (max, item) => (item.total > max.total ? item : max),
    { total: 0 }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Monthly Expenses
            </h2>
            <p className="text-sm text-slate-600">
              Track your spending patterns
            </p>
          </div>
        </div>

        {highestMonth.total > 0 && (
          <div className="text-right">
            <p className="text-xs text-slate-500">Highest</p>
            <p className="text-sm font-semibold text-slate-900">
              {highestMonth.month} - ₹{highestMonth.total.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Chart Body */}
      <div className="h-80">
        {data.some((item) => item.total > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="total"
                fill="url(#gradient)"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4">
              <TrendingUp className="h-12 w-12 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium mb-2">
              No expense data yet
            </p>
            <p className="text-sm text-slate-400">
              Add some transactions to see your spending patterns
            </p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {totalExpenses > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200/50">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Total Expenses</span>
            <span className="font-bold text-slate-900">
              ₹{totalExpenses.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExpenseChart;
