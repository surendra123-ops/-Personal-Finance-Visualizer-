const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// 🟢 GET all transactions (optionally filtered by month)
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    let query = {};

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      query.date = {
        $gte: start,
        $lt: end,
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    // 🧠 Normalize _id to id
    const normalized = transactions.map(tx => ({
      id: tx._id,
      amount: tx.amount,
      description: tx.description,
      date: tx.date,
      category: tx.category,
    }));

    res.json(normalized);
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST a new transaction
router.post("/", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;

    // console.log("🧾 Incoming transaction:", req.body);

    if (!amount || !description || !date || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transaction = new Transaction({
      amount: Number(amount),
      description,
      date: new Date(date),
      category,
    });

    const saved = await transaction.save();

    // 🧠 Normalize _id to id
    const response = {
      id: saved._id,
      amount: saved.amount,
      description: saved.description,
      date: saved.date,
      category: saved.category,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error("❌ Error creating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟢 PUT (update) a transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Normalize _id to id
    const response = {
      id: updated._id,
      amount: updated.amount,
      description: updated.description,
      date: updated.date,
      category: updated.category,
    };

    res.json(response);
  } catch (err) {
    console.error("❌ Error updating transaction:", err);
    res.status(400).json({ error: err.message });
  }
});

// 🟢 DELETE a transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(204).send(); // No Content
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
