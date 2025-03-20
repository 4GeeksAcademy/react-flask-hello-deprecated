import React, { useContext, useEffect } from "react";
import logo from "../../img/Icono puppereats.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export const Navbar = ({ setActiveCategory }) => {  
    const { store, actions } = useContext(Context);
    const { user, cart } = store;

    useEffect(() => {
        console.log("Usuario en navbar:", user);
    }, [user, cart]);

    const totalUnidades = store.cart.reduce((total, producto) => total + (producto.cantidad || 1), 0);
     
    if (typeof setActiveCategory !== "function") {
        console.error("⚠️ Error: setActiveCategory no es una función en Navbar.js.");
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg shadow-lg" style={{ 
            background: "#EABDE6" ,
            padding: "15px 30px",
        }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => setActiveCategory(null)}>
                    <img src={logo} alt="Logo" style={{ height: "60px", border: "3px solid #000", borderRadius: "10px", padding: "3px" }} />
                    <span className="fw-bold text-dark" style={{ fontSize: "1.5rem", marginLeft: "10px" }}>Pupper Eats</span>
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item m-2">
                            <Link to="/" className="nav-link fw-semibold btn btn-link text-dark" onClick={() => setActiveCategory("dogFood")}>Caninos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/" className="nav-link fw-semibold btn btn-link text-dark" onClick={() => setActiveCategory("catFood")}>Felinos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/" className="nav-link fw-semibold btn btn-link text-dark" onClick={() => setActiveCategory("exoticFood")}>Exóticos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/" className="nav-link fw-semibold btn btn-link text-dark" onClick={() => setActiveCategory("accesories")}>Accesorios</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav d-flex align-items-center gap-2">
                        {user ? (
                            <>
                                <Link to="/perfilUsuario" className="text-dark text-decoration-none d-flex align-items-center">
                                    <FaUserCircle size={24} className="me-1" />
                                    <span className="fw-semibold">Perfil</span>
                                </Link>
                                <Link to="/carrito" className="btn btn-warning d-flex align-items-center">
                                    <FaShoppingCart size={18} className="me-1" /> Cesta {totalUnidades > 0 && `(${totalUnidades})`}
                                </Link>
                                <button className="btn btn-light text-muted border-0 d-flex align-items-center" onClick={actions.logout}>
                                    <FaSignOutAlt size={16} className="me-1" /> Salir
                                </button>
                            </>
                        ) : (
                            <Link to="/loginSignup" className="btn btn-dark">Registro / Inicio</Link>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
