// ArtistProfile.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtistBio from "./ArtistBio";
import ArtistImages from "./ArtistImages";
import ArtistVideos from "./ArtistVideos";
import ArtistMusic from "./ArtistMusic";
import "../../styles/artistProfile.css";

const ArtistProfile = () => {
    const { artistId } = useParams();
    const [activeTab, setActiveTab] = useState("bio");
    const [artistData, setArtistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                // Simula una llamada a la API
                const data = {
                    id: artistId,
                    name: "Artist Example",
                    profilePicture: "https://placehold.co/600x400",
                    biography: "Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...Esta es la biografía de ejemplo del artista...",
                    images: ["https://placehold.co/300", "https://placehold.co/300"],
                    videos: ["https://www.youtube.com/embed/VIDEO_ID"],
                    music: [
                        { id: 1, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 2, title: "Canción 2", url: "https://placehold.co/audio2" },
                        { id: 3, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 4, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 5, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 6, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 7, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 8, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 9, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 10, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 11, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 12, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 13, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 14, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 15, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 16, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 17, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 18, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 19, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 20, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 21, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 22, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 23, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 24, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 25, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 26, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 27, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 28, title: "Canción 1", url: "https://placehold.co/audio1" },
                        { id: 29, title: "Canción 1", url: "https://placehold.co/audio1" }

                    ]
                };
                setArtistData(data);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los datos del artista.");
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const handleTabChange = (tab) => setActiveTab(tab);

    // Lógica para seguir al artista (ejemplo simple)
    const handleFollow = () => {
        console.log("Siguiendo al artista:", artistData.id);
        // Aquí implementas la lógica de seguir (API, estado, etc.)
    };

    return (
        <div className="artist-profile-container">
            {/* Encabezado del perfil */}
            <div className="artist-header">
                <div className="artist-img-container">
                    <img
                        src={artistData.profilePicture}
                        alt="Artist"
                        className="artist-profile-picture"
                    />
                    <button className="follow-button" onClick={handleFollow}>
                        Seguir
                    </button>
                </div>
                <h1>{artistData.name}</h1>
            </div>

            {/* Menú de pestañas */}
            <div className="artist-tabs">
                <button
                    className={activeTab === "bio" ? "active" : ""}
                    onClick={() => handleTabChange("bio")}
                >
                    Biografía
                </button>
                <button
                    className={activeTab === "images" ? "active" : ""}
                    onClick={() => handleTabChange("images")}
                >
                    Imágenes
                </button>
                <button
                    className={activeTab === "videos" ? "active" : ""}
                    onClick={() => handleTabChange("videos")}
                >
                    Vídeos
                </button>
                <button
                    className={activeTab === "music" ? "active" : ""}
                    onClick={() => handleTabChange("music")}
                >
                    Música
                </button>
            </div>

            {/* Contenido de la pestaña activa */}
            <div className="artist-content">
                {activeTab === "bio" && <ArtistBio artistData={artistData} />}
                {activeTab === "images" && <ArtistImages artistData={artistData} />}
                {activeTab === "videos" && <ArtistVideos artistData={artistData} />}
                {activeTab === "music" && <ArtistMusic artistData={artistData} />}
            </div>
        </div>
    );
};

export default ArtistProfile;
