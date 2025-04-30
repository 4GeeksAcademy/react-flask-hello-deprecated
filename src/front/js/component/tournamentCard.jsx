import React from "react";
import { Link } from "react-router-dom";



export const TournamentCard = (props) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img className="card-img-top" src={props.img} alt={props.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text"><strong>Schedule:</strong> {new Date(props.schedule).toLocaleString()}</p>
                    <p className="card-text"><strong>Type:</strong> {props.type}</p>
                    <p className="card-text"><strong>Rating:</strong> {props.rating}</p>
                    <br />
                    <Link to={`/tournaments/${props.id}`}>
                    <button className="btn btn-primary">Ver detalles</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};