// components/ExpenseChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Daily Expenses ({new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })})
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
