import React from "react";
import "../../styles/LoginForm.css";

export function LoginForm() {
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 bg-white p-3">
            <div className="d-flex flex-column flex-md-row bg-white rounded-lg shadow-lg overflow-hidden w-200">
                {/* Sección izquierda: Welcome Back */}
                <div className="bg-primary text-white d-flex flex-column align-items-center justify-content-center p-5 w-200 w-md-50">
                    <h1 className="display-4 mb-4">Welcome Back!</h1>
                    <p className="lead mb-5">
                        To keep connected, please login with your account.
                    </p>
                    <button className="btn btn-light text-black rounded-pill px-5 py-2 shadow-sm">
                        SIGN IN
                    </button>
                </div>
                {/* Sección derecha: Create Account */}
                <div className="bg-secondary text-center text-white d-flex flex-column align-items-center justify-content-center p-5 w-200 w-md-50">
                    <h1 className="display-5 mb-4" style={{ color: "#5D5FEF" }}>Create Account</h1>
                    <p className="text-muted mb-5">or use your email for registration</p>
                    <form className="w-100">
                        <div className="mb-3">
                            <input type="text" id="name" className="form-control" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <input type="email" id="email" className="form-control" required placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <input type="password" id="password" className="form-control" required placeholder="Password" />
                        </div>
                        <button type="submit" id="btnSingup" className="btn btn-primary w-100 py-2 rounded-pill">
                            SIGN UP
                        </button>
                    </form>
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn btn-light rounded-circle me-2">
                            <i className="fab fa-twitter text-dark"></i>
                        </button>
                        <button className="btn btn-light rounded-circle me-2">
                            <i className="fab fa-facebook text-dark"></i>
                        </button>
                        <button className="btn btn-light rounded-circle">
                            <i className="fab fa-linkedin text-dark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}