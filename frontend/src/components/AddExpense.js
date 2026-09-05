import React, { useState } from 'react';
import './AddExpense.css';

export default function AddExpense() {
  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    note: '',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("Please log in first");
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/Expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user: userId }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Error adding expense');
    }
  };

  return (
    <div className='addex'>
      <h2>Add Transaction</h2>
      <div className="form-group">
      <form className="add-expense-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="income">Received</option>
          <option value="expense">Paid</option>
        </select>
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          placeholder="Note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Save</button>
      </form>
      </div>
    </div>
  );
}
