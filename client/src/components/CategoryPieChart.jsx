import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

// Predefined colors for categories
const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#6366f1", "#ec4899", "#14b8a6", "#8b5cf6",
];

// Group by category
const getCategoryData = (transactions) => {
  const grouped = {};
  transactions.forEach((tx) => {
    const category = tx.category || "Uncategorized";
    if (!grouped[category]) grouped[category] = 0;
    grouped[category] += tx.amount;
  });

  return Object.keys(grouped).map((cat) => ({
    name: cat,
    value: grouped[cat],
  }));
};

const RADIAN = Math.PI / 180;

// Optional label render
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CategoryPieChart = ({ transactions }) => {
  const data = getCategoryData(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);

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
          <div className="p-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-xl">
            <PieIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Category Breakdown</h2>
            <p className="text-sm text-slate-600">See where your money goes</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4">
              <BarChart3 className="h-12 w-12 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium mb-2">No category data</p>
            <p className="text-sm text-slate-400">Add transactions with categories to visualize them</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPieChart;
