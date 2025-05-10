import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.loginUser(email, password, navigate);
    };

    return (
        <div className="card p-4">
            <h3>Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginForm;


