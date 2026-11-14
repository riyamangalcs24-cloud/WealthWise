import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem('theme', nextMode ? 'dark' : 'light');
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');

    setTimeout(() => navigate('/login'), 1000);
  };

  useEffect(() => {
    const amounts = expenses.map(item => Number(item.amount));
    const income = amounts
      .filter(item => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const exp = amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1;

    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const response = await fetch(`${APIUrl}/expenses/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
        method: 'DELETE'
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${APIUrl}/expenses`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      setExpenses(result.data || []);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const response = await fetch(`${APIUrl}/expenses`, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      handleSuccess(result?.message);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={`wealth-dashboard ${darkMode ? 'dark-theme' : ''}`}>

      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="brand-symbol">W</span>
          <span>WealthWise</span>
        </div>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav">
          <a href="#overview" className="sidebar-link active">
            <span>▦</span> Overview
          </a>
          <a href="#transactions" className="sidebar-link">
            <span>↕</span> Transactions
          </a>
          <a href="#add-transaction" className="sidebar-link">
            <span>＋</span> Add Transaction
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <span className="help-icon">✦</span>
            <strong>Plan. Save. Grow.</strong>
            <p>Small steps create big financial changes.</p>
          </div>

          <button className="sidebar-logout" onClick={handleLogout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main" id="overview">

        <header className="dashboard-topbar">
          <div>
            <p className="topbar-date">YOUR PERSONAL FINANCE SPACE</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-actions">
            <button
              className="dashboard-theme-toggle"
              onClick={toggleDarkMode}
              title="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <div className="profile-chip">
              <div className="profile-avatar">
                {(loggedInUser || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{loggedInUser || 'User'}</strong>
                <span>My Account</span>
              </div>
            </div>
          </div>
        </header>

        <section className="welcome-hero">
          <div className="hero-copy">
            <span className="hero-tag">✦ FINANCIAL OVERVIEW</span>
            <h2>Welcome back, {loggedInUser || 'there'}!</h2>
            <p>
              Take charge of your money. Track your spending,
              grow your savings and make every rupee count.
            </p>
            <a href="#add-transaction" className="hero-button">
              + Add Transaction
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>
            <div className="hero-coin coin-one">₹</div>
            <div className="hero-coin coin-two">✦</div>
            <div className="hero-wallet">
              <div className="wallet-flap"></div>
              <div className="wallet-button"></div>
              <span>W</span>
            </div>
            <div className="hero-growth">↗</div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <p>AT A GLANCE</p>
              <h2>Your money overview</h2>
            </div>
            <span className="live-indicator">● Live overview</span>
          </div>

          <ExpenseDetails
            incomeAmt={incomeAmt}
            expenseAmt={expenseAmt}
          />
        </section>

        <section className="dashboard-content-grid">

          <div className="dashboard-panel form-panel" id="add-transaction">
            <div className="panel-heading">
              <div>
                <p>MANAGE YOUR MONEY</p>
                <h2>Add a transaction</h2>
              </div>
              <span className="panel-icon">＋</span>
            </div>

            <ExpenseForm addTransaction={addTransaction} />
          </div>

          <div className="dashboard-panel transactions-panel" id="transactions">
            <div className="panel-heading">
              <div>
                <p>YOUR ACTIVITY</p>
                <h2>Recent transactions</h2>
              </div>
              <span className="panel-icon">↕</span>
            </div>

            <ExpenseTable
              expenses={expenses}
              deleteExpens={deleteExpens}
            />
          </div>

        </section>

        <footer className="dashboard-footer">
          <span>WealthWise © 2026</span>
          <span>Plan • Save • Grow</span>
        </footer>

      </main>

      <ToastContainer theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
}

export default Home;