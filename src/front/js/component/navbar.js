import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || null; // Asegurar valor por defecto

    const handleLogout = () => {
        localStorage.clear(); // Limpiar sesión
        navigate("/"); // Redirigir al Home
        window.location.reload(); // Asegurar limpieza completa
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Chikitin Express
                </Link>
                <div className="navbar-buttons">
                    <Link to="/shop">
                        <button className="btn modern-btn secondary-btn">Shop</button>
                    </Link>
                    <Link to="/cart">
                        <button className="btn modern-btn secondary-btn">Cart</button>
                    </Link>
                    {user ? (
                        <>
                            <Link to="/order-history">
                                <button className="btn modern-btn secondary-btn">Order History</button>
                            </Link>
                            <Link to="/notifications">
                                <button className="btn modern-btn secondary-btn">Notifications</button>
                            </Link>
                            <span className="navbar-user" title={user.name}>
                                Hola, {user.name}!
                            </span>
                            <button
                                className="btn modern-btn primary-btn"
                                onClick={handleLogout}
                                aria-label="Cerrar sesión"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn modern-btn primary-btn">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn modern-btn secondary-btn">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
