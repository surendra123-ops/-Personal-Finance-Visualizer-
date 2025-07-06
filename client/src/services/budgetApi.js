// services/budgetApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/budgets";

// Add or update a budget
export const setBudget = async (budgetData) => {
  const res = await axios.post(API_URL, budgetData);
  return res.data; // expected to return updated month budgets
};

// Get all budgets for a specific month
export const getBudgets = async (month) => {
  const res = await axios.get(`${API_URL}/${month}`);
  return res.data; // array of budgets for the month
};

// Get all budgets (no filter)
export const getAllBudgets = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
