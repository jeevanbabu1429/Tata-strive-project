import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Add a new CSS file for styles

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        return name && email && password && phoneNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage("Please fill all the fields.");
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }
        try {
            const response = await ApiService.registerUser(formData);
            if (response.statusCode === 200) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                });
                setSuccessMessage("User registered successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(""), 5000);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2 className="auth-title">Create Your Account</h2>
                <p className="auth-subtitle">Sign up to get started!</p>

                {errorMessage && <div className="error-alert">{errorMessage}</div>}
                {successMessage && <div className="success-alert">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="auth-input"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="auth-input"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <a href="/login" className="auth-link">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
