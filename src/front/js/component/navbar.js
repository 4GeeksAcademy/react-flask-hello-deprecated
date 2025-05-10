import React from "react";
import { Link } from "react-router-dom";
import { Thememode } from "./Thememode"
import logo from "../store/logo-sin-fondo.jpg"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="container-fluid margintop">
			<Link to="/">
                    <img
                        src={logo}
                        className="navbar-brand backnavbar	"
                        style={{ width: "3rem" }}
                    />
                </Link>
				<div className="ml-">
					<Link to="/login">
						<button className=" w-100 me-5 backbutton border border rounded text-black p-1">Login</button>
					</Link>
				</div>
			</div>
			<Thememode/>
		</nav>
	);
};

