import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/Expense')
      .then((res) => res.json())
      .then((data) => {
        const income = data
          .filter((item) => item.type === 'income')
          .reduce((sum, i) => sum + Number(i.amount || 0), 0);
        const expense = data
          .filter((item) => item.type === 'expense')
          .reduce((sum, i) => sum + Number(i.amount || 0), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
      })
      .catch(console.error);
  }, []);

  const balance = totalIncome - totalExpense;
  const formatCurrency = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="dashboard">
      <h2 className="section-title">Overview</h2>
      <div className="stats">
        <div className="stat">
          <div className="stat-label">Total Income</div>
          <div className="stat-value">{formatCurrency(totalIncome)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Total Expense</div>
          <div className="stat-value">{formatCurrency(totalExpense)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Balance</div>
          <div className="stat-value">{formatCurrency(balance)}</div>
        </div>
      </div>
    </div>
  );
}
