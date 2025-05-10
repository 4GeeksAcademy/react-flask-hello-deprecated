import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok && data.msg === "ok" && data.token) {
                //Si la respuesta es "ok" y contiene un token válido, lo guardamos en sessionStorage
                sessionStorage.setItem("token", data.token);
                navigate("/");
            } else {
                //Si el mensaje no es "ok", mostramos un mensaje de error
                actions.setMessage(data.msg || "Error en la autenticación");
            }
        } catch (err) {
            actions.setMessage("Error de conexión");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="mb-4">Iniciar sesión</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="floatingInput">EMAIL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">CONTRASEÑA</label>
                        </div>
                        <Link to="/forgot-password" className="d-block mb-3">¿OLVIDÓ SU CONTRASEÑA?</Link>
                        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Iniciar sesión</button>
                    </form>
                    <p className="mt-3">¿NO TIENES UNA CUENTA? <Link to="/signup">REGÍSTRATE</Link></p>
                    {/* Mostrar mensaje si existe */}
                    {store.message && (
                        <div className="alert alert-danger mt-3">
                            {store.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;