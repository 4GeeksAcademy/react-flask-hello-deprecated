import React, { useState } from "react";
import "../../styles/login.css";
import microphone from "../../img/microphone.jpg";

export const Login = () => {
  // Estados para controlar qué formulario se muestra
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${microphone})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        className="login-container p-4 shadow-lg rounded-3 w-100"
        style={{ maxWidth: "400px", background: "rgba(255, 255, 255, 0.8)" }}
      >
        {/* Pantalla inicial con los botones */}
        {!showLogin && !showRegister && (
          <div>
            <h2 className="text-center mb-4">Bienvenido</h2>
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Iniciar sesión
            </button>
            
            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Formulario de inicio de sesión */}
        {showLogin && (
          <form>
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100 py-2">
              Ingresar
            </button>
            <div className="text-center mt-2">
              <a href="#" className="text-decoration-none">He olvidado mi contraseña</a>
            </div>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => setShowLogin(false)}
            >
              Volver
            </button>
          </form>
        )}

        {/* Formulario de registro */}
        {showRegister && (
          <form>
            <h2 className="text-center mb-4">Registro</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre y apellidos"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Dirección"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirmar contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Subir foto de perfil</label>
              <input type="file" className="form-control form-control-lg" />
            </div>
            <button type="submit" className="btn btn-success w-100 py-2">
              Registrarse
            </button>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => setShowRegister(false)}
            >
              Volver
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
