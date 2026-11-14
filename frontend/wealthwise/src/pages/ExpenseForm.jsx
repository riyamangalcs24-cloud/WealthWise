import React, { useState } from 'react';

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        text: '',
        amount: '',
        type: 'income'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpenseInfo({
            ...expenseInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!expenseInfo.text || !expenseInfo.amount) {
            return;
        }

        const amount = Number(expenseInfo.amount);

        // Income positive, Expense negative
        const finalAmount =
            expenseInfo.type === 'income' ? amount : -amount;

        addTransaction({
            text: expenseInfo.text,
            amount: finalAmount
        });

        setExpenseInfo({
            text: '',
            amount: '',
            type: 'income'
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Transaction Details</h3>

            <div>
                <label>Transaction Type</label>
                <select
                    name="type"
                    value={expenseInfo.type}
                    onChange={handleChange}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="text"
                    placeholder="e.g. Shopping, Salary, Food"
                    value={expenseInfo.text}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Amount (₹)</label>
                <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    min="0.01"
                    step="0.01"
                    value={expenseInfo.amount}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">
                + Add Transaction
            </button>
        </form>
    );
}

export default ExpenseForm;