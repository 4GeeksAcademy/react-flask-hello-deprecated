import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importamos useNavigate

export const RecuperacionContraseña = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // ✅ Inicializamos el hook de navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/forgotpassword`, { // ✅ Asegúrate de que esta ruta es correcta
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert("Correo enviado correctamente. Revisa tu bandeja de entrada."); // ✅ Alert con el mensaje
                navigate("/loginSignup"); // ✅ Redirigir al inicio de sesión después de aceptar el alert
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            alert("Error de conexión con el servidor.");
        }
    };

    return (
        <div>
            <h2>Recuperar contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Introduce tu correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
