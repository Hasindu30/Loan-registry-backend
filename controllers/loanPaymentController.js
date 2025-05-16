import LoanPayment from "../models/loanPayment.js";

export const createPayment = async (req, res) => {
  try {
    const { customerCode, date, amount } = req.body;
    if (!customerCode || !date || amount === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPayment = new LoanPayment({ customerCode, date, amount });
    await newPayment.save();
    res.status(201).json({ message: "Payment added", payment: newPayment });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment", error: err.message });
  }
};

// Get Payments by Customer
export const getPaymentsByCustomer = async (req, res) => {
  try {
    const { customerCode } = req.query; 
    if (!customerCode) {
      return res.status(400).json({ message: "customerCode is required" });
    }

    const payments = await LoanPayment.find({ customerCode }).sort({ date: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};