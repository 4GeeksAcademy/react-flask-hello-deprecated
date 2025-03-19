import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import "../../styles/teamCard.css";

export const TeamCard = ({ team }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="TeamCard__card">
            <div>
                <h5 className="mb-0">Equipo {team.team_number}</h5>
                <hr className="mt-0 mb-2 mt-1" />
            </div>

            <div className='mt-3'>

                <div className="d-flex">
                    <nav className="TeamCard__card--position">IZQ</nav>

                    <p className="mb-0">{
                        team.left ? store.torneo.participants.filter(el => el.id === team.left.player_id)[0]?.name
                            : "Esperando compañero"
                    }</p>
                </div>

                <div className="d-flex">
                    <nav className="TeamCard__card--position">DER</nav>

                    <p className="mb-0">{
                        team.right ? store.torneo.participants.filter(el => el.id === team.right.player_id)[0]?.name
                            : "Esperando compañero"
                    }</p>
                </div>
            </div>
        </div>
    );
};