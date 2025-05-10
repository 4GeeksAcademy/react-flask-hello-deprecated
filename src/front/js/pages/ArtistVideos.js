import React from "react";

const ArtistVideos = ({ artistData }) => {
    return (
        <div>
            <h2>Vídeos</h2>
            {artistData.videos && artistData.videos.length > 0 ? (
                <div className="videos-container">
                    {artistData.videos.map((videoUrl, index) => (
                        <div key={index} className="video-wrapper">
                            <iframe
                                width="560"
                                height="315"
                                src={videoUrl}
                                title={`Video ${index}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay vídeos disponibles.</p>
            )}
            {/* Aqui irá el botón para subir vídeos si eres el dueño del perfil */}
        </div>
    );
};

export default ArtistVideos;
