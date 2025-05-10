import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Context } from "../store/appContext";



export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { user } = store; // Obtenemos el usuario del store

	useEffect(() => {
		console.log("Usuario en navbar:", user);
	}, [user]);
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" href="#">Pupper Eats</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">
						<CiSearch />
						</button>
                    </form>
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item m-3">
                            <a className="nav-link active" aria-current="page" href="#">Caninos</a>
                        </li>
                        <li className="nav-item m-3">
                            <a className="nav-link" href="#">Felinos</a>
                        </li>
                        <li className="nav-item m-3">
                            <a className="nav-link" href="#">Exóticos</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {user ? (
                            // Si el usuario está autenticado, mostramos Perfil y Cesta
                            <>
                                <Link to="/perfil" className="btn btn-primary me-2">Perfil</Link>
                                <Link to="/cesta" className="btn btn-outline-primary me-2">Cesta</Link>
                                <button className="btn btn-danger" onClick={actions.logout}>Cerrar sesión</button>
                            </>
                        ) : (
                            // Si no hay usuario, mostramos los botones de Registro/Login
                            <Link to="/loginSignup" className="btn btn-primary">Registro / Inicio</Link>
                            
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
