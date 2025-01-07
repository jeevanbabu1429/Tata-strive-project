import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./LoginPage.css"; // Create a CSS file for custom styles

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/home";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            setTimeout(() => setError(""), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({ email, password });
            if (response.statusCode === 200) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back!</h2>
                <p className="auth-subtitle">Log in to continue</p>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Log In
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <a href="/register" className="auth-link">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
