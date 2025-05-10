import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { TournamentForm } from "../component/tournamentForm.jsx";

export const CreateTournament = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center d-flex justify-content-center">
            <TournamentForm />
        </div>
    );
};