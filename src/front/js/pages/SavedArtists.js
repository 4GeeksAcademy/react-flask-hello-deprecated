import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/userProfile.css";

export const SavedArtists = () => {
    const [artists, setArtists] = useState([
        { id: 1, name: "Artist A", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Artist B", image: "https://via.placeholder.com/50" }
    ]);

    const removeArtist = (id) => {
        setArtists(artists.filter(artist => artist.id !== id));
    };

    return (
        <div className="profile-container">
            <h2>🎤 Artistas Seguidos</h2>
            <div className="options">
                <Link to="/savedSongs" className="option-button">🎵 Canciones Guardadas</Link>
                <Link to="/savedArtists" className="option-button active">🎤 Artistas Seguidos</Link>
            </div>
            {artists.length === 0 ? <p>No sigues a ningún artista.</p> : (
                <ul>
                    {artists.map(artist => (
                        <li key={artist.id}>
                            <img src={artist.image} alt={artist.name} />
                            {artist.name}
                            <button onClick={() => removeArtist(artist.id)}>❌</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
