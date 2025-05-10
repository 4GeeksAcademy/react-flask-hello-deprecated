import React from "react";

const ArtistBio = ({ artistData }) => {
    return (
        <div>
            <h2>Biografía</h2>
            <p>{artistData.biography}</p>
            {/* Aqui irá el botón para editar la bio si eres el dueño del perfil */}
        </div>
    );
};

export default ArtistBio;
