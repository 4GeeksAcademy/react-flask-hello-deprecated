import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Starships = () => {
    const { store, actions } = useContext(Context);
    const [starshipDetails, setStarshipDetails] = useState(null);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (uid) {
            const fetchDetails = async () => {
                const response = await fetch(`https://www.swapi.tech/api/starships/${uid}`);
                const data = await response.json();
                setStarshipDetails({ ...data.result.properties, uid: data.result.uid, type: "starships" });
            };
            fetchDetails();
        } else {
            actions.loadStarships();
        }
    }, [uid]);

    const handleBack = () => {
        setStarshipDetails(null);
        navigate("/starships");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-warning mb-4">Starships</h1>
            {!starshipDetails ? (
                <div className="row">
                    {store.starships.map((starship) => (
                        <div key={starship.uid} className="col-md-4 mb-4">
                            <div className="card bg-dark text-warning border-warning">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${starship.uid}.jpg`}
                                    className="card-img-top"
                                    alt={starship.name}
                                    onError={(e) => {
                                        e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{starship.name}</h5>
                                    <button
                                        className="btn btn-outline-warning me-2"
                                        onClick={() => navigate(`/starships/${starship.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => actions.addFavorite({ ...starship, type: "starships" })}
                                    >
                                        ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-warning">
                    <h2>{starshipDetails.name}</h2>
                    <img
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${starshipDetails.uid}.jpg`}
                        alt={starshipDetails.name}
                        className="img-fluid mb-3"
                        onError={(e) => {
                            e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                        }}
                    />
                    <ul className="list-group bg-dark border-warning">
                        <li className="list-group-item bg-dark text-warning">Model: {starshipDetails.model}</li>
                        <li className="list-group-item bg-dark text-warning">Starship Class: {starshipDetails.starship_class}</li>
                        <li className="list-group-item bg-dark text-warning">Manufacturer: {starshipDetails.manufacturer}</li>
                        <li className="list-group-item bg-dark text-warning">Cost in Credits: {starshipDetails.cost_in_credits}</li>
                        <li className="list-group-item bg-dark text-warning">Length: {starshipDetails.length}</li>
                        <li className="list-group-item bg-dark text-warning">Crew: {starshipDetails.crew}</li>
                        <li className="list-group-item bg-dark text-warning">Passengers: {starshipDetails.passengers}</li>
                        <li className="list-group-item bg-dark text-warning">Max Atmosphering Speed: {starshipDetails.max_atmosphering_speed}</li>
                        <li className="list-group-item bg-dark text-warning">Hyperdrive Rating: {starshipDetails.hyperdrive_rating}</li>
                        <li className="list-group-item bg-dark text-warning">MGLT: {starshipDetails.MGLT}</li>
                        <li className="list-group-item bg-dark text-warning">Consumables: {starshipDetails.consumables}</li>
                    </ul>
                    <button className="btn btn-outline-warning mt-3" onClick={handleBack}>
                        Back to Starships
                    </button>
                </div>
            )}
        </div>
    );
};