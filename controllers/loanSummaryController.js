import loanSummary from "../models/loanSummary.js";

// Create Loan
export const createLoan = async (req, res) => {
  try {
    const { loanName, date, amount, remarks, customerCode} = req.body;

    if (!loanName || !date || amount === undefined || !customerCode) {
      return res.status(400).json({ message: "Loan name, date, and amount are required" });
    }

    const newLoan = new loanSummary({
      loanName,
      date,
      amount,
      remarks: remarks || "",
      customerCode,
    });

    await newLoan.save();
    res.status(201).json({ message: "Loan record created successfully", loan: newLoan });
  } catch (error) {
    console.error("Loan creation error:", error);
    res.status(500).json({ message: "Failed to create loan record", error: error.message });
  }
};

// Get All Loans
export const getAllLoans = async (req, res) => {
  try {
    const { search ,customerCode } = req.query;
    let query = {};

    if (customerCode) {
      query.customerCode = customerCode; // ✅ filter by customer
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [
          { loanName: { $regex: searchRegex } },
          { remarks: { $regex: searchRegex } },
          { date: { $regex: searchRegex } },
        ],
      };
    }

    const loans = await loanSummary.find(query).sort({ createdAt: -1 });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch loans", error: error.message });
  }
};

// Update Loan
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { loanName, date, amount, remarks } = req.body;

    if (!loanName || !date || amount === undefined) {
      return res.status(400).json({ message: "Loan name, date, and amount are required" });
    }

    const updatedLoan = await loanSummary.findByIdAndUpdate(
      id,
      { loanName, date, amount, remarks },
      { new: true, runValidators: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Failed to update loan", error: error.message });
  }
};

// Delete Loan
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLoan = await loanSummary.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete loan", error: error.message });
  }
};
