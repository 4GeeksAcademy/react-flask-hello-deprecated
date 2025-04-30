import React, { useContext, useState, } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/navbar.css";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	console.log("Usuario:", store.user);
	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container-fluid d-flex justify-content-between mx-0">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1 text-light">PadelZone</span>
				</Link>
				{store.user && store.user.player === false && (
      			<Link to="/create_tournament" className="text-decoration-none">
        			<button className="btn btn-primary">Crear torneo</button>
      			</Link>
    )}

				<div className="d-flex">
					<div className="ml-auto">
						<Link to="/tournaments">
							<button className="btn text-light">Torneos</button>
						</Link>
					</div>

					<div className="ml-auto d-flex justify-content-center align-items-center ">
						{store.user?
							<Link to={store.user.player?"/player/profile":"/host/profile"}>

								<div>
									{store.user.profilePicture ? (
										// Si el usuario tiene foto de perfil, mostrar la imagen
										<img
										src={store.user.profilePicture}
										alt="Perfil"
										className="btn btn-primary rounded-circle navbar__profileIcon"
										/>
									) : (
										// Si no tiene foto de perfil, mostrar el icono
										<FontAwesomeIcon
										icon={faUser}
										className="btn btn-primary rounded-circle "
										/>
									)}
								</div>	

							</Link>:
							
							<Link to="/login">
								<button className="btn btn-primary">Registro/Acceso</button>
							</Link>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};
