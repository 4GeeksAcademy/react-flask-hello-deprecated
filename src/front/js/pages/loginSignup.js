import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/home.css";

export const LoginSignup = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const dataUser = { name, email, password };
            if (isSignup) {
                await actions.signup(dataUser, navigate);
                setSuccessMessage('¡Registro exitoso! Redirigiendo a inicio de sesión...');
                setTimeout(() => {
                    setIsSignup(false);
                },);
            } else {
                await actions.login(email, password, navigate);
            }
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Error al procesar la solicitud. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-view-container" style={{ background: "linear-gradient(to bottom, #FCE5CD, #FFFFFF)" }}>
            <div className="form-container">
                {!isSignup && (
                    <form className="auth-form login-form" onSubmit={handleSubmit}>
                        <h2>Iniciar sesión</h2>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar sesión'}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        <p onClick={() => setIsSignup(true)}>¿No tienes cuenta? <strong>Regístrate</strong></p>
                        
                        {/* NUEVO: Enlace para recuperación de contraseña */}
                        <p>
                            ¿Olvidaste tu contraseña? <Link to="/RecuperacionContraseña">Recupérala aquí</Link>
                        </p>
                    </form>
                )}
                {isSignup && (
                    <form className="auth-form signup-form" onSubmit={handleSubmit}>
                        <h2>Regístrate</h2>
                        <input
                            type="name"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Registrar'}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <p onClick={() => setIsSignup(false)}>¿Ya tienes cuenta? <strong>Inicia sesión</strong></p>
                    </form>
                )}
                  <Link to="/">
                  <p>Volver a la página principal</p></Link>
            </div>
        </div>
    );
};
