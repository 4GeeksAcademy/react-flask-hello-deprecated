import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/tournamentDetails.css";

import { BracketCard16 } from "../component/bracketCard16.jsx";
import { BracketCard8 } from "../component/BracketCard8.jsx";
import { TeamCard } from "../component/TeamsCard.jsx";
import { ParticipantCard } from "../component/participantCard.jsx";

export const TournamentDetails = () => {
    const [showImage, setShowImage] = useState(false);
    const { store, actions } = useContext(Context)
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            actions.getOneTournament(params.id);
            actions.getTournamentParticipants(params.id)
        }
    }, [params.id]);


    const handleSubmit = () => {
        if (params.id) {
            actions.registerParticipant(params.id);
        } else {
            console.error("Error: tournamentId está undefined");
        }
    };

    return (
        <div className="container-fluid p-4">

            {/* Sección de Detalles */}
            <div className="card rounded-lg">
                <div className="row g-0">

                    <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                        <img
                            src={store.torneo?.image}
                            alt={store.torneo?.name}
                            className="img-fluid rounded-lg tournamentCard__img"
                            onClick={() => setShowImage(true)}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title display-5 fw-bold mb-4">{store.torneo?.name}</h1>

                            {/* Información del torneo */}
                            <div className="mb-4">
                                <h3 className="fw-bold mb-3">Información del Torneo</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Tipo de torneo:</strong> {store.torneo?.type}</p>
                                        <p className="card-text"><strong>Fecha:</strong> {new Date(store.torneo?.schedule).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <p className="card-text"><strong>Hora:</strong> {new Date(store.torneo?.schedule).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Rating del torneo:</strong> {store.torneo?.rating}</p>
                                        <p className="card-text"><strong>Coste de inscripción:</strong> {store.torneo?.inscription_fee}€</p>
                                        <p className="card-text"><strong>Recompensas:</strong> {store.torneo?.award}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información del sitio */}
                            <div className="mb-4">
                                <h3 className="fw-bold mb-3">Información del sitio</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Nombre:</strong> {store.torneo?.host?.name}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Dirección:</strong> {store.torneo?.host?.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Participación */}
                            <div className="mb-4">
                                <h3 className="fw-bold mb-3">Participación</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Total de participantes:</strong> {store.torneo?.participants_amount}</p>
                                        <p className="card-text"><strong>Participantes registrados:</strong> {store.torneo?.participants_registered}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="card-text"><strong>Ganador del torneo:</strong> {store.torneo?.tournament_winner || "Por definir"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="d-flex gap-3 mt-4">

                                {/* Botón de participar */}
                                {store.user?.player &&
                                    !store.torneo?.participants?.flatMap(p => p.tournament_participant || [])
                                        .some(p => p.player_id === store.player_info.id) && (
                                        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>Participar</button>
                                    )
                                }

                                {/* Botón de editar */}
                                {store.host_info?.id === store.torneo?.host?.id && (
                                    <Link to={`/tournament/edit/${params.id}`} className="btn btn-warning btn-lg">Editar</Link>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <br />

            {/* Sección de Equipos */}
            <div className=" container rounded-lg p-4">
                <h2 className="fw-bold mb-4">Equipos Registrados</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
                    {store.torneo?.participants && store.torneo.teams?.length > 0 ? (
                        store.torneo.teams.map((team) => (
                            <div className="col" key={team.id}>
                                <TeamCard team={team} />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">Aún no hay equipos registrados.</p>
                    )}
                </div>
            </div>

            <br />

            {/* Sección del Bracket */}
            <div className="card  rounded-lg p-4 d-flex flex-start">
                <h2 className="fw-bold mb-4">Bracket del Torneo</h2>
                {store.torneo?.participants_amount === 16 && <BracketCard16 tournament={store.torneo} />}
                {store.torneo?.participants_amount === 8 && <BracketCard8 tournament={store.torneo} />}
            </div>

            <br />

            {/* Sección de participantes (solo visible para el host) */}
            {store.host_info?.id === store.torneo?.host?.id && (
                <div className="card shadow-lg rounded-lg p-4">

                    <h2 className="fw-bold mb-4">Participantes Registrados</h2>

                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {store.torneo?.participants?.length > 0 ? (
                            store.torneo.participants.map((participant) => (
                                
                                <div className="col" key={participant.id}>
                                    <ParticipantCard
                                        participant={participant}
                                        tournamentId={store.torneo.id}
                                        playerId={participant.id}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No hay participantes registrados.</p>
                        )}
                    </div>

                </div>
            )}

            {showImage && (
                <div className="tournamentCard__overlay" onClick={() => setShowImage(false)}>
                    <img src={store.torneo?.image} alt={store.torneo?.name} className="tournamentCard__fullscreen" />
                </div>
            )}

        </div>
    )
}
