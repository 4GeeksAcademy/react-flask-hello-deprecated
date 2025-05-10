import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1>Bienvenido a tu perfil</h1>
            <button className="btn btn-danger mt-3" onClick={() => actions.logoutUser(navigate)}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Profile;
