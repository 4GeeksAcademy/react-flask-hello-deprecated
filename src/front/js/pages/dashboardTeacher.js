import React, { useContext } from "react";
import NavBar from "../component/Navbar";
import "../../styles/components.css";
import { Context } from "../store/appContext";
import { LeftMenuTeacher } from "../component/leftMenuTeacher";

export const DashboardTeacher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <NavBar />
            <div className="row">
                <div className="col mt-5">
                    <LeftMenuTeacher />
                </div>
            </div>
        </div>
    );
}

export default DashboardTeacher;