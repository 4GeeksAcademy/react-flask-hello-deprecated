import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser(form.email, form.password, form.nombre, form.apellidos, navigate);
    };

    return (
        <div className="card p-4">
            <h3>Registrarse</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input name="nombre" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Apellidos</label>
                    <input name="apellidos" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input name="email" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Registrarse</button>
            </form>
        </div>
    );
};

export default SignupForm;
