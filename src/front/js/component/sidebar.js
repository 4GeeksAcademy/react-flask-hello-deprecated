import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "/src/front/styles/sidebar.css";

export const Sidebar = () => {
    const { store, actions } = useContext(Context)

    const handleClick = () => {
        actions.logout()
    }

    return (
        <div className="sidebar">
            <div>
                <Link to="/cuentas" className="d-flex justify-content-evenly text-white text-decoration-none">
                    <span className="fs-4">Optima</span>
                    <img src="" alt="logo" width="32" height="32" />
                </Link>
            </div>
            <div className="d-flex flex-column">
                <p className="p-2">Welcome
                    <br></br>
                    <span className="p-2">slogan</span>
                </p>
                <div className="d-flex">
                    <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${store.user.first_name}`} width="50" height="50" className="avatar" />
                    <p className="p-2">{store.user.first_name} {store.user.last_name}</p>
                </div>
            </div>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/cuentas" className="nav-link active">
                        <i className="bi bi-person-vcard-fill"></i> <span>Cuentas</span>
                    </Link>
                </li>
                <li>
                    <Link to="/movimientos" className="nav-link">
                        <i className="bi bi-graph-up"></i> <span>Movimientos</span>
                    </Link>
                </li>
                <hr />
                <li>
                    <Link to="/faqs" className="nav-link">
                        <i className="bi bi-question-circle"></i> <span>FAQs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link logout" onClick={handleClick}>
                        <i className="bi bi-box-arrow-left logout"></i> <span className="logout">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>

    );
};
