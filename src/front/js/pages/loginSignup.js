import React, { useState, useContext} from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const dataUser = { name, email, password };
            if (isSignup) {
                await actions.signup(dataUser, navigate);
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
        <div className="registration-view-container">
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
                        <p onClick={() => setIsSignup(true)}>¿No tienes cuenta? Regístrate</p>
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
                        <p onClick={() => setIsSignup(false)}>¿Ya tienes cuenta? Inicia sesión</p>
                    </form>
                )}
            </div>
        </div>
    );
};