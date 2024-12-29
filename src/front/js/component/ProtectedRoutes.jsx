import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Outlet, Navigate } from "react-router-dom";


export const ProtectedRoutes = () => {
    const { store } = useContext(Context);

    return store.user ? <Outlet /> : <Navigate to="/login" />
}