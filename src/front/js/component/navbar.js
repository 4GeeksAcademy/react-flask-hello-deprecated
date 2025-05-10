import React, { useState } from "react";
import { Link } from "react-router-dom";
import logotipo from "../../img/PatasperdidasPNG.png"


export const Navbar = () => {
	const [logged, setLogged] = useState(false)
	const [user, setUser] = useState("Usuario");

	const loginStatus = () => {
		// Aquí podrías integrar lógica de autenticación
		setUser("Juan Pérez"); // Simula que obtuviste el nombre del usuario
		setLogged(true); // Cambia el estado a "logueado"
	};
	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div className="container ">
				<Link to="/" className="nav-link"  ><img width="50" height="50" src={logotipo} alt="logo"></img></Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto ">
						<li className="nav-item">
							<Link to="/" className="adlam-display-regular nav-link me-2" href="#">
								Inicio
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/map" className="adlam-display-regular nav-link  me-2" href="#">
								Mapa
							</Link>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-2" href="#">
								¿Qué es?
							</a>
						</li>
						<li className="nav-item">
							<Link to="/PetView" className="adlam-display-regular nav-link  me-4">
								Mascotas
							</Link>
						</li>
						<li className="nav-item d-flex align-items-center">
							<input className="form-control border-0  me-2" type="text" placeholder="🔎 Search" ></input>
						</li>
					</ul>
					{logged ? (
						<div className="navbar-nav ms-auto" >
						<Link to="/user" href="#" className=" adlam-display-regular nav-link nav-item">{user}</Link>
						<button className=" adlam-display-regular btn btn-warning  btn-sm nav-item " onClick={loginStatus} >Cerrar sesión</button>
					</div>
					) : (
						<Link to="/login"><button className=" adlam-display-regular btn btn-primary ms-2 rounded-pill btnStart" onClick={loginStatus} >Iniciar sesión</button></Link>
					)}
				</div>
			</div>
		</nav>
	);
}
