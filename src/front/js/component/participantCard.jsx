import React, { useContext, useState } from 'react';
import "../../styles/teamCard.css";
import { Context } from '../store/appContext';

export const ParticipantCard = ({participant, tournamentId, playerId}) => {

    const { store, actions } = useContext(Context)

    const handleDelete = () => {
        actions.removeParticipant(tournamentId, playerId)
        actions.getOneTournament(tournamentId)
        
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"><strong>Name: </strong>{participant.name}</h5>
                    <p className="card-text"><strong>Phone: </strong> {participant.phone}</p>
                    <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
            </div>
        </div>
    );
};