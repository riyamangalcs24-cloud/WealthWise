
import React from 'react';

const ExpenseTable = ({ expenses, deleteExpens }) => {
  const formatAmount = (amount) =>
    Math.abs(Number(amount || 0)).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });

  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <div className="empty-transactions">
          <div className="empty-icon">₹</div>
          <h3>No transactions yet</h3>
          <p>Your added transactions will appear here.</p>
        </div>
      ) : (
        expenses.map((expense, index) => {
          const isIncome = Number(expense.amount) > 0;

          return (
            <div key={expense._id || index} className="expense-item">
              <div className={`transaction-icon ${isIncome ? 'income-icon' : 'expense-icon'}`}>
                {isIncome ? '↙' : '↗'}
              </div>

              <div className="expense-description">
                <strong>{expense.text}</strong>
                <span>{isIncome ? 'Income' : 'Expense'}</span>
              </div>

              <div className={`expense-amount ${isIncome ? 'positive-amount' : 'negative-amount'}`}>
                {isIncome ? '+' : '-'}₹{formatAmount(expense.amount)}
              </div>

              <button
                className="delete-button"
                onClick={() => deleteExpens(expense._id)}
                title="Delete transaction"
                aria-label="Delete transaction"
              >
                ×
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExpenseTable;