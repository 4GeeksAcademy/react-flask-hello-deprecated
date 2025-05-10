import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Landing = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<div id="landingPage">
			
			<div className="previewBox" id="listingPreview">
				<div className="blurbContainer">
					<div className="blurb">Effortlessly explore a database of over 15,000 cryptocurrencies</div>
					<span id="switchToListing" className="btn" onClick={() => {navigate("/listingpage")}}>Explore Database</span>
				</div>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
			<div className="previewBox" id="perfPreview">
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
				<div className="blurbContainer">
					<div className="blurb">Upon logging in immediately see the most important thing: the overall performance of your holdings</div>
					<span className="listingLogin btn" onClick={() => {}}>View performance</span>
				</div>
			</div>
			<div className="previewBox" id="infoPreview">
				<div className="blurbContainer">
					<div className="blurb">View tailored historical performance in your preferred currency, access current price and demand insights, and stay updated with real-time news specific to your chosen coin</div>
					<span className="listingLogin btn" onClick={() => {}}>Find Tokens</span>
				</div>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
			<div className="previewBox" id="favPreview">
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
				<div className="blurbContainer">
					<div className="blurb">Add coins to your favorites list for easy access and tracking, and the ability to set price notification alerts via text</div>
					<span className="listingLogin btn" onClick={() => {}}>Add Favorites</span>
				</div>
			</div>
			<div className="previewBox" id="walletPreview">
				<div className="blurbContainer">
					<div className="blurb">Track the coins you currently own in your wallet and access more info about them</div>
					<span className="listingLogin btn" onClick={() => {}}>Open Wallet</span>
				</div>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
		</div>
	);
};
