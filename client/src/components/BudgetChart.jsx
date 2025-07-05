// components/BudgetChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const BudgetChart = ({ budgets = [], transactions = [], month }) => {
  const budgetMap = {};
  budgets.forEach((b) => {
    if (b.month === month) {
      budgetMap[b.category] = b.amount;
    }
  });

  const actuals = {};
  transactions
    .filter((tx) => tx.date?.startsWith(month))
    .forEach((tx) => {
      const cat = tx.category || "Other";
      if (!actuals[cat]) actuals[cat] = 0;
      actuals[cat] += tx.amount || 0;
    });

  const categories = Array.from(
    new Set([...Object.keys(budgetMap), ...Object.keys(actuals)])
  );

  const chartData = categories.map((category) => ({
    category,
    Budget: budgetMap[category] || 0,
    Actual: actuals[category] || 0,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Budget vs Actual Spending ({month})
      </h2>
      {chartData.length === 0 ? (
        <p className="text-slate-500">No data to display for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Actual" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BudgetChart;
