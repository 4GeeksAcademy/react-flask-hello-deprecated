import React from "react";
import "../../styles/not-found.css";
import { Link } from "react-router-dom";
import errorImage from "../../img/404.png"; // Asegúrate de tener esta imagen en tu proyecto

export const NotFound = () => {
    return (
        <div className="error-page">
            <img src={errorImage} alt="404 Not Found" className="error-image" />
            <h1 className="not-found-title">404</h1>
            <p className="not-found-paragraph">Página no encontrada. Parece que te perdiste.</p>
            <Link to="/" className="btn-home">Volver al inicio</Link>
        </div>
    );
};