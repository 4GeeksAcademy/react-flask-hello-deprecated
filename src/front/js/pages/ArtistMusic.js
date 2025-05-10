// ArtistMusic.js
import React from "react";
import "../../styles/artistProfile.css";

const ArtistMusic = ({ artistData }) => {
    // Aquí podemos implementar la lógica para manejar el "like"
    const handleLike = (trackId) => {
        console.log("Liked track:", trackId);
        // Aquí llamamos a la API o actualizamos el estado
    };

    return (
        <div>
            <h2>Música</h2>
            {artistData.music && artistData.music.length > 0 ? (
                <ul className="song-list">
                    {artistData.music.map((track) => (
                        <li key={track.id} className="song-item">
                            <span>
                                <strong>{track.title}</strong>
                            </span>
                            <button
                                className="like-button"
                                onClick={() => handleLike(track.id)}
                            >
                                👍 Like
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay canciones disponibles.</p>
            )}
            {/* Aqui irá el botón para subir canciones si eres el dueño del perfil */}
        </div>
    );
};

export default ArtistMusic;
