import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/hostProfileEdit.css";
import { HostCard} from "../component/hostCard.jsx";


export const HostProfileEdit = () => {
    const { store, actions } = useContext(Context);

    return(
        <div className="pt-5 px-5 bg-light">
            <h1>Editar Perfil</h1>
            <hr className="mb-0"></hr>
            <HostCard viewMode={'updatehost'}/>
        </div>
    );
};