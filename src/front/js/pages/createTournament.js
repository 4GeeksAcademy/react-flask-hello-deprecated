import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

import "../../styles/home.css";

import { TournamentForm } from "../component/tournamentForm.jsx";

export const CreateTournament = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem('token');

        if (!token) {   //Si no hay token redirijo al login.
            navigate('/login');
            return;
        }

        if (!actions.checkUser) navigate('/')


    }, [navigate]);

    return (
        <div className="text-center d-flex justify-content-center">
            <TournamentForm />
        </div>
    );
};