import React from "react";
import { Link } from "react-router-dom";
import "../../styles/notFound.css"; // Archivo CSS específico para esta página

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">¡Oops! La página que buscas no existe.</p>
            <Link to="/">
                <button className="btn not-found-btn">Volver al Inicio</button>
            </Link>
        </div>
    );
};

export default NotFound;
