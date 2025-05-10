import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./Login"; // Import the Modal component
import Logo from "../../img/Logo.png";
import gear_colored from "../../img/gear_colored.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const username = store.username;
    const token = store.token;
    const [showModal, setShowModal] = useState(false); // Control modal visibility
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [showSuggestions, setShowSuggestions] = useState(false); // State to control dropdown visibility
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            actions.searchCoins(query); // Trigger search action with the query
            setShowSuggestions(true); // Show suggestions when query is not empty
        } else {
            setShowSuggestions(false); // Hide suggestions when query is empty
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            actions.searchCoins(searchQuery); // Trigger search action with the query
            navigate("/searchresults"); // Navigate to the search results page
            setShowSuggestions(false); // Hide suggestions on search
        }
    };
    const handleUnauthorizedAction = (e) => {
        if (!token) {
            e.preventDefault(); // Prevent navigation
            alert("You are not logged in. Please register or sign in.");
        }
    };

    const handleLoginSuccess = (username, password) => {
        actions.login(username, password); // Update global store with logged-in user
        setShowModal(false); // Close the modal
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false); // Delay to allow clicks on suggestions before hiding
        }, 150);
    };

    const handleSuggestionClick = (coin) => {
        setSearchQuery(coin.name); // Update the input with the selected suggestion
        setShowSuggestions(false); // Hide suggestions after selecting
        console.log(coin.id);
        navigate(`/moreinfo/${coin.id}`); // Navigate to the specific coin's route
    };

    const handleLogout = () => {
        const isConfirmed = window.confirm(`Are you sure you want to log out, ${username}?`);
        if (isConfirmed) {
            actions.logout(); // Perform the logout action
            navigate('/'); // Navigate to home page after logout
        }
    };

    // Combine both logic (show alert or navigate) in one function
    const handleListOfCoinsClick = (e) => {
        if (!token) {
            e.preventDefault(); // Prevent navigation
            alert("You are not logged in. Please register or sign in.");
        }
    };

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
                                <Link
                                    className="listButton btn"
                                    to="/listingpage"
                                    onClick={handleListOfCoinsClick} // Combined handler for both alert and navigation
                                >
                                    List of Coins
                                </Link>
                            </li>
                        </ul>
                        <form
                            className="d-flex"
                            onSubmit={handleSearch}
                            style={{ position: "relative" }}
                        >
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Crypto: Name/Symbol"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleInputChange} // Update search query
                                onBlur={handleBlur} // Hide suggestions when input loses focus
                                onFocus={() => searchQuery && setShowSuggestions(true)} // Show suggestions on focus if query exists
                            />
                            <button className="searchButton btn" type="submit">Search</button>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && store.searchSuggestions.length > 0 && (
                                <ul
                                    className="dropdown-menu show"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        zIndex: 10,
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "1px solid #39ff14",
                                    }}
                                >
                                    {store.searchSuggestions.map((coin, id) => (
                                        <li
                                            key={coin.id}
                                            className="dropdown-item"
                                            style={{ cursor: "pointer", color: "white" }}
                                            onMouseDown={() => {
                                                navigate(`/moreinfo/${coin.id}`);
                                            }}
                                        >
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </div>

                    {token ? (
                        <>
                            <span className="navbar-text text-light ms-3">Hello, {username}</span>
                            <button
                                className="logoutButton btn ms-3"
                                onClick={handleLogout} // Trigger the confirmation popup
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="loginButton btn ms-3" onClick={() => setShowModal(true)}>Login</button>
                    )}
                    <div className="navGear dropdown ms-3">
                        <img
                            src={gear_colored}
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
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/profile"
                                    onClick={!token ? handleUnauthorizedAction : null} // Check if logged in
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/userdashboard#favorites"
                                    onClick={!token ? handleUnauthorizedAction : null} // Check if logged in
                                >
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/userdashboard#wallet"
                                    onClick={!token ? handleUnauthorizedAction : null} // Check if logged in
                                >
                                    Wallet
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/userdashboard#overallHoldings"
                                    onClick={!token ? handleUnauthorizedAction : null} // Check if logged in
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={actions.logout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {showModal && (
                <Login
                    isLoginDefault={true}
                    onClose={() => setShowModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};
