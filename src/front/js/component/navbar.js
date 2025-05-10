import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";



export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Pupper Eats</a>
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
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
						<button type="button" className="btn btn-primary" href="#">Registro/Inicio"</button>
                        {/* <!--Pendiente linkear al formulario de registro cuando esté terminado--> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
