import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
    loanName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    remarks:{
        type:String,
        required:false,

    },
    customerCode: {       
    type: String,
    required: true,
  },

},{ timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;