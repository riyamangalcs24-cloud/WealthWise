import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from './utils';
import '../login.css';

const FaSun = () => <span>☀️</span>;
const FaMoon = () => <span>🌙</span>;
const FaUserPlus = () => <span>＋</span>;

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [darkMode, setDarkMode] = useState(false);
    const [shake, setShake] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const triggerShake = () => {
        setShake(false);

        requestAnimationFrame(() => {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSignupInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            triggerShake();
            return handleError('Name, email, and password are required');
        }

        setIsLoading(true);

        try {
            const url = `${APIUrl}/auth/signup`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message || 'Signup successful');

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                triggerShake();

                const details =
                    error?.details?.[0]?.message ||
                    message ||
                    'Signup failed';

                handleError(details);
            }
        } catch (err) {
            console.error('Error during signup:', err);
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
                    <Link to="/signup" className="ww-brand">
                        <span className="ww-logo">₹</span>
                        <span className="brand-name">
                            Wealth<span>Wise</span>
                        </span>
                    </Link>

                    <div className="auth-heading">
                        <h1>Create Account</h1>
                        <p>Start your journey towards smarter money habits.</p>
                    </div>

                    <form onSubmit={handleSignup} className="login-form">
                        <div className="form-group">
                            <label htmlFor="name">Full name</label>
                            <input
                                onChange={handleChange}
                                value={signupInfo.name}
                                type="text"
                                name="name"
                                id="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                onChange={handleChange}
                                value={signupInfo.email}
                                type="email"
                                name="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Create password</label>
                            <input
                                onChange={handleChange}
                                value={signupInfo.password}
                                type="password"
                                name="password"
                                id="password"
                                className="form-input"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    <span>Create account</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
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
                            Make every rupee <span>count.</span>
                        </h2>

                        <p>
                            Organize your income, track spending, and
                            take the next step toward your financial goals.
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

export default Signup;