import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/hostProfile.css";
import { HostCard } from "../component/hostCard.jsx";
import { TournamentCard } from "../component/tournamentCard.jsx";



export const HostProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getTournaments();
    }, []);

    return (
        <div className="pt-5 px-5 bg-light">
            <HostCard viewMode={'hostPage'} />
            <h2 className="d-flex justify-content-center bg-light py-5"> Torneos creados </h2>
            <div className="d-flex justify-content-center bg-light row">
                {store.tournaments?.some(tournament => tournament.host?.id === store.host_info?.id) ? (
                    store.tournaments
                        .filter(tournament => tournament.host?.id === store.host_info?.id)
                        .map((tournament) => (
                            <TournamentCard
                                key={tournament.id}
                                id={tournament.id}
                                name={tournament.name}
                                host={tournament.host}
                                image={tournament.image}
                                type={tournament.type}
                                rating={tournament.rating}
                                schedule={tournament.schedule}
                            />
                        ))
                ) : (
                    <p className="text-center">No has creado ningún torneo todavía.</p>
                )}
            </div>


        </div>
    );
};