import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const RecuperacionContraseña = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/forgotpassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Correo enviado correctamente. Revisa tu bandeja de entrada.");
        navigate("/loginSignup");
      } else {
        alert(`Error: ${data.msg}`);
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100" 
      style={{
        background: "linear-gradient(to bottom, #F2E5BF, #ffffff)",
        backgroundSize: "cover",
        padding: "2rem"
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "35rem",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          border: "none",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="card-body text-center">
          <h2 className="card-title mb-4" style={{ color: "#333", fontWeight: "bold" }}>Recuperar Contraseña</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
            Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className="form-control p-3"
                style={{
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                  transition: "border-color 0.3s ease-in-out",
                }}
                placeholder="Introduce tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              style={{
                backgroundColor: "#007bff",
                color: "#ffffff",
                fontSize: "1.1rem",
                borderRadius: "10px",
                transition: "0.3s ease-in-out",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
            >
              Enviar Correo
            </button>
          </form>
          <Link to="/" className="d-block mt-3 text-secondary" style={{ fontSize: "1rem", textDecoration: "none" }}>
            <i className="bi bi-arrow-left"></i> Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};
