import React from 'react';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
  const balance = incomeAmt - expenseAmt;
  const total = incomeAmt + expenseAmt;
  const spendingPercent = total > 0
    ? Math.min((expenseAmt / total) * 100, 100)
    : 0;

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });

  return (
    <div className="finance-overview">

      <div className="balance-card">
        <div className="balance-card-top">
          <span>◈</span>
          <span className="balance-label">TOTAL BALANCE</span>
          <span className="balance-decoration">✦</span>
        </div>

        <h2>₹ {formatAmount(balance)}</h2>

        <p>Your available balance</p>

        <div className="balance-card-bottom">
          <span>✦ Plan your finances wisely</span>
          <span className="balance-arrow">↗</span>
        </div>
      </div>

      <div className="metric-card income-card">
        <div className="metric-top">
          <span className="metric-icon">↙</span>
          <span>INCOME</span>
        </div>
        <h2>₹ {formatAmount(incomeAmt)}</h2>
        <p>Total money received</p>
        <div className="metric-decoration">↗</div>
      </div>

      <div className="metric-card expense-card">
        <div className="metric-top">
          <span className="metric-icon">↗</span>
          <span>EXPENSES</span>
        </div>
        <h2>₹ {formatAmount(expenseAmt)}</h2>
        <p>Total money spent</p>
        <div className="metric-decoration">₹</div>
      </div>

      <div className="spending-card">
        <div className="spending-heading">
          <span>SPENDING SNAPSHOT</span>
          <span>◉</span>
        </div>

        <div
          className="spending-donut"
          style={{
            background: `conic-gradient(#c6f36b 0% ${spendingPercent}%, #e5eee9 ${spendingPercent}% 100%)`
          }}
        >
          <div className="donut-inner">
            <strong>{Math.round(spendingPercent)}%</strong>
            <span>Spent</span>
          </div>
        </div>

        <div className="spending-legend">
          <span><i className="legend-income"></i> Income</span>
          <span><i className="legend-expense"></i> Expense</span>
        </div>
      </div>

    </div>
  );
}

export default ExpenseDetails;