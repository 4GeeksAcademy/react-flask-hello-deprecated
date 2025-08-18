import React from "react";
import logo from "../../img/logo-blanco.png"; // Asegúrate de tener un logo blanco o similar
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="custom-footer">
		<div className="footer-content">
			<img src={logo} alt="Logo" className="footer-logo" />
			<div className="footer-social">
				<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-facebook-f"></i>
				</a>
				<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-instagram"></i>
				</a>
				<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-linkedin-in"></i>
				</a>
			</div>
		</div>
		<hr />
		<p className="footer-text">© 2025 Compas it spa. Todos los derechos reservados.</p>
	</footer>
);

