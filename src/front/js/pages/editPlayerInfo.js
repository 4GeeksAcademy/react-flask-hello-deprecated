import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import {PlayerCard} from "../component/playerCard.jsx";

export const EditPlayer = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="pt-5 px-5 bg-light">
            <h1>Editar Perfil</h1>
            <hr className="mb-0"></hr>
            <PlayerCard use={'updateplayer'}/>
        </div>
    );
};
