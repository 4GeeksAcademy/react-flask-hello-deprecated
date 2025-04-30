import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <Formulario type={'login'}/>
            <p className="fw-bold">¿Aún no tienes tu cuenta?</p>
            <Link to="/signup">
                <button className="btn text-warning text-decoration-underline">Crea la tuya aquí</button>
            </Link>
        </div>
    );
};
