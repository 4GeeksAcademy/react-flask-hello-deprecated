import React from 'react';

export const NovedadesMail = () => {
    return (
        <>
            <div className="container w-50">
                <div className="card mail-news ">
                    <div className="card-header text-center fs-4">
                        Recibe novedades en tu correo
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p className="fs-5 text-center">Ingresa tu dirección de contacto para estar al dia de nuestras promociones</p>
                            <footer className="d-flex justify-content-center">
                                <input type="text" className="form-control me-2 w-50" placeholder="email@email.com" aria-label="email@email.com" aria-describedby="button-addon2" />
                                <button className="btn mail-button btn-outline-secondary btn-dark" type="button" id="button-addon2">Enviar</button>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    )
}