import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Listing from "../../img/1.png";
import currency from "../../img/4.png";
import wallet from "../../img/5.png";
import snapshot from "../../img/3.png";
import crypto from "../../img/2.png";

export const Landing = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUnauthorizedAction = (actionName) => {
        if (!store.token) {
            alert(`You need to be logged in to ${actionName}.`);
            return true;
        }
        return false;
    };

    return (
        <div id="landingPage">
            <div className="previewBox" id="listingPreview">
                <div className="blurbContainer">
                    <div className="blurb">
                        Effortlessly explore a database of over 15,000 cryptocurrencies
                    </div>
                    <span
                        id="switchToListing"
                        className="btn"
                        onClick={() => {
                            navigate("/listingpage");
                        }}
                    >
                        Explore Database
                    </span>
                </div>
                <img src={Listing} alt="Listing" className="d-inline-block align-top previewPhoto" />
            </div>
            <div className="previewBox" id="perfPreview">
                <img src={crypto} alt="crypto" className="d-inline-block align-top previewPhoto" />
                <div className="blurbContainer">
                    <div className="blurb">
                        Upon logging in immediately see the most important thing: the overall
                        performance of your holdings
                    </div>
                    <span
                        className="listingLogin btn"
                        onClick={() => {
                            if (handleUnauthorizedAction("view performance")) return;
                            navigate("/overall_holdings");
                        }}
                    >
                        View Performance
                    </span>
                </div>
            </div>
            <div className="previewBox" id="infoPreview">
                <div className="blurbContainer">
                    <div className="blurb">
                        View tailored historical performance in your preferred currency, access current
                        price and demand insights, and stay updated with real-time news specific to
                        your chosen coin
                    </div>
                    <span
                        className="listingLogin btn"
                        onClick={() => {
                            if (handleUnauthorizedAction("find tokens")) return;
                            navigate("/userdashboard#tokens");
                        }}
                    >
                        Find Tokens
                    </span>
                </div>
                <img src={snapshot} alt="snapshot" className="d-inline-block align-top previewPhoto" />
            </div>
            <div className="previewBox" id="favPreview">
                <img src={currency} alt="currency" className="d-inline-block align-top previewPhoto" />
                <div className="blurbContainer">
                    <div className="blurb">
                        Add coins to your favorites list for easy access and tracking, and the ability
                        to set price notification alerts via text
                    </div>
                    <span
                        className="listingLogin btn"
                        onClick={() => {
                            if (handleUnauthorizedAction("add favorites")) return;
                            navigate("/userdashboard#favorites");
                        }}
                    >
                        Add Favorites
                    </span>
                </div>
            </div>
            <div className="previewBox" id="walletPreview">
                <div className="blurbContainer">
                    <div className="blurb">
                        Track the coins you currently own in your wallet and access more info about
                        them
                    </div>
                    <span
                        className="listingLogin btn"
                        onClick={() => {
                            if (handleUnauthorizedAction("open wallet")) return;
                            navigate("/userdashboard#wallet");
                        }}
                    >
                        Open Wallet
                    </span>
                </div>
                <img src={wallet} alt="wallet" className="d-inline-block align-top previewPhoto" />
            </div>
        </div>
    );
};
