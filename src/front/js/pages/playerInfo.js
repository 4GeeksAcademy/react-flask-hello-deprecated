import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { PlayerCard } from "../component/playerCard.jsx";
import { TournamentCard } from "../component/tournamentCard.jsx";

export const Player = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getTournaments();
    }, []);

    return (
        <div className="pt-5 px-5 bg-light">
            <PlayerCard use={'playerPage'} />
            <h2 className="d-flex justify-content-center bg-light"> Torneos en los que estás inscrito</h2>
            <div className="d-flex justify-content-center bg-light row py-5">
                {store.tournaments.filter(
                    tournament => tournament.participants?.some(participant => participant.player_id === store.player_info?.id)).length > 0 ? 
                        (store.tournaments.filter(
                            tournament => tournament.participants?.some(participant => participant.player_id === store.player_info?.id))
                        .map(tournament => (
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
                    <p className="d-flex justify-content-center bg-light text-center">
                        No te has inscrito a ningún torneo todavía.
                    </p>
                )
                }
            </div>
        </div>
    );
};
