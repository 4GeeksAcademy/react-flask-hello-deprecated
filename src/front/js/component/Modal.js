import React, { useState } from "react";
import PropTypes from "prop-types";

export const Modal = ({ isLoginDefault, onClose, onLogin, onSignUp }) => {
    const [isLogin, setIsLogin] = useState(isLoginDefault); // Control Login/Sign-Up toggle

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        onLogin(username.value, password.value); // Call parent-provided login handler
        onClose(); // Close the modal
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const { email, confirmEmail, password, confirmPassword } = e.target.elements;

        // Validation checks
        if (email.value !== confirmEmail.value) {
            alert("Emails do not match. Please try again.");
            return;
        }
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        onSignUp(email.value, password.value); // Call parent-provided sign-up handler
        onClose(); // Close the modal
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose} // Close modal handler
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-center mb-3">
                            <button
                                className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} me-2`}
                                onClick={() => setIsLogin(true)} // Switch to Login
                            >
                                Login
                            </button>
                            <button
                                className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setIsLogin(false)} // Switch to Sign-Up
                            >
                                Sign Up
                            </button>
                        </div>
                        {isLogin ? (
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="username" name="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmEmail" className="form-label">Confirm Email</label>
                                    <input type="email" className="form-control" id="confirmEmail" name="confirmEmail" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for the component
Modal.propTypes = {
    isLoginDefault: PropTypes.bool, // Whether to default to the Login view
    onClose: PropTypes.func.isRequired, // Function to close the modal
    onLogin: PropTypes.func.isRequired, // Function to handle login
    onSignUp: PropTypes.func.isRequired, // Function to handle sign-up
};
