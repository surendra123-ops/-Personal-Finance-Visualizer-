const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Food",
      "Bills",
      "Transport",
      "Shopping",
      "Entertainment",
      "Other",
      "Travel",
    ],
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
