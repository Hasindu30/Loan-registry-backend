import mongoose from 'mongoose';

const loanPaymentSchema = new mongoose.Schema({
  customerCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });


const LoanPayment = mongoose.model('LoanPayment', loanPaymentSchema);

export default LoanPayment;