import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";
import "../../styles/formulario.css";

export const Login = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid w-100 h-100">
      <div className="row position-relative w-100 h-100">
        {/* Columna para el formulario */}
        <div className="col-md-6 d-flex justify-content-center align-items-center position-relative order-md-1 order-2">
          {/* Fondo de la imagen en pantallas pequeñas */}
          <div
            className="d-md-none w-100 h-100 position-absolute"
            style={{
              backgroundImage: `url(${process.env.BACKEND_URL + "/foto-login.jpg"})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1, // Coloca la imagen detrás del formulario
              top: 0,
              left: 0,
            }}
          ></div>

          {/* Formulario */}
          <div className="bg-light w-75 pt-4 pb-4 m-5 formulario__login--bg position-relative shadow-lg rounded-4">
            <h2 className="text-center fw-bold mb-4 text-primary">Bienvenido</h2>

            {/* Formulario */}
            <Formulario type="login" />

            <div className="text-center mt-4">
              <p className="fw-bold mb-2">¿Aún no tienes tu cuenta?</p>
              <Link to="/signup">
                <button className="btn btn-outline-primary text-uppercase p-2 w-50 shadow-sm">
                  Crea la tuya aquí
                </button>
              </Link>
            </div>
          </div>
        </div>


        {/* Columna con la imagen en pantallas grandes */}
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative order-md-2 order-1">
          <img
            src={process.env.BACKEND_URL + "/foto-login.jpg"}
            alt="Imagen de Registro"
            className="img-fluid w-100 h-100 object-fit-contain object-position-center"
          />
        </div>
      </div>
    </div>

  );
};

