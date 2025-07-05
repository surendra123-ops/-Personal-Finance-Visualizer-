const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");

// GET all budgets for a given month
router.get("/:month", async (req, res) => {
  try {
    const month = req.params.month; // format: "2025-07"
    const budgets = await Budget.find({ month });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or UPDATE a budget for a category in a given month
router.post("/", async (req, res) => {
  try {
    const { month, category, amount } = req.body;

    const existing = await Budget.findOneAndUpdate(
      { month, category },
      { amount },
      { new: true, upsert: true }
    );

    res.status(200).json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
