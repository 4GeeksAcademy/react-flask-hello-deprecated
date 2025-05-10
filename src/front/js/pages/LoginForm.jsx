import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

export function LoginForm({ onLogin }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const Login = async ({ email, password }) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'email': email, 'password': password })
            })
            const data = await response.json()
            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                onLogin(data.token)
                navigate('/home')
            }

            if (response.status !== 200) {
                setError(true)
                setMessage(data.error)
                setInterval(() => setError(false), 3000)
            }
        } catch (error) {
            setError(true)
            setMessage('Error en la conexión')
            console.log('error', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Login({ email, password })
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-5 bg-white p-3">
            <div className="d-flex flex-md-row bg-white rounded shadow-lg overflow-hidden custom-container">
                {/* Sección izquierda: Welcome Back */}
                <div className="bg-lightviolet bg-gradient text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom1-container">
                    <h1 className="display-4 mb-4 fw-bolder">Welcome Back!</h1>
                    <p className="lead mb-5">
                        To keep connected, please login with your account.
                    </p>
                    {/* Botón de iniciar sesión */}
                    <button className="btn btn-outline-light text-white rounded-pill px-5 py-2 shadow-sm btn-signin">
                        SIGN UP
                    </button>
                </div>

                {/* Sección derecha: Create Account */}
                <div className="bg-violet text-center text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom2-container">
                    <h1 className="display-5 text-violet2 mb-4">Create Account</h1>
                    <p className="text-muted mb-5">or use your email for registration</p>

                    {/* Formulario de registro */}
                    <form className="w-100" style={{ maxWidth: '400px' }}>
                        <div className="mb-3 input-container">
                            <MdOutlineEmail className="icon" />
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 input-container">
                            <TbPasswordFingerprint className="icon" />
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit} id="btnSingup" className="btn btn-violet bg-gradient w-100 py-2 rounded-pill">
                            SIGN IN
                        </button>
                    </form>

                    {/* Mensaje de error */}
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {message}
                        </div>
                    )}

                    {/* Íconos Sociales */}
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn btn-light rounded-circle">
                            <FaTwitter />
                        </button>
                        <button className="btn btn-light rounded-circle me-2 ms-2">
                            <FaFacebook />
                        </button>
                        <button className="btn btn-light rounded-circle">
                            <FaLinkedin />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
