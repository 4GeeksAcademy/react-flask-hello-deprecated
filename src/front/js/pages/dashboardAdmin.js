import React, { useState, useContext } from "react";
import { LeftMenuAdmin } from "../component/leftMenuAdmin";
import NavBar from "../component/Navbar.js";
import ChatComponent from "../component/chatComponent";
import { Context } from "../store/appContext";

export const DashboardAdmin = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <NavBar />
            <div className="row">
                <div className="col mt-5">
                    <LeftMenuAdmin />
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin