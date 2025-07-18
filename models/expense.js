import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
    amount: {
    type: Number,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
