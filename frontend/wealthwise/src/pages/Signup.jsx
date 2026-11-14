import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import '../login.css';

function Signup() {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signupInfo.name || !signupInfo.email || !signupInfo.password) {
      return handleError('Please fill all the fields');
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${APIUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        handleError(result.message || 'Signup failed');
        return;
      }

      handleSuccess(result.message || 'Account created successfully!');

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      handleError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="auth-shell">

        <section className="auth-form-panel">
          <div className="ww-brand">
            <div className="ww-logo">W</div>
            <span className="brand-name">WealthWise</span>
          </div>

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="auth-form-content">
            <p className="eyebrow">GET STARTED</p>

            <h1 className="auth-heading">Create your account</h1>

            <p className="auth-subheading">
              Start your journey towards smarter money management.
            </p>

            <form className="login-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={signupInfo.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signupInfo.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="password-input-container">
                  <input
                    id="password"
                    className="form-input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                className="login-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-switch">
              Already have an account?
              <Link to="/login"> Login</Link>
            </div>
          </div>

          <p className="form-footer">
            © 2026 WealthWise. All rights reserved.
          </p>
        </section>

        <section className="auth-visual-panel">
          <div className="visual-brand">
            <span className="visual-brand-icon">W</span>
            WealthWise
          </div>

          <div className="visual-content">
            <div className="money-art">
              <div className="art-circle circle-one"></div>
              <div className="art-circle circle-two"></div>

              <div className="art-card">
                <span className="art-card-label">YOUR SAVINGS GOAL</span>
                <h2>₹ 50,000</h2>
                <div className="art-progress">
                  <span></span>
                </div>
                <div className="art-card-bottom">
                  <span>Goal progress</span>
                  <span>75%</span>
                </div>
              </div>

              <div className="art-floating-icon">₹</div>
              <div className="art-chart">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="visual-copy">
              <p className="visual-tagline">YOUR MONEY, YOUR FUTURE.</p>
              <h2>Make every rupee count.</h2>
              <p>
                Set financial goals, monitor your spending
                and take the first step towards financial freedom.
              </p>
            </div>

            <div className="visual-dots">
              <span></span>
              <span className="active-dot"></span>
              <span></span>
            </div>
          </div>
        </section>

      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Signup;