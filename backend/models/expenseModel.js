const mongoose = require('mongoose');
const { type } = require('os');

const ExpenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    note:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Expense = mongoose.model('Expense',ExpenseSchema);
module.exports = Expense;