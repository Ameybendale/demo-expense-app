import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import './ExpenseHome.css';
import { useNavigate } from 'react-router-dom';


export default function ExpenseHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="main container app-shell">
      <div className="topbar">
        <div className="title">Transactions</div>
        <div className="tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          >
            Add
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          >
            List
          </button>
        </div>
        <div>
          <button onClick={logout} className="btn btn-ghost">Logout</button>
        </div>
      </div>

      <div className="content-wrap">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'add' && <AddExpense />}
        {activeTab === 'list' && <ExpenseList />}
      </div>
    </div>
  );
}
