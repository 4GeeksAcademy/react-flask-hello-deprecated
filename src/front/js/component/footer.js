import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";




export const Footer = () => {

	const { store, actions } = useContext(Context);

	return (
		<footer className="footer mt-auto py-3 text-center">
			<Link className="link" to="/about">
				<div style={{ color: "white", textDecoration: "none" }}>About us</div>
			</Link>

			<div type="submit"
				onClick={() => actions.setShowContactModal()}
				style={{ color: "white", textDecoration: "none" }}>Contact us</div>

			<div>CryptoScope &copy; 2024</div>
			<div>Powered by CoinGecko</div>
		</footer>
	)
};
