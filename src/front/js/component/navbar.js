import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

//styles
import styles from "./navbar.module.css"


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	const handleSidebar = () => {
		actions.toggleSideBar()
	}

	const navigate = useNavigate()

	const handleLogOut = () => {
		actions.logOut()
		navigate("/")
	}

	return (
		<nav className={`${styles.navbar__container} navbar navbar-expand-lg bg-body-tertiary`}>
			<div className="container-fluid">
				<div className="d-flex  align-items-center w-100">
					<Link to="/" className={`${styles.navbar__brand} navbar-brand fs-2 `} >Workland</Link>
					<button onClick={handleSidebar} style={{width:"40px"}} className="btn btn-secondary">
						{
							store.sidebarOpen === false ?
								<i className="fa-solid fa-bars"></i>
								:
								<i className="fa-solid fa-xmark"></i>

						}

					</button>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">x</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="w-100">
						<div className="d-grid gap-2 d-md-flex justify-content-md-end">

							{store.userProfile?.name ?

								<div className="dropdown d-flex align-items-center">
									<div
										className="d-flex align-items-center justify-content-center flex-row dropdown-toggle ms-2"
										id="dropdownMenuButton"
										data-bs-toggle="dropdown"
										aria-expanded="false"
										style={{ cursor: "pointer" }}
									>
										<div
											className="rounded-circle"
											style={{
												height: "30px",
												width: "30px",
												marginLeft: "10px",
												marginRight: "10px",
											}}
										>
											<img
												className="rounded-circle"
												src={store.userProfile.img_url}
												alt="imagen perfil"
												style={{
													width: "100%",
													height: "100%",
													objectFit: "cover",
												}}
											/>
										</div>
										<p className="m-0 text-white">{`de ${store.userProfile.name}`}</p>
									</div>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li>
											<Link className="dropdown-item" to="/freeEdit">
												Mi perfil
											</Link>
										</li>

										<li>
											<button className="dropdown-item" onClick={handleLogOut}>
												Cerrar sesión
											</button>
										</li>
									</ul>
								</div>

								:
								<>
									<Link to="/registro"><button className={`${styles.navbar__btn__register} btn me-md-2`} type="button">Registrarse</button></Link>

									<Link to="/iniciar-sesion"><button className={`${styles.navbar__btn__login} btn me-md-2 text-nowrap`} type="button">Iniciar sesion</button></Link>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
