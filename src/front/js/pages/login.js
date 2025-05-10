import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!process.env.BACKEND_URL) {
            alert("La URL del backend no está configurada.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Inicio de sesión exitoso. Redirigiendo...");
                window.location.href = "/";
            } else {
                alert(data.message || "Error al iniciar sesión. Verifique sus credenciales.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al conectar con el servidor. Por favor, inténtelo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
};

export default Login;
