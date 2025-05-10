import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';  
import "../../styles/navbar.css"; 
import { Context } from "../store/appContext";  // Asegúrate de importar el Context correctamente

export const Navbar = () => {
    const { store } = useContext(Context);  // Obtener el store directamente desde el contexto
    const user = JSON.parse(localStorage.getItem("user")) || null;

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FF1517" }}>
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img
                        src={logo}  
                        alt="Chikitin Express"
                        style={{ height: "60px" }}
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
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white btn btn-light">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/store" className="nav-link text-white btn btn-light">Tienda</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link text-white btn btn-light">Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link text-white btn btn-light">
                                        Carrito
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => {
                                            localStorage.clear();
                                            window.location.reload();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
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
