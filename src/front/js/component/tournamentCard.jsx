import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/tournamentCard.css";

export const TournamentCard = (props) => {
    const [showImage, setShowImage] = useState(false);

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm rounded-lg overflow-hidden d-flex flex-row">
                <img className="tournamentCard__img" src={props.image} alt={props.name} onClick={() => setShowImage(true)}/>
                <div className="card-body p-3">
                    <h5 className="card-title font-weight-bold mb-2 text-center"><strong>{props.name}</strong></h5>
                    <hr/>
                    <p className="card-text"><strong>Nombre:</strong> {props.host.name}</p>
                    <p className="card-text"><strong>Dirección:</strong> {props.host.address}</p>
                    <p className="card-text"><strong>Horario:</strong> {new Date(props.schedule).toLocaleString()}</p>
                    <p className="card-text"><strong>Tipo:</strong> {props.type}</p>
                    <p className="card-text"><strong>Rating:</strong> {props.rating}</p>
                    <br />
                    <Link to={`/tournament/view/${props.id}`} className="text-decoration-none d-flex justify-content-end">
                        <button className="btn btn-primary btn-sm">Ver detalles</button>
                    </Link>
                </div>
            </div>

            {showImage && (
                <div className="tournamentCard__overlay" onClick={() => setShowImage(false)}>
                    <img src={props.image} alt={props.name} className="tournamentCard__fullscreen" />
                </div>
            )}
        </div>
    );
};
