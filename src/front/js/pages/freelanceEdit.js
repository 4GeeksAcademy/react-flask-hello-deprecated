import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarLateral from "../component/NavbarLateral.jsx";

const FreelanceEdit = () => {
    const { store, actions } = useContext(Context);

  

    const user = store.userProfile || {};
    if (!user.name) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="d-flex">
            <div>

                <NavbarLateral />
            </div>

            {/* Botón de colapso para dispositivos pequeños */}
            <button
                className="btn btn-primary d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accordionSidebar"
                aria-expanded="false"
                aria-controls="accordionSidebar"
            >
                <i className="fas fa-bars"></i>
            </button>
            <div className=" flex-grow-1 p-4">

                {/* texto principal */}

                <h1 className="text-start m-5" style={{ marginLeft: "10px" }}>¡Bienvenido a Workland  <strong className="text-capitalize" > {user.name} {user.last_name}</strong>!</h1>

                <div className="user-card d-flex my-3 p-3 w-50 border-rounded">
                    <div className="rounded-circle" style={{ height: "150px", width: "150px", marginLeft: "10px", marginRight: "10px" }}>
                        <img
                            className="rounded-circle"
                            src={store.userProfile.img_url|| DEFAULT_IMAGE_URL} alt="imagen perfil" style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }} />
                    </div>

                    <div className="col-md-6 d-flex flex-column align-items-start">
                        <h5 className="name">{user.name}</h5>
                        <h5 className="last_name">{user.last_name}</h5>
                        <p className="adress"><i className="fa-solid fa-location-dot me-3"></i>{user.address}</p>
                        <p className="phone"><i className="fa-solid fa-phone me-3"></i>{user.phone}</p>
                        <p className="email"><i className="fa-solid fa-envelope me-3"></i>{user.email}</p>
                    </div>

                    <div className="col-md-3 d-flex justify-content-end align-items-start">
                        <Link to="/freeForm">
                            <button
                                type="button"
                                className="btn btn-link">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>

                        </Link>



                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="p-4">
                                    <h5 className="mb-3 d-flex align-items-center">
                                        
                                        Métodos de pago
                                    </h5>
                                    <p className="text-muted mb-2">Pra recibir los pagos de tus clientes de una manera directa, es necesario crear una cuenta Paypal para vincularla a nuestra plataforma</p>
                                    <a href="https://www.paypal.com/us/webapps/mpp/account-selection" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#00D1B2", color: "aliceblue" }}>¡Da click aquí!  <i className="fa-brands fa-paypal fa-2"></i></a>
                                    <h5 className="text-muted my-3">Te transferiremos a los servidores seguros de PayPal.</h5>
                                
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default FreelanceEdit;

