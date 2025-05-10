import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ children, roles }) => {
    const { store } = useContext(Context);



    const getSession = () => {
        switch (store.token) {
            case undefined:

                return <h1>Cargando aplicacion</h1>

            case null:

                return <Navigate to="/login" />
            default:

                if (roles.includes(store.role)) {

                    return children;
                }

                return <Navigate to="/unauthorized" />
        }



    }
    return getSession()
};

export default ProtectedRoute;

