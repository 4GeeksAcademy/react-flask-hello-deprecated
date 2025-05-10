import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/hostProfile.css";
import { HostCard } from "../component/hostCard.jsx";


export const HostProfile = () => {
    const { store, actions } = useContext(Context);

    return(
        <div className="container">
            <p>PROFILE</p>
            <HostCard viewMode={'hostPage'}/>
        </div>
    );
};