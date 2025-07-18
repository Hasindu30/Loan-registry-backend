import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
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

export default mongoose.model('Income', incomeSchema);
