const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all transactions
// GET all transactions (optionally filtered by month)
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
    res.json(transactions);
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
});



// POST a new transaction
// POST a new transaction
router.post("/", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;

    console.log("🧾 Incoming transaction:", req.body); // debug

    // ✅ Basic validation
    if (!amount || !description || !date || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Optional: force correct types
    const transaction = new Transaction({
      amount: Number(amount),
      description,
      date: new Date(date),
      category
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating transaction:", err);
    res.status(500).json({ error: err.message });
  }
});



// PUT (update) a transaction
router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
