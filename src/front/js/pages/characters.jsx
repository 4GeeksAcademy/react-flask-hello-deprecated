import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const [characterDetails, setCharacterDetails] = useState(null);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (uid) {
            const fetchDetails = async () => {
                const response = await fetch(`https://www.swapi.tech/api/people/${uid}`);
                const data = await response.json();
                setCharacterDetails({ ...data.result.properties, uid: data.result.uid, type: "characters" });
            };
            fetchDetails();
        } else {
            actions.loadCharacters();
        }
    }, [uid]);

    const handleBack = () => {
        setCharacterDetails(null);
        navigate("/characters");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-warning mb-4">Characters</h1>
            {!characterDetails ? (
                <div className="row">
                    {store.characters.map((character) => (
                        <div key={character.uid} className="col-md-4 mb-4">
                            <div className="card bg-dark text-warning border-warning">
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${character.uid}.jpg`}
                                    className="card-img-top"
                                    alt={character.name}
                                    onError={(e) => {
                                        e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <button
                                        className="btn btn-outline-warning me-2"
                                        onClick={() => navigate(`/characters/${character.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => actions.addFavorite({ ...character, type: "characters" })}
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
                    <h2>{characterDetails.name}</h2>
                    <img
                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${characterDetails.uid}.jpg`}
                        alt={characterDetails.name}
                        className="img-fluid mb-3"
                        onError={(e) => {
                            e.target.src = "https://th.bing.com/th/id/R.4c35fbf79d556bbd7a3eefe19b8daea7?rik=6IDHR3Q70SlPhg&pid=ImgRaw&r=0";
                        }}
                    />
                    <ul className="list-group bg-dark border-warning">
                        <li className="list-group-item bg-dark text-warning">Height: {characterDetails.height}</li>
                        <li className="list-group-item bg-dark text-warning">Mass: {characterDetails.mass}</li>
                        <li className="list-group-item bg-dark text-warning">Hair Color: {characterDetails.hair_color}</li>
                        <li className="list-group-item bg-dark text-warning">Skin Color: {characterDetails.skin_color}</li>
                        <li className="list-group-item bg-dark text-warning">Eye Color: {characterDetails.eye_color}</li>
                        <li className="list-group-item bg-dark text-warning">Birth Year: {characterDetails.birth_year}</li>
                        <li className="list-group-item bg-dark text-warning">Gender: {characterDetails.gender}</li>
                    </ul>
                    <button className="btn btn-outline-warning mt-3" onClick={handleBack}>
                        Back to Characters
                    </button>
                </div>
            )}
        </div>
    );
};