import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Verificar si hay un token en la sesión

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return children; // Renderiza los componentes protegidos si está autenticado
};

export default ProtectedRoute;
