import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/hostProfileEdit.css";
import { HostCard} from "../component/hostCard.jsx";


export const HostProfileEdit = () => {
    const { store, actions } = useContext(Context);

    return(
        <div className="container">
            <p>EDIT PROFILE</p>
            <HostCard viewMode={'updatehost'}/>
        </div>
    );
};