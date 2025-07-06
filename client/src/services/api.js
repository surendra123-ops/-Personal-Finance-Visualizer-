import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/transactions";

// Get transactions by month (optional)
export const getTransactions = async (month) => {
  const res = await axios.get(API_URL, {
    params: month ? { month } : {},
  });
  return res.data;
};

// ✅ NEWLY ADDED: Get all transactions (no filter)
export const getAllTransactions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTransaction = async (tx) => {
  // console.log("🚀 Sending transaction:", tx);
  const res = await axios.post(API_URL, tx);
  return res.data;
};

export const deleteTransaction = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTransaction = async (id, tx) => {
  const res = await axios.put(`${API_URL}/${id}`, tx);
  return res.data;
};
