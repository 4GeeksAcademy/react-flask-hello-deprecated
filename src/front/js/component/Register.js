import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario con nombre y apellido
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      console.log("Usuario registrado:", user);

      // Redirigir al Login después del registro
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrarse. Intente nuevamente.");
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundColor: "#FFFDC4",
        padding: "50px",
        textAlign: "center",
      }}
    >
      <h2>🌦️ Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        {/* Campo: Nombre */}
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />

        {/* Campo: Apellido */}
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />

        {/* Campo: Correo Electrónico */}
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />

        {/* Campo: Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />

        {/* Botón: Registrarse */}
        <button
          type="submit"
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
