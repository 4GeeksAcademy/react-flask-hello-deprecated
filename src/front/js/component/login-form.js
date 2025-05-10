import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [invalidAccount, setInvalidAccount] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context)
    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/registro")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await actions.login(email, password)
        if (!store.auth) {
            setInvalidAccount(true)
        } else {
            setInvalidAccount(false)
        }
    }
    
    useEffect(() => {
        if (store.auth) {
            navigate("/cuentas");
        } else {
            navigate("/");
        }
        if (invalidAccount) {
            setInvalidAccount(false)
        }
    }, [store.auth])

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto w-50">
                <div className="input-container">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="input-container">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                    {!invalidAccount ? <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                        : <div id="emailHelp" className="form-text invalidAccount">Correo o Contraseña incorrectos</div>}
                </div>
                <div className="buttons">
                    <button type="submit" className="btn btn-primary login-user">INICIAR SESION</button>
                    <hr className="hr-login" />
                </div>
            </form>
            <div className="buttons">
                <p>¿Aun no estás registrado?</p>
                <button className="btn btn-secondary create-user" onClick={handleClick}>Crear usuario</button>
            </div>
        </>
    );
};