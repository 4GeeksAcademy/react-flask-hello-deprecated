import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { BracketsCard } from "../component/bracketsCard.jsx";

export const TournamentDetails = () => {

    const { store, actions } = useContext(Context)

    const params = useParams()

    useEffect(() => {
        // Solo llamamos a getOneTournament cuando el ID cambia
        if (params.id) {
            actions.getOneTournament(params.id);
        }
    }, [params.id]);

    return (
        <>
            <div className="card">
                <div className="d-flex justify-content-around">
                    <div>
                        <figure>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
                            <figcaption className="text-center">
                                {store.torneo?.name}
                            </figcaption>
                        </figure>
                    </div>
                    <div>
                        <p>Tipo de torneo: {store.torneo?.type}</p>
                        <p>Coste de inscripción: {store.torneo?.inscription_fee}</p>
                        <p>Rating del torneo: {store.torneo?.rating}</p>
                        <p>Fecha y hora:  {new Date(store.torneo?.schedule).toLocaleString()}</p>
                        <p>Recompensas: {store.torneo?.award}</p>
                        <p>Ganador del torneo: {store.torneo?.tournament_winner}</p>
                        {/* <p>{store.torneo?.image}</p> */}
                        <p>Total de participantes: {store.torneo?.participants_amount}</p>
                        {/* <p>{store.torneo?.host}</p> */}
                    </div>
                </div>
            </div>

            <BracketsCard />
        </>
    )
}
