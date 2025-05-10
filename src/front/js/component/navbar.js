import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "./Modal"; // Import the new Modal component
import Logo from "../../img/Logo.png";
import gear from "../../img/gear.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const username = store.username;
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    const switchToFavs = () => {
        navigate("/userdashboard#favorite");
        actions.setShowFavorites()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo" width="75" height="75" className="d-inline-block align-top" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="btn btn-outline-success" to="/listingpage">List of Coins</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                name="search"
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    {username ? (
                        <>
                            <span className="navbar-text text-light ms-3">Hello, {username}</span>
                            <button className="btn btn-outline-danger ms-3" onClick={() => actions.logout()}>Logout</button>
                        </>
                    ) : (
                        <button className="btn btn-outline-primary ms-3" onClick={() => setShowModal(true)}>Login</button>
                    )}
                    <div className="dropdown ms-3">
                        <img
                            src={gear}
                            alt="Profile"
                            width="60"
                            height="60"
                            className="rounded-circle dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ cursor: "pointer" }}
                        />
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li><span className="dropdown-item-text">Hello, {username || "Guest"}</span></li>
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/userdashboard#favorites" onClick={() => actions.setShowFavorites()}> Favorites</Link></li>
                            <li><Link className="dropdown-item" to="/userdashboard#overallHoldings" onClick={() => actions.setShowOverallHoldings()}>Dashboard</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={() => actions.logout()}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav >

            {showModal && (
                <Modal
                    isLoginDefault={true}
                    onClose={() => setShowModal(false)}
                    onLogin={(username, password) => actions.login(username, password)}
                    onSignUp={(email, password) => actions.signUp(email, password)}
                />
            )
            }
        </>
    );
};
