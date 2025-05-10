import React from 'react';

const Navbar = ({ onShowForm }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">dragon ball Blog</a>
                <div className="d-flex">
                    <button className="btn btn-outline-primary me-2" onClick={() => onShowForm('login')}>Iniciar Sesión</button>
                    <button className="btn btn-outline-success" onClick={() => onShowForm('signup')}>Registrarse</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

