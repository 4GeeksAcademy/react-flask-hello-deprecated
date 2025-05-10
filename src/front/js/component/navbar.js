import React from "react";
import { Link } from "react-router-dom";
import Logout from './GoogleLogout';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const navigate = useNavigate(); 

	function handleSignOut() {
		console.log("user sing out")
		navigate('/')
	  }
	return (
		<nav className="navbar navbar-light bg-light" style={{ padding: "10px 20px" }}>
			<div className="container d-flex justify-content-between align-items-center">
				<Link to="/" className="navbar-brand">
					<span className="h1">🌦️ App de Clima</span>
				</Link>
				<div className="d-flex align-items-center">
					{/* Link al clima actual */}
					<Link to="/users" style={{ marginRight: "15px" }}>
						<button className="btn btn-info">Ver Usuarios</button>
					</Link>
					<Link to="/clima" style={{ marginRight: "15px" }}>
						<button className="btn btn-info">Ver Clima</button>
					</Link>
					{/* Link al formulario */}
					<Link to="/dashboard" style={{ marginRight: "15px" }}>
						<button className="btn btn-success">Agregar Actividad</button>
					</Link>
					{/* Botón para cerrar sesión */}
					<Logout onSignOut={handleSignOut} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
