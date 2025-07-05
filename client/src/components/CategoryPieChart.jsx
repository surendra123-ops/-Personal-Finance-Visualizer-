// components/CategoryPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#ff6b81",
  "#36a2eb",
  "#9966ff",
  "#00C49F",
];

const CategoryPieChart = ({ transactions, month }) => {
  const data = transactions.reduce((acc, tx) => {
    const existing = acc.find((d) => d.category === tx.category);
    if (existing) {
      existing.amount += tx.amount;
    } else {
      acc.push({ category: tx.category, amount: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Expenses by Category ({new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })})
      </h2>
      {data.length === 0 ? (
        <p className="text-slate-500">No data available for this month.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
