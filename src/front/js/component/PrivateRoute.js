import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = ({ children }) => {
    const { store } = useContext(Context);
    return store.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
