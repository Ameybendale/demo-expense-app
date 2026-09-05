import React, { useEffect, useState } from 'react';
import './ExpenseList.css';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('all'); // all | received | paid

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch('http://localhost:3001/api/Expense')
      .then(res => res.json())
      .then(setExpenses)
      .catch(console.error);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/Expense/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Update state to remove the deleted expense
        setExpenses(prev => prev.filter(exp => exp._id !== id));
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredExpenses = expenses.filter((exp) => {
    if (filter === 'all') return true;
    if (filter === 'received') return exp.type === 'income';
    if (filter === 'paid') return exp.type === 'expense';
    return true;
  });

  return (
    <div className="expense-list">
      <div className="h2ex">
        <h2>Transactions</h2>
      </div>
      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'received' ? 'active' : ''}`}
          onClick={() => setFilter('received')}
        >
          Received
        </button>
        <button
          className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
          onClick={() => setFilter('paid')}
        >
          Paid
        </button>
      </div>
      <div className="expense-cards">
        {filteredExpenses.map((exp) => (
          <div className="expense-card" key={exp._id}>
            <div>
              <p>
                <strong>{exp.type === 'income' ? 'Received' : 'Paid'}</strong>
              </p>
              <div className="meta">{new Date(exp.date).toLocaleDateString()}</div>
            </div>
            <div>
              <p>
                <strong>₹{Number(exp.amount || 0).toLocaleString('en-IN')}</strong>
              </p>
            </div>
            <div>
              <button className="delete-btn" onClick={() => toggleExpanded(exp._id)}>
                {expandedId === exp._id ? 'Hide' : 'View'}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
            {expandedId === exp._id && (
              <div className="after-view">
                <p>
                  <strong>Category:</strong> {exp.category}
                </p>
                <p>
                  <strong>Note:</strong> {exp.note}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
