import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Home = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState(null); // Estado para controlar el usuario logueado

	// Función para simular login (reemplaza con tu lógica real)
	const handleLogin = () => {
		setUser({
			email: "usuario@ejemplo.com",
			name: "Usuario Demo"
		});
	};

	// Función para logout
	const handleLogout = () => {
		setUser(null);
	};

	return (
		<div className="text-center mt-5">
			{user ? (
				/* --- DASHBOARD PARA USUARIO LOGUEADO --- */
				<div>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1>Bienvenido, {user.name}!</h1>
						<button
							onClick={handleLogout}
							className="btn btn-danger"
						>
							Cerrar sesión
						</button>

					</div>
					<h1>aca debo trabajar inicio de sesion</h1>
					<div className="card mb-4">
						<div className="card-body">
							<div className="alert alert-info">
								{store.message || "Mensaje del backend..."}
							</div>

							<h3>Tu Área Privada</h3>
							<p>Contenido exclusivo para usuarios autenticados</p>
						</div>
					</div>
				</div>
			) : (
				/* --- CONTENIDO PÚBLICO (tu código original) --- */
				<div>
					<h1>aca debo trabajar inicio</h1>
					<div className="alert alert-info">
						{store.message || "Loading message from the backend..."}
					</div>
					<button
						onClick={handleLogin}
						className="btn btn-primary mb-3"
					>
						Acceder al Dashboard
					</button>
					<p>
						This boilerplate comes with lots of documentation:{" "}
						<a href="https://start.4geeksacademy.com/starters/react-flask">
							Read documentation
						</a>
					</p>
				</div>
			)}
		</div>
	);
};