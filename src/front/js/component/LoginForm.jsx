import React from "react";
import "../../styles/LoginForm.css";

export function LoginForm() {
    return (
        <div className=
            "d-flex justify-content-center align-items-center mt-5 bg-white p-3">
            <div className=
                "d-flex flex-md-row bg-white rounded shadow-lg overflow-hidden"
                style={{ width: '100%', maxWidth: '1200px', height: '70vh' }}>
                {/* Sección izquierda: Welcome Back */}
                <div className=
                    " bg-lightviolet bg-gradient text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom1-container"
                    style={{ width: '100%', height: '100%' }}>
                    <h1 id="text1" className="display-4 mb-4">Welcome Back!</h1>
                    <p className="lead mb-5">
                        To keep connected, please login with your account.
                    </p>
                    {/* Botón de iniciar sesión */}
                    <button
                        className=
                        "btn btn-outline-light text-white rounded-pill px-5 py-2 shadow-sm"
                        style={{ borderColor: 'white', backgroundColor: 'transparent' }}>
                        SIGN IN
                    </button>
                </div>

                {/* Sección derecha: Create Account */}
                <div className=
                    "bg-violet text-center text-white d-flex flex-column align-items-center justify-content-center col-lg-6 col-md-6 col-sm-12 p-5 position-relative z-index-2 custom2-container"
                    style={{ width: '60%', height: '100%' }}>
                    <h1 className="display-5 text-violet2 mb-4">Create Account</h1>
                    <p className="text-muted mb-5">or use your email for registration</p>
                    {/* Formulario de registro */}
                    <form className="w-100" style={{ maxWidth: '400px' }}>
                        <div className="mb-3">
                            <label
                                htmlFor="name" className="form-label visually-hidden">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Name"
                                style={{ backgroundColor: '#f7f7f7' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="email" className="form-label visually-hidden">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email"
                                style={{ backgroundColor: '#f7f7f7' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password" className="form-label visually-hidden">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                style={{ backgroundColor: '#f7f7f7' }}
                            />
                        </div>
                        <button
                            type="submit" id="btnSingup" className="btn btn-violet bg-gradient w-100 py-2 rounded-pill">
                            SIGN UP
                        </button>
                    </form>
                    {/* Íconos Sociales */}
                    <div className="d-flex justify-content-center mt-5">
                        <button id="botonRedes" className="btn btn-light rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}>
                            <i className="fab fa-twitter text-dark"></i>
                        </button>
                        <button className="btn btn-light rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}>
                            <i className="fab fa-facebook text-dark"></i>
                        </button>
                        <button className="btn btn-light rounded-circle"
                            style={{ width: '40px', height: '40px' }}>
                            <i className="fab fa-linkedin text-dark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
