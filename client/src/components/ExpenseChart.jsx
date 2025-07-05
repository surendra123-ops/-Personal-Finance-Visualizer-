// components/ExpenseChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ transactions, month }) => {
  const data = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const day = date.getDate();
    const dayLabel = `${day < 10 ? "0" + day : day}`;

    const existing = acc.find((d) => d.day === dayLabel);
    if (existing) {
      existing.amount += tx.amount;
    } else {
      acc.push({ day: dayLabel, amount: tx.amount });
    }

    return acc;
  }, []);

  // Sort by day
  data.sort((a, b) => a.day - b.day);

  const monthLabel = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Generate placeholder data if no transactions
  const generatePlaceholderData = () => {
    const daysInMonth = new Date(month.split("-")[0], month.split("-")[1], 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: (i + 1).toString().padStart(2, "0"),
      amount: 0,
    }));
  };

  const chartData = data.length === 0 ? generatePlaceholderData() : data;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Daily Expenses ({monthLabel})
      </h2>
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
        {data.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 pointer-events-none">
            No transactions yet for this month.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
