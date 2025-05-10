import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Unauthorized.module.css"

const Unauthorized = () => {
    return (
        <div className={`${styles.Unauth} container-fluid text-center mt-5 w-100 `}>
            <h1 id="DenegadeAccess" className={`${styles.denegade}`}>403 - Acceso Denegado</h1>
            <p className="">
                Lo sentimos, no tienes permisos para acceder a esta página.
            </p>
            <Link to="/" className={`${styles.btn} mt-5`}>
                <p className={`${styles.backTo}`}>Volver al Inicio</p>
            </Link>
        </div>
    );
};

export default Unauthorized;
