const mongoose = require('mongoose');
const User = require('./models/userModel'); // adjust path
const Expense = require('./models/expenseModel');

mongoose.connect('mongodb://localhost:27017/Expense') // replace with your DB
  .then(async () => {
    const user = new User({
      username: 'navin',
      email: 'navin@example.com',
      password: '123456' // no hashing here, just for mock data
    });

    const savedUser = await user.save();

    const expense = new Expense({
      user: savedUser._id,
      amount: 1000,
      type: 'expense',
      category: 'Books',
      note: 'Bought a JavaScript book'
    });

    await expense.save();

    console.log('User and expense saved');
    mongoose.disconnect();
  })
  .catch(console.error);
