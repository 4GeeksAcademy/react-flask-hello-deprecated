import React, { useState, useContext, } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const SignupForm = () => {
    const { actions } = useContext(Context);
    // definir nuevo estado para confirmar y debajo boton para volver al home. darle un nombre ale estado
    // const [itsOk, setItsOk] =useState(false)

    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser(formData);
    };

    const handleOnclic = (e) => {
        navigate("/");

    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-4">
                <form onSubmit={handleSubmit} className="signup-form p-4 border rounded shadow bg-white">
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="first_name" required value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input type="text" className="form-control" name="last_name" required value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" required value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3 mt-4">
                        <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
                        <hr />
                        <button type="button" className="btn btn-secondary w-100 mb-2" onClick={handleOnclic}>
                            Volver al inicio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );    

};

