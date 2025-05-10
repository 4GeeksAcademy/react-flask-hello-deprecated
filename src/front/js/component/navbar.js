import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Thememode } from "./Thememode"
import logo from "../../img/logo-sin-fondo.jpg"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.verifyToken();  // ✅ Verifica el token cuando el Navbar se monta
	}, []);


	
	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="container-fluid margintop d-flex align-items-center">
				<Link to="/">
					<img
						src={logo}
						className="navbar-brand backnavbar"
						style={{ width: "3rem" }}
						alt="Logo"
					/>
				</Link>

				<ul className="navbar-nav d-flex flex-row w-75 justify-content-center gap-5 fs-5 textcolors">
					<li className="nav-item ms-5 me-5 textcolors">
						{store.auth ? <Link className="nav-link" to="/profile">
							Profile
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5 textcolors">
						{store.auth ? <Link className="nav-link" to="/notes">
							Notes
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5">
						{store.auth ? <Link className="nav-link" to="/habit-tracker">
							Habit-Tracker
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5">
						{store.auth ? <Link className="nav-link" to="/projects">
							Projects
						</Link> : null}
					</li>
				</ul>

				<div className="ms-auto">
					{!store.auth && ( // 🔥 Aquí se oculta el botón si el usuario está autenticado
						<Link to="/login">
							<button className="me-5 backbutton border rounded text-black p-1 w-100">
								Login
							</button>
						</Link>
					)}
					{store.auth && ( // Botón de Logout
						<button
							onClick={() => {
								localStorage.removeItem("token");
								actions.verifyToken(); // Actualizamos el estado
							}}
							className="me-5 btn btn-danger border rounded text-black p-1 w-100">
							Logout
						</button>
					)}

					{store.auth && (<div class="dropdown ">
						<button class="  me-5 backbutton border rounded text-black p-1 w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="fa-solid fa-gear"></i>
						</button>
						<ul class="dropdown-menu">
							<li><button class="dropdown-item" type="button"><Thememode/></button></li>
							<li><button class="dropdown-item" type="button">Another action</button></li>
							<li><button class="dropdown-item" type="button">Something else here</button></li>
						</ul>
					</div>)}
				</div>
			</div>
			{/* <Thememode /> */}
		</nav>
	);
};
