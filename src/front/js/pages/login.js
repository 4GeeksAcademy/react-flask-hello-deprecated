import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <Formulario type={'login'}/>
        </div>
    );
};
