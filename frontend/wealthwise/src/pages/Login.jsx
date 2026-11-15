
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import '../login.css';


const slides = [
  {
    tagline: "SMART MONEY. BETTER LIFE.",
    title: "Take control of your money.",
    description:
      "Track expenses, manage budgets and build better financial habits — all in one place.",
    cardLabel: "TOTAL BALANCE",
    balance: "₹ 84,250.00",
    cardNumber: "•••• 4285",
    icon: "₹",
    chart: [18, 30, 25, 45, 35, 55, 65]
  },
  {
    tagline: "BUDGET SMARTER. LIVE BETTER.",
    title: "Manage your budget with ease.",
    description:
      "Set spending limits, monitor expenses and stay on top of your financial goals.",
    cardLabel: "MONTHLY EXPENSES",
    balance: "₹ 24,850.00",
    cardNumber: "FOOD • SHOPPING",
    icon: "↘",
    chart: [45, 25, 55, 35, 60, 40, 50]
  },
  {
    tagline: "SAVE TODAY. GROW TOMORROW.",
    title: "Build a better financial future.",
    description:
      "Track your savings, develop smarter habits and achieve your financial dreams.",
    cardLabel: "TOTAL SAVINGS",
    balance: "₹ 1,25,000",
    cardNumber: "+18.5% GROWTH",
    icon: "↗",
    chart: [15, 25, 32, 40, 48, 58, 70]
  }
];


function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
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

            <h1 className="auth-heading">
              Login to your account
            </h1>

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

                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
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
                <span className="art-card-label">
                  {slides[activeSlide].cardLabel}
                </span>

                <h2>{slides[activeSlide].balance}</h2>

                <div className="art-card-bottom">
                  <span>{slides[activeSlide].cardNumber}</span>
                  <span>{slides[activeSlide].icon}</span>
                </div>
              </div>

              <div className="art-floating-icon">{slides[activeSlide].icon}</div>

              <div className="art-chart">
                {slides[activeSlide].chart.map((value, index) => (
                  <span key={index} style={{ height: `${value}%` }}></span>
                ))}
              </div>

            </div>
            <div className="visual-copy" key={activeSlide}>

              <p className="visual-tagline">
                {slides[activeSlide].tagline}
              </p>

              <h2>
                {slides[activeSlide].title}
              </h2>

              <p>
                {slides[activeSlide].description}
              </p>

            </div>

            <div className="visual-dots">

              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    activeSlide === index ? 'active-dot' : ''
                  }
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    activeSlide === index ? 'true' : undefined
                  }
                />
              ))}

            </div>

          </div>

        </section>

      </div>

      <ToastContainer position="top-right" />

    </div>
  );
}

export default Login;
