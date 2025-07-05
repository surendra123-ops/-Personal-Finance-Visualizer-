import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/transactions";

export const getTransactions = async (month) => {
  const res = await axios.get(API_URL, {
    params: month ? { month } : {}, // only add if provided
  });
  return res.data;
};


export const addTransaction = async (tx) => {
  console.log("🚀 Sending transaction:", tx); // <-- Add this
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
