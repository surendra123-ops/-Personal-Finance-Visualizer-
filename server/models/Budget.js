const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  month: {
    type: String, // e.g. "2025-07"
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Bills", "Transport", "Shopping", "Entertainment", "Other"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

budgetSchema.index({ month: 1, category: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model("Budget", budgetSchema);
