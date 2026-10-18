import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from './utils';
import '../login.css';

const FaSun = () => <span>☀️</span>;
const FaMoon = () => <span>🌙</span>;
const FaEye = () => <span>👁</span>;
const FaEyeSlash = () => <span>🙈</span>;
const FaSignInAlt = () => <span>→</span>;

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [shake, setShake] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setDarkMode(prefersDark);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const triggerShake = () => {
        setShake(false);

        requestAnimationFrame(() => {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            triggerShake();
            return handleError('Email and password are required');
        }

        setIsLoading(true);

        try {
            const url = `${APIUrl}/auth/login`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message || 'Login successful');

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                triggerShake();

                const details =
                    error?.details?.[0]?.message ||
                    message ||
                    'Login failed';

                handleError(details);
            }
        } catch (err) {
            console.error('Error during login:', err);
            triggerShake();
            handleError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`login-page ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <div className="login-background" />

            <button
                type="button"
                className="theme-toggle"
                onClick={toggleDarkMode}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
                {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <main className={`auth-shell ${shake ? 'shake-animation' : ''}`}>
                <section className="auth-form-panel">
                    <Link to="/login" className="ww-brand">
                        <span className="ww-logo">₹</span>
                        <span className="brand-name">
                            Wealth<span>Wise</span>
                        </span>
                    </Link>

                    <div className="auth-heading">
                        <h1>Welcome Back!</h1>
                        <p>Track your money with confidence.</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                onChange={handleChange}
                                value={loginInfo.email}
                                type="email"
                                name="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter your email"
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>

                            <div className="password-input-container">
                                <input
                                    onChange={handleChange}
                                    value={loginInfo.password}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                />
                                <label htmlFor="remember">
                                    Remember me
                                </label>
                            </div>

                            <Link
                                to="/forgot-password"
                                className="forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt />
                                    <span>Sign in</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Manage your money smarter</span>
                    </div>

                    <p className="auth-switch">
                        Don't have an account?{' '}
                        <Link to="/signup">Sign up</Link>
                    </p>
                </section>

                <aside className="auth-visual-panel">
                    <div className="visual-brand">
                        <span className="ww-logo">₹</span>
                        <span className="brand-name">
                            Wealth<span>Wise</span>
                        </span>
                    </div>

                    <div className="money-art" aria-hidden="true">
                        💸
                    </div>

                    <div className="visual-copy">
                        <h2>
                            Your money, <span>your control.</span>
                        </h2>

                        <p>
                            Track expenses, manage budgets, and build
                            better financial habits.
                        </p>
                    </div>

                    <div className="visual-dots" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                </aside>
            </main>

            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
        </div>
    );
}

export default Login;