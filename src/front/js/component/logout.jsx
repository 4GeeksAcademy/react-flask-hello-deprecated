import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
export const LogoutButton = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    
    const handleLogout = () => {
        actions.logout()
        navigate("/")
    }

    return (
        <button onClick={handleLogout} className='btn btn-danger rounded-pill shadow-sm'>Cerrar sesión</button>
    );
};

