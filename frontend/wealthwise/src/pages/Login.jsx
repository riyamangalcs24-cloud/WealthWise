import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import '../login.css';

function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      return handleError('Please enter email and password');
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${APIUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        handleError(result.message || 'Login failed');
        return;
      }

      const token =
        result.jwtToken ||
        result.token ||
        result.data?.token;

      const user =
        result.name ||
        result.user?.name ||
        result.user?.email ||
        loginInfo.email;

      if (token) {
        localStorage.setItem('token', token);
      }

      localStorage.setItem('loggedInUser', user);

      handleSuccess(result.message || 'Login successful!');

      setTimeout(() => {
        navigate('/home');
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
            <p className="eyebrow">WELCOME BACK</p>

            <h1 className="auth-heading">Login to your account</h1>

            <p className="auth-subheading">
              Welcome back! Please enter your details.
            </p>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginInfo.email}
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
                    placeholder="Enter your password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    autoComplete="current-password"
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

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                className="login-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="auth-switch">
              Don't have an account?
              <Link to="/signup"> Sign up</Link>
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
                <span className="art-card-label">TOTAL BALANCE</span>
                <h2>₹ 84,250.00</h2>
                <div className="art-card-bottom">
                  <span>••••  4285</span>
                  <span>↗</span>
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
              <p className="visual-tagline">SMART MONEY. BETTER LIFE.</p>
              <h2>Take control of your money.</h2>
              <p>
                Track expenses, manage budgets and build better
                financial habits — all in one place.
              </p>
            </div>

            <div className="visual-dots">
              <span className="active-dot"></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default Login;