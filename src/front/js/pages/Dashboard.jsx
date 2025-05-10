import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardAdmin from "./dashboardAdmin";
import DashboardTeacher from "./dashboardTeacher";
import ParentDashboard from "./ParentDashboard.jsx";

export const Dashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    console.log("Rol obtenido del localStorage:", role);

    if (!role) {
        navigate("/unauthorized");
        return null;
    }

    const renderDashboard = () => {
        switch (role) {
            case "admin":
                return <DashboardAdmin />;
            case "docente":
                return <DashboardTeacher />;
            case "representante":
                return <ParentDashboard />;
            default:
                return <h1>Acceso no autorizado</h1>;
        }
    };

    return <>{renderDashboard()}</>;
};