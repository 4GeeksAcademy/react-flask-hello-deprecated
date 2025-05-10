import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">SoundCript</Link>

                {/* Botón de menú hamburguesa */}
                <div className="menu-icon" onClick={toggleMenu}>
                    ☰
                </div>

                {/* Menú desplegable */}
                <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
                    <Link to="/userProfile" className="dropdown-item" onClick={() => setMenuOpen(false)}>Perfil</Link>
                    <Link to="/logout" className="dropdown-item" onClick={() => setMenuOpen(false)}>Logout</Link>
                </div>
            </div>
        </nav>
    );
};
