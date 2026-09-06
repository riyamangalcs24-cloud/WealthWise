// added successfully
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
    // State to store logged in user's name
    const [loggedInUser, setLoggedInUser] = useState('');
    // State to store list of expenses / transactions
    const [expenses, setExpenses] = useState([]);
    // State to store calculated income and expense amounts
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    // Dark mode state initialized from localStorage
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const navigate = useNavigate();

    // Toggle theme between dark and light mode
    const toggleDarkMode = () => {
        const nextMode = !darkMode;
        setDarkMode(nextMode);
        localStorage.setItem('theme', nextMode ? 'dark' : 'light');
    };

    // Retrieve logged-in user on component mount
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // Handle logout action
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    // Calculate total income and expense whenever expenses change
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    // Delete an expense by ID
    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            };
            const response = await fetch(url, headers);
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

    // Fetch all expenses for the authenticated user
    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    // Add a new transaction (income/expense)
    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            };
            const response = await fetch(url, headers);
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

    // Fetch user expenses on mount
    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className={`home-page ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <div className='home-card'>
                <div className='user-section'>
                    <h1>Welcome, <span className='user-name'>{loggedInUser}</span></h1>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                            className="theme-toggle-home"
                            onClick={toggleDarkMode}
                            aria-label="Toggle theme"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        <button className='logout-btn' onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <ExpenseDetails
                    incomeAmt={incomeAmt}
                    expenseAmt={expenseAmt}
                />

                <ExpenseForm
                    addTransaction={addTransaction} />

                <ExpenseTable
                    expenses={expenses}
                    deleteExpens={deleteExpens}
                />
            </div>
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
        </div>
    );
}

export default Home;
