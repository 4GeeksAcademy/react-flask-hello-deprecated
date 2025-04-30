import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	console.log(store.user);
	return (
		<div className="text-center mt-5">
			<Formulario type={'register'}/>
		</div>
	);
};

