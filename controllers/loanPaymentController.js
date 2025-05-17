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

// UPDATE Payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ message: "Amount and date are required" });
    }

    const updatedPayment = await LoanPayment.findByIdAndUpdate(
      id,
      { amount, date },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment updated", payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment", error: error.message });
  }
};

// DELETE Payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LoanPayment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error: error.message });
  }
};
