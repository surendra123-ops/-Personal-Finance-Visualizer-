import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

// Group by Month
const getMonthlyData = (transactions) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyTotals = {};

  // ✅ FIX: Check if transactions is an array
  if (!Array.isArray(transactions)) return [];

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = months[date.getMonth()];
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }
    monthlyTotals[month] += tx.amount;
  });

  return months.map((m) => ({
    month: m,
    total: monthlyTotals[m] || 0,
  }));
};


const ExpenseChart = ({ transactions }) => {
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="max-w-xl w-full mx-auto mt-8 bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Expenses
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
