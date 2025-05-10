import React, { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!process.env.BACKEND_URL) {
            alert("La URL del backend no está configurada.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso. Redirigiendo al inicio de sesión...");
                window.location.href = "/login"; // Redirige al login tras el registro exitoso
            } else {
                alert(data.message || "Error al registrar. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al conectar con el servidor. Por favor, inténtelo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister}>
                <h2>Crear una cuenta</h2>
                <label htmlFor="name">Nombre completo</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirm-password">Confirmar contraseña</label>
                <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    );
};

export default Register;
