import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  background: linear-gradient(180deg, #0a3d62, #3c6382);
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
            "Se ha enviado un enlace al correo para recuperacion de contraseña",
          icon: "success",
          text: "Ingresa a tu correo para continuar con el proceso",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al solicitar recuperacion de contraseña",
        icon: "error",
        text: error.message || "Error al realizar l solicitud",
        timer: 1500,
      });
    }
  };

  return (
    <Background>
      <Container>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="container-fluid">
            <div className="row mb-3">
              <h4 className="m-3 text-center">¿Olvidaste tu contraseña?</h4>
              <p className="text-light fs-6 fw-light text-center">
                Ingresa tu correo de inicio de sesion para recuperar la
                contraseña
              </p>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-pill"
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
  );
};

export default PasswordRecovery;
