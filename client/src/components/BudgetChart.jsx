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
  // ✅ Ensure budgets is an array
  const safeBudgets = Array.isArray(budgets) ? budgets : [];

  // Create budget map from categories
  const budgetMap = {};
  safeBudgets.forEach((b) => {
    if (b.month === month) {
      budgetMap[b.category] = b.amount;
    }
  });

  // Group actual spending by category
  const actuals = {};
  transactions
    .filter((tx) => tx.date?.startsWith(month))
    .forEach((tx) => {
      const cat = tx.category || "Other";
      if (!actuals[cat]) actuals[cat] = 0;
      actuals[cat] += tx.amount || 0;
    });

  // Union of categories
  const categories = Array.from(
    new Set([...Object.keys(budgetMap), ...Object.keys(actuals)])
  );

  // Create chart data
  const chartData = categories.map((category) => ({
    category,
    Budget: budgetMap[category] || 0,
    Actual: actuals[category] || 0,
  }));

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
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
