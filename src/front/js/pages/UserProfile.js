import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/savedSongs"); // Redirige automáticamente a canciones guardadas
    }, []);

    return null; // No renderiza nada, solo redirige
};

export default UserProfile;

