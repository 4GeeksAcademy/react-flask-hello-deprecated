import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Listing from "../../img/listing.png";
import currency from "../../img/currency.png";
import favorite from "../../img/Favorites.png";
import wallet from "../../img/wallet.png";
import snapshot from "../../img/snapshot.png";
import crypto from "../../img/crypto.png";



export const Landing = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	// useEffect(() => {
    //     actions.setCurrentCoinId("bitcoin")
    //     actions.setCurrency("USD")
    //     actions.setTimeFrame("7")
    // }, [])

	return (
		<div id="landingPage">
			
			<div className="previewBox" id="listingPreview">
				<div className="blurbContainer">
					<div className="blurb">Effortlessly explore a database of over 15,000 cryptocurrencies</div>
					<span id="switchToListing" className="btn" onClick={() => {navigate("/listingpage")}}>Explore Database</span>
				</div>
				<img src={Listing} alt="Listing" className="d-inline-block align-top" />
			</div>
			<div className="previewBox" id="perfPreview">
			<img src={crypto} alt="wallet" className="d-inline-block align-top" />
				<div className="blurbContainer">
					<div className="blurb">Upon logging in immediately see the most important thing: the overall performance of your holdings</div>
					<span className="listingLogin btn" onClick={() => {navigate("/userdashboard")}}>View performance</span>
				</div>
			</div>
			<div className="previewBox" id="infoPreview">
				<div className="blurbContainer">
					<div className="blurb">View tailored historical performance in your preferred currency, access current price and demand insights, and stay updated with real-time news specific to your chosen coin</div>
					<span className="listingLogin btn" onClick={() => {}}>Find Tokens</span>
				</div>
				<img src={snapshot} alt="wallet" className="d-inline-block align-top" />
			</div>
			<div className="previewBox" id="favPreview">
			<img src={currency} alt="favorite" className="d-inline-block align-top" />
				<div className="blurbContainer">
					<div className="blurb">Add coins to your favorites list for easy access and tracking, and the ability to set price notification alerts via text</div>
					<span className="listingLogin btn" onClick={() => {navigate("/userdashboard#favorites")}}>Add Favorites</span>
				</div>
			</div>
			<div className="previewBox" id="walletPreview">
				<div className="blurbContainer">
					<div className="blurb">Track the coins you currently own in your wallet and access more info about them</div>
					<span className="listingLogin btn" onClick={() => {navigate("/userdashboard#wallet")}}>Open Wallet</span>
				</div>
				<img src={wallet} alt="wallet" className="d-inline-block align-top" />
			</div>
		</div>
	);
};
