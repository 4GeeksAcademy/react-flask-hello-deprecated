import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import logginBackground from "../../img/logginBack.png"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 1.5rem;
  height: 60vh;
  aspect-ratio: 1 / 1;
  background-image: linear-gradient(
    to right,
    rgba(31, 118, 146, 0.8),
    rgba(67, 56, 135, 0.8)
  );
  color: white;
  font-weight: bold;
  border-radius: 30px;
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, rgba(31, 118, 146, 0.5), rgba(67, 56, 135, 0.5));
  height: 100vh;
`;

const PasswordRecovery = () => {
  const { actions } = useContext(Context);
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (emailInput == "") {
      Swal.fire({
        title: "Correo no puede estar en blanco",
        text: "Campo requerido",
        icon: "error",
      });
      return;
    }
    try {
      const response = await actions.requestPasswordChange(emailInput);
      if (response) {
        Swal.fire({
          title:
            "Se ha enviado un enlace al correo para recuperación de contraseña",
          icon: "success",
          text: "Ingresa a tu correo para continuar con el proceso",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al solicitar la recuperación de contraseña",
        icon: "error",
        text: error.message || "Error al realizar la solicitud",
        timer: 1500,
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${logginBackground})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <Background >
        <Container>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="container-fluid">
              <div className="row mb-3">
                <h4 className="m-3 text-center">¿Olvidaste tu contraseña?</h4>
                <p className="text-light fs-6 fw-light text-center">
                  Ingresa tu correo de inicio de sesión para recuperar la
                  contraseña.
                </p>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill mb-3"
                    placeholder="micorreo@dominio.com"
                    value={emailInput}
                    onChange={e => setEmailInput(e.currentTarget.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <button className="btn btn-outline-register">Recuperar</button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </Background>
    </div>
  );
};

export default PasswordRecovery;
