import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [security_question, setSecurity_question] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            actions.setMessage("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    //is_active,
                    security_question
                }),
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/login"); //va al login
            } else {
                actions.setMessage(data.msg);
            }
        } catch (err) {
            actions.setMessage("Error de conexión");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="mb-4">Regístrate</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nombre Apellido"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="name">NOMBRE</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="floatingInput">EMAIL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="floatingPassword">CONTRASEÑA</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword2"
                                placeholder="Repetir contraseña"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <label htmlFor="floatingPassword2">REPETIR CONTRASEÑA</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput2"
                                placeholder="EJ: '¿CUÁL ES MI ANIMAL FAVORITO?'"
                                value={security_question}
                                onChange={(e) => setSecurity_question(e.target.value)}
                            />
                            <label htmlFor="floatingInput2">ESTABLEZCA UNA PREGUNTA DE SEGURIDAD</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput3"
                                placeholder="RESPUESTA"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                            <label htmlFor="floatingInput3">RESPUESTA:</label>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                            Registrarme
                        </button>
                    </form>

                    {/* Mostrar mensaje si existe */}
                    {store.message && (
                        <div className="alert alert-danger mt-3">
                            {store.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
