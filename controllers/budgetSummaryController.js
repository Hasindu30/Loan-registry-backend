import Income from "../models/income.js";
import Expense from "../models/expense.js";

export const getSummary = async (req, res) => {
  try {
    const totalIncomeResult = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpenseResult = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalIncome = totalIncomeResult[0]?.total || 0;
    const totalExpense = totalExpenseResult[0]?.total || 0;
    const budget = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      budget
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate summary", error: error.message });
  }
};