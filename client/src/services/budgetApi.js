import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/budgets";

// Get all budgets for a month
export const getBudgetsByMonth = async (month) => {
  const res = await axios.get(`${API_URL}/${month}`);
  return res.data;
};

// Set/update a budget
export const setBudget = async (budget) => {
  const res = await axios.post(API_URL, budget);
  return res.data;
};
