import React, { useState } from "react";

const ResetPassword = () => {
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple del formulario
    if (!securityAnswer || !newPassword || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      setMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setMessage("");
      return;
    }

    try {
      // Llamada a la API
      const response = await fetch("https://sturdy-space-invention-q7947gjpqj76fx57r-3001.app.github.dev/user/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          security_question: securityAnswer,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.msg || "Contraseña cambiada correctamente.");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Ocurrió un error. Intenta nuevamente.");
        setMessage("");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 border border-light forgot-password bg-white p-4">
          <h2 style={{ color: "darkblue", textAlign: "center" }}>¿Olvidó su contraseña?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>¿CUÁL ES MI ANIMAL FAVORITO?</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu respuesta"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>NUEVA CONTRASEÑA</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresa tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>CONFIRMAR CONTRASEÑA</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                style={{
                  backgroundColor: "darkblue",
                  borderColor: "darkblue",
                  borderRadius: "20px",
                }}
              >
                Cambiar contraseña
              </button>
            </div>
          </form>

          {message && <p className="success-message text-success mt-3">{message}</p>}
          {error && <p className="error-message text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
