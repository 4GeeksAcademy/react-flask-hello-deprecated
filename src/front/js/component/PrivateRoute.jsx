import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";


const PrivateRoute =({children, allowedRoles }) =>{
    const {store} = useContext (Context);
    const userRole = store.userProfile?.rol;
    console.log(allowedRoles.includes(userRole));
    console.log(allowedRoles);
    console.log("Is Authorized:", allowedRoles.includes(userRole));

    // if (!userRole) return <Navigate to= "/iniciar-sesion" />;
    if (userRole === "user") return <Navigate to= "/iniciar-sesion" />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;
  
    return children;
};

export default PrivateRoute;