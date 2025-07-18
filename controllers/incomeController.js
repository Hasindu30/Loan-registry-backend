import Income from "../models/income.js"; 


export const createIncome = async (req, res) => {
  try {
    const { date, name, amount } = req.body;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    if (amount === undefined) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const newIncome = await Income.create({ date, name, amount });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Income.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: "Income deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
