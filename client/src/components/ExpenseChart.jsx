import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
    monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
  });

  return months.map((month) => ({
    month,
    total: monthlyTotals[month] || 0
  }));
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-blue-600 dark:text-blue-300">₹{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ExpenseChart = ({ transactions }) => {
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="w-full mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Monthly Expenses Overview</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic py-12">
          Add some transactions to see your monthly trends 📊
        </p>
      ) : (
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#8884d8" className="text-sm dark:text-gray-300" />
              <YAxis stroke="#8884d8" className="text-sm dark:text-gray-300" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="#3b82f6" barSize={30} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
