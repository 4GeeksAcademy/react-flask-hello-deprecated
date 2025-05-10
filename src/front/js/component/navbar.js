import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../img/logo.png';  
import "../../styles/navbar.css"; // Verifica que esté importado correctamente

export const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || null; // Asegurar valor por defecto
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener el carrito desde localStorage

    const handleLogout = () => {
        localStorage.clear(); // Limpiar sesión
        navigate("/"); // Redirigir al Home
        window.location.reload(); // Asegurar limpieza completa
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FF1517" }}>
            <div className="container">
                {/* Usamos la imagen importada */}
                <Link to="/" className="navbar-brand">
                    <img
                        src={logo}  // Utilizamos la imagen importada
                        alt="Chikitin Express"
                        style={{ height: "60px" }}  // Ajusta el tamaño de la imagen
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Links visibles cuando no se ha iniciado sesión */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white btn btn-light">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/store" className="nav-link text-white btn btn-light">Tienda</Link>
                        </li>
                        {user ? (
                            <>
                                {/* Links visibles cuando se ha iniciado sesión */}
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link text-white btn btn-light">Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link text-white btn btn-light">
                                        Carrito ({cart.length}) {/* Mostrar cantidad de productos en el carrito */}
                                    </Link>
                                </li>
                                {user.role === "admin" && (
                                    <li className="nav-item">
                                        <Link to="/admin/create-product" className="nav-link text-white btn btn-light">Crear Producto</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button
                                        className="btn btn-warning"
                                        onClick={handleLogout}
                                        aria-label="Cerrar sesión"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Links visibles cuando no se ha iniciado sesión */}
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-primary text-white">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="btn btn-secondary text-white">Registrarse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
