import React, { useState } from "react";
import "../../styles/Profile.css"; // Verifica que esté importado correctamente


const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Usuario autenticado
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No estás autenticado");
        return;
    }
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const backendUrl = process.env.BACKEND_URL?.endsWith("/")
        ? process.env.BACKEND_URL.slice(0, -1)
        : process.env.BACKEND_URL;

    if (!backendUrl) {
        console.error("URL del backend no configurada.");
    }
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!token || !user) {
            alert("Usuario no autenticado");
            return;
        }

        setLoading(true);

        try {
            const updatedUser = {
                name,
                email,
                ...(password && { password }),
            };

            const response = await fetch(`${backendUrl}/api/user/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                alert("Perfil actualizado correctamente");
                setName(data.name);
                setEmail(data.email);
                setPassword("");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Error al actualizar el perfil");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!token || !user) {
            alert("Usuario no autenticado");
            return;
        }
    
        if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
            try {
                const response = await fetch(`${backendUrl}/api/user/${user.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.ok) {
                    alert("Cuenta eliminada correctamente");
                    localStorage.clear();
                    window.location.href = "/";
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Error al eliminar la cuenta");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Ocurrió un error al eliminar la cuenta.");
            }
        }
    };
    
            

    return (
        <div className="profile-container">
            <h2>Perfil</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña (opcional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
            <button className="delete-button" onClick={handleDelete} disabled={loading}>
                {loading ? "Eliminando..." : "Eliminar Cuenta"}
            </button>
        </div>
    );
};

export default Profile;
