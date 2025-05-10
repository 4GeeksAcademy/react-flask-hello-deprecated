import React, { useState } from "react";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Usuario autenticado
    const token = localStorage.getItem("token");

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState(""); // No se envía si está vacío
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
                ...(password && { password }), // Solo incluye si existe
            };

            const response = await fetch(`${backendUrl}/api/user/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data)); // Actualiza la sesión con los datos retornados
                alert("Perfil actualizado correctamente");
                setPassword(""); // Limpia el campo de contraseña
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Error al actualizar el perfil");
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

        if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.")) {
            setLoading(true);
            try {
                const response = await fetch(`${backendUrl}/api/user/profile`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Cuenta eliminada correctamente");
                    localStorage.clear();
                    window.location.href = "/"; // Redirige al inicio
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || "Error al eliminar la cuenta");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Ocurrió un error al eliminar la cuenta.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="profile-container">
            <h2>Perfil</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Nueva contraseña (opcional)</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Nueva contraseña"
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