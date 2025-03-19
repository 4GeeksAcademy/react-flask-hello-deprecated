import React, { useContext, useState, } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

export const Formulario = ({ type }) => {
    console.log("Formulario type:", type);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        player: true,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            player: e.target.value === "player",  // Si el valor es "player", se establece en true, de lo contrario, false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (!formData.email || !formData.password) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", formData, "type:", type);
        
        if (type === "login") {
            const aux = await actions.login(formData)
            return navigate(aux)
        } else {
            const aux1 = await actions.register(formData);
            return navigate(aux1)
        }

    };

    return (
        <form  onSubmit={handleSubmit}>
            <div className="m-3" >
                <label htmlFor="email" className="form-label m-1">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="m-3">
                <label htmlFor="password" className="form-label m-1">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {type !== 'login' && (
                <>
                <div className="m-3">
                    <label  id="role" htmlFor="role" className="form-label m-1">Role</label>
                    <select name="role"  className="form-select" value={formData.player ? "player" : "host"} onChange={handleRoleChange}>
                        <option value="player">Player</option>
                        <option value="host">Host</option>
                </select>
                </div>
                   
                </>
            )}
            <div className="text-center pt-3">
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={type == 'login' ? 'Iniciar sesión' : 'Registrarse'}
                />
            </div>
        </form>
    );
};
