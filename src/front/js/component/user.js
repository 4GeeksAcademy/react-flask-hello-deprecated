import React from 'react'

const User = () => {
    return (
        <div className="container mt-4 ">
            <div className="row md-5 bg-success rounded-1 align-items-start ">
                <div className=" row row-col-6 ms-2 justify-content-around mt-4">
                    <div className="col row">
                        <h4 className=" col-3 adlam-display-regular user-title">Mi perfil </h4>
                        <h6 className="col-1 fa-solid fa-pencil mt-2"></h6>
                    </div>
                    <h4 className=" col user-title adlam-display-regular ">Mis publicaciones</h4>
                </div>

                <div className="col-md-4 card shadow-sm p-4 m-4 rounded-5 "  >
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" id="nombre" className="form-control" placeholder="Nombre de usuario" disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" placeholder="TAYLORSWIFT13@GMAIL.COM" readOnly />
                        </div>
                        <div className="mb-3">
                            <a className="text-primary nunito">Cambiar contraseña</a>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="current-password" className="form-label">Contraseña actual</label>
                            <input type="password" id="current-password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-password" className="form-label">Nueva contraseña</label>
                            <input type="password" id="new-password" className="form-control" />
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="  btn btn-primary rounded-pill btnStart">Guardar</button>
                        </div>
                    </form>
                </div>
                <div className="col ">
                    <div className="card shadow-sm p-4 m-4 rounded-5">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Mascota encontrada: OS...
                                <span>
                                    <i className="fa-solid fa-pencil me-2"></i>
                                    <i className="fa-regular fa-trash-can"></i>
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Mascota perdida: Canela
                                <span>
                                    <i className="fa-solid fa-pencil me-2"></i>
                                    <i className="fa-regular fa-eye-slash"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User