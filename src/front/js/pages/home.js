import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div
				className="d-flex justify-content align-items-center"
				style={{
					height: "90vh",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<div className="container  z-3" >
					<h1 className=" adlam-display-regular fw-bolder fs-4 mb-3">
						Una ayuda para encontrar mascotas perdidas en tu zona.
					</h1>
					<p className="adlam-display-minusc text-muted fs-5 mb-4">
						Encuentra a tu mascota o ayuda a otra persona a encontrarla. Miles
						de historias felices nos respaldan.
					</p>
					<div className=" row d-flex justify-content">
						<Link to = "/newpetlost">
						<button className="btn btn-danger col-sm-3 rounded-pill btn-md shadow">Perdí a mi mascota</button>
						</Link>
						<div className="w-100 mt-3"></div>
						<Link to="/newpetfound">
						<button className="btn btn-success col-sm-3 rounded-pill btn-md shadow">Encontré una mascota</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
