const express = require('express');
const {
  createExpense,
  getExpenses,
  deleteExpense
} = require('../controllers/expensecontroller');

const router = express.Router();

router.post('/', createExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpense); // ✅ Add this line

module.exports = router;
