import React  from "react";
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Registro = () => {
    useEffect(() => {

        document.body.style.backgroundColor = '#CCD6F6';
        return () => {
            
            document.body.style.backgroundColor = '';
          };
        }, []);

    const { id } = useParams();

    return (
        
            <div className=" d-flex flex-column align-items-center vh-100" >
                <h1 className="text-center mb-4">¡Bienvenido a Workland!</h1>
                <div className="w-50 p-4 border rounded shadow"id ="formRegistro" >

                    <form>
                        <h5 className="text-center mb-4">Ingresa los siguientes datos para crear tu cuenta</h5>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre </label>
                            <input type="text" className="form-control" id="inputName" placeholder="Nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputLastName" className="form-label">Apellido </label>
                            <input type="text" className="form-control" id="inputLastName" placeholder="Apellido" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                            <input type="number" className="form-control" id="inputPhone" placeholder="Ingresa tu teléfono" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="Ingresa tu dirección" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <label for="disabledSelect" className="form-label">Selecciona el modo de perfil</label>
                            <select id="disabledSelect" className="form-select">
                                <option selected>Selecciona una opción</option>
                                <option>Emprendedor</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                        <button type="submit" className="btn" id="registro">Registrar</button>
                        <Link to="/">
                            <button type="button" className="btn" id="cancelar" ms-2 >Cancelar</button>
                        </Link>
                    </form>

                </div>
            </div>
        
    );
};

export default Registro;