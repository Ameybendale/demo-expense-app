const Expense = require('../models/expenseModel');
exports.createExpense = async(req,res)=>{
    try {
        const {user,amount,type,category,note,date} = req.body;

        const newExpense = new Expense({
            user,
            amount,
            type,
            category,
            note,
            date
            
        });
        await newExpense.save();
        res.status(201).json({
            message:"Expense created successfully",
            Expense:newExpense,
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error creating expense",
            error:error.message
        })
        
    }
}

exports.getExpenses = async(req,res)=>{
    try {
        const expenses = await Expense.find();
        res.status(201).json(expenses)
    } catch (error) {
        res.status(500).json({
            message:"Error fetching expenses",
            error:error.message
        })
        
    }
}
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};
