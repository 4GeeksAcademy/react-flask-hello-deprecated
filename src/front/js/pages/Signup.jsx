import React, { useState } from "react";
import "../../styles/Signup.css";
import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { CgRename } from "react-icons/cg";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const SignUp = async ({ name, email, password }) => {
    if (password !== repeatPassword) {
      setError(true)
      setMessage('Passwords do not match')
      setInterval(() => setError(false), 3000)
      return
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': name, 'email': email, 'password': password })
      })
      const data = await response.json()
      if (response.status === 200) {
        setSuccess(true)
        setMessage(data.success)
        setInterval(() => navigate('/'), 3000)
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
    SignUp({ name, email, password })
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 bg-white p-3">
      <div className="d-flex flex-md-row bg-white rounded shadow-lg overflow-hidden custom-container">
        {/* Sección izquierda: Create Account */}
        <div className="text-center text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom2-container">
          <h1 className="display-5 text-violet2 mb-4">Create Account</h1>
          <p className="text-muted mb-5">use your name and email to register</p>

          {/* Formulario de registro */}
          <form className="w-100" style={{ maxWidth: '400px' }}>
            <div className="mb-3 input-container">
              <CgRename className="icon" />
              <input
                type="name"
                id="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-3 input-container">
              <TbPasswordFingerprint className="icon" />
              <input
                type="password"
                id="password2"
                className="form-control"
                placeholder="Repeat Password"
                required
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClickCapture={handleSubmit}
              id="btnSignup"
              className="btn btn-violet bg-gradient w-100 py-2 rounded-pill"
            >
              SIGN UP
            </button>
          </form>

          {/* Mensaje de error */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {message}
            </div>
          )}
          {success && (
            <div className="alert alert-info mt-3" role="alert">
              {message}
            </div>
          )}
        </div>

        {/* Sección derecha: Welcome Back */}
        <div className="bg-lightviolet bg-gradient text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom1-container">
          <h1 className="display-4 mb-4 fw-bolder">To Access!</h1>
          <p className="lead mb-5">
            To stay connected, please login with your account.
          </p>
          {/* Botón de iniciar sesión */}
          <button className="btn btn-outline-light text-white rounded-pill px-5 py-2 shadow-sm btn-signin">
            <Link to="/" className="text-white text-decoration-none">SIGN IN</Link>
          </button>
        </div>
      </div>
    </div>
  );
}