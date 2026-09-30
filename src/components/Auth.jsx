import { useState } from 'react';
import { apiRequest } from '../api';
import './Auth.css';

function Auth({ onLogin }) {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    function showFeedback(text, type = 'error') {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage(prev => prev.text === text ? { text: '', type: '' } : prev);
        }, 5000);
    }

    function handleTabChange(isLogin) {
        setIsLoginTab(isLogin);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setMessage({ text: '', type: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            showFeedback('Username cannot be empty');
            return;
        }
        if (!password) {
            showFeedback('Password cannot be empty');
            return;
        }

        try {
            if (isLoginTab) {
                const data = await apiRequest('/auth/login', {
                    method: 'POST',
                    body: { username: trimmedUsername, password },
                });
                onLogin({ username: data.username, token: data.token });
            } else {
                if (password.length < 4) {
                    showFeedback('Password must be at least 4 characters long');
                    return;
                }
                if (password !== confirmPassword) {
                    showFeedback('Passwords do not match');
                    return;
                }

                await apiRequest('/auth/signup', {
                    method: 'POST',
                    body: { username: trimmedUsername, password },
                });

                showFeedback('Account created successfully! Logging in...', 'success');

                // Signup doesn't return a token, so log in right after
                const data = await apiRequest('/auth/login', {
                    method: 'POST',
                    body: { username: trimmedUsername, password },
                });
                setTimeout(() => {
                    onLogin({ username: data.username, token: data.token });
                }, 1200);
            }
        } catch (err) {
            showFeedback(err.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">📝 MyNotes</div>
                    <div className="auth-subtitle">
                        {isLoginTab
                            ? 'Capture your thoughts, secure and private.'
                            : 'Create an account to start writing notes.'
                        }
                    </div>
                </div>

                <div className={`auth-tabs ${!isLoginTab ? 'signup-active' : ''}`}>
                    <div className="auth-tab-slider"></div>
                    <button
                        type="button"
                        className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
                        onClick={() => handleTabChange(true)}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
                        onClick={() => handleTabChange(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                id="username"
                                type="text"
                                className="form-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={isLoginTab ? "current-password" : "new-password"}
                            />
                        </div>
                    </div>

                    {!isLoginTab && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔑</span>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="form-input"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                    )}

                    {message.text && (
                        <div className={`auth-message ${message.type || 'error'}`}>
                            <span>{message.type === 'success' ? '✓' : '⚠'}</span>
                            <span>{message.text}</span>
                        </div>
                    )}

                    <button type="submit" className="auth-submit-btn">
                        {isLoginTab ? 'Log In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Auth;
