import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { OverallHoldings } from "../component/overallHoldings";
import { Wallet } from "../component/Wallet";
import { Favorites } from "../component/Favorites";
import { HashLink as Link } from 'react-router-hash-link'


export const Userdashboard = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    useEffect(() => {
        const handleRouteChange = () => {
            if (location.pathname === "/userdashboard#favorites") {
                () => actions.setShowFavorites(); // Show Favorites section
            } else if (location.pathname === "/userdashboard#overallHoldings") {
                () => actions.setShowOverallHoldings(); // Show Overall Holdings section
            } else if (location.pathname === "/userdashboard#wallet") {
                () => actions.setShowWallet(); // Show Wallet section
            }
        };

        // Trigger the handler when the route changes
        handleRouteChange();
    }, [location, actions]);

    return (
        <div id="dashboardWhole">
            <div id="togglePages">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <Link
                            className={`toggleButton nav-link ${store.showOverallHoldings ? "active" : ""}`}
                            to="/userdashboard#overallHoldings"
                            onClick={() => actions.setShowOverallHoldings()}
                        >
                            Overall Holdings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`toggleButton nav-link ${store.showWallet ? "active" : ""}`}
                            to="/userdashboard#wallet"
                            onClick={() => actions.setShowWallet()}
                        >
                            Wallet
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`toggleButton nav-link ${store.showFavorites ? "active" : ""}`}
                            to="/userdashboard#favorites"
                            onClick={() => actions.setShowFavorites()}
                        >
                            Favorites
                        </Link>
                    </li>
                </ul>
            </div>
            <div id="dashboardContent">
                {store.showOverallHoldings ? (
                    <OverallHoldings />
                ) : store.showWallet ? (
                    <Wallet />
                ) : store.showFavorites ? (
                    <Favorites />
                ) : null}
            </div>
        </div>
    );
};
