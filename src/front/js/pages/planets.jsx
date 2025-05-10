import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const [planetDetails, setPlanetDetails] = useState(null);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (uid) {
            const fetchDetails = async () => {
                const response = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
                const data = await response.json();
                setPlanetDetails({ ...data.result.properties, uid: data.result.uid, type: "planets" });
            };
            fetchDetails();
        } else {
            actions.loadPlanets();
        }
    }, [uid]);

    const handleBack = () => {
        setPlanetDetails(null);
        navigate("/planets");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-warning mb-4">Planets</h1>
            {!planetDetails ? (
                <div className="row">
                    {store.planets.map((planet) => (
                        <div key={planet.uid} className="col-md-4 mb-4">
                            <div className="card bg-dark text-warning border-warning">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${planet.uid}.jpg`}
                                    className="card-img-top"
                                    alt={planet.name}
                                    onError={(e) => {
                                        e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <button
                                        className="btn btn-outline-warning me-2"
                                        onClick={() => navigate(`/planets/${planet.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => actions.addFavorite({ ...planet, type: "planets" })}
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
                    <h2>{planetDetails.name}</h2>
                    <img
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${planetDetails.uid}.jpg`}
                        alt={planetDetails.name}
                        className="img-fluid mb-3"
                        onError={(e) => {
                            e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                        }}
                    />
                    <ul className="list-group bg-dark border-warning">
                        <li className="list-group-item bg-dark text-warning">Diameter: {planetDetails.diameter}</li>
                        <li className="list-group-item bg-dark text-warning">Rotation Period: {planetDetails.rotation_period}</li>
                        <li className="list-group-item bg-dark text-warning">Orbital Period: {planetDetails.orbital_period}</li>
                        <li className="list-group-item bg-dark text-warning">Gravity: {planetDetails.gravity}</li>
                        <li className="list-group-item bg-dark text-warning">Population: {planetDetails.population}</li>
                        <li className="list-group-item bg-dark text-warning">Climate: {planetDetails.climate}</li>
                        <li className="list-group-item bg-dark text-warning">Terrain: {planetDetails.terrain}</li>
                        <li className="list-group-item bg-dark text-warning">Surface Water: {planetDetails.surface_water}</li>
                    </ul>
                    <button className="btn btn-outline-warning mt-3" onClick={handleBack}>
                        Back to Planets
                    </button>
                </div>
            )}
        </div>
    );
};