
import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./navbarLateral.module.css"


const NavbarLateral = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, [])


    return (
        <div className="d-flex">
            <ul className={`navbar-nav sidebar accordion vh-100 d-none d-md-block ${styles.sidebar} `} id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <div className="sidebar-brand-text mx-auto m-2">Workland</div>
                </a>
                <li className="w-100 p-0 m-0">
                    <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
                </li>


                <li className="nav-item active">
                    <Link className="nav-link" to="/freeDash">
                        <i className="fas fa-fw fa-tachometer-alt m-2"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className="w-100 p-0 m-0">
                    <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
                </li>

                <div className={`sidebar-heading my-0 ${styles.sidebarHeading}`}>Opciones</div>

                <li className="nav-item">
                    <Link className="nav-link" to="/freeEdit">
                        <i className="fas fa-fw fa-user-edit m-2"></i>
                        <span>Editar Perfil</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/freeCV">
                        <i className="fa-solid fa-business-time m-2"></i>
                        <span>Mis servicios</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-fw fa-wallet m-2"></i>
                        <span>Vincular PayPal</span>
                    </a>
                </li>

                <li className="w-100 p-0 m-0">
                    <hr className={`sidebar-divider my-0 ${styles.sidebarDivider}`} />
                </li>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>

            {/* Botón de colapso para dispositivos pequeños */}
            <button
                className="btn btn-primary d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accordionSidebar"
                aria-expanded="false"
                aria-controls="accordionSidebar"
            >
                <i className="fas fa-bars"></i>
            </button>
        </div>
    );
};

export default NavbarLateral;


