import React, { useState } from "react";
import "../../styles/login.css";
import microphone from "../../img/microphone.jpg";

export const Login = () => {
  // Estados para controlar qué formulario se muestra
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgoten, setShowForgoten] = useState(false);

  //Estado para almacenar datos del formulario de registro

  const[formulario, setFormulario] = useState({
    fullName:"",
    username:"",
    email:"",
    address:"",
    password:"",
    confirmPassword:"",
  });

  // Estados para manejar el login
  const [loginData, setLoginData] = useState({
    username:"",
    password:"",
  });

  // Manejar los cambios en los inputs del registro
  const handleChange = (e) => {
    setFormulario({...formulario, [e.target.name]: e.target.value});
  };

  // Manejar cambios en  los inpusts del login
  const handleLoginChange = (e) => {
    console.log("cambir campos: ", e.target.name, "Nuevo valor:", e.target.value);
    setLoginData({...loginData, [e.target.name]:e.target.value});
  };

  // Enviar formulario de registro
  const handleRegister = async (e) =>{
    e.preventDefault();
    
    if (formulario.password !== formulario.confirmPassword){
      alert("Las contraseñas no coinciden");
      return;
    }
    
    console.log("Datos del formulario de registro:", formulario); // Verifica que los datos sean correctos antes de enviarlos

    try{
      const response = await fetch("https://fluffy-chainsaw-v6qq999gg9xwfx99v-3001.app.github.dev/api/register",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(formulario),
      });

      const data = await response.json();

      if(response.ok){
        alert("Usuario registrado con exito");
        setShowRegister(false);
        setShowLogin(true);
      }else{
        alert(data.message || "Error al registrar usuario")
      }
    } catch(error){
      alert("Error en el servidor")
    }
  };

  // Enviar formulario de inicio de sesion
  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      const response = await fetch("https://fluffy-chainsaw-v6qq999gg9xwfx99v-3001.app.github.dev/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if(response.ok){
        alert("Inicio de sesion correcto");
        localStorage.setItem("Token", data.token); // Guarda el token en local
        localStorage.setItem("user", JSON.stringify(data.user)) // guarda los datos del usuario
        // aqui puedes redirir a otra pagina
      } else{
        alert(data.message || "Error al iniciar sesion")
      }
    }catch (error){
      alert("Error en el servidor")
    }
  }

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
              className="btn btn-danger boton w-100 mb-3"
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
        {showLogin && !showForgoten && (
          <form onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nombre de usuario"
              name = "username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              name = "password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 py-2">
            Ingresar
          </button>
          <div className="text-center mt-2">
            <a href="#" className="text-decoration-none" onClick={() =>
              setShowForgoten(true)
            }>¿He olvidado mi contraseña?</a>
            <button
              type="button"
              className="btn btn-link w-100 mt-2"
              onClick={() => {
                setShowForgoten(false);
                setShowLogin(false);
                setShowRegister(false)
              }}
            >
              Volver
            </button>
          </div>
        </form >
        )}

        {/* Formulario de registro */}
        {showRegister && (
          <form onSubmit={handleRegister}>
          <h2 className="text-center mb-4">Registro</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nombre y apellidos"
              name="fullName"
              value={formulario.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nombre de usuario"
              name="username"
              value={formulario.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Correo electrónico"
              name = "email"
              value={formulario.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Dirección"
              name = "address"
              value={formulario.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              name = "password"
              value={formulario.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirmar contraseña"
              name = "confirmPassword"
              value={formulario.confirmPassword}
              onChange={handleChange}
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
        {/* Formulario de recuperar contraseña*/}
        {showForgoten && (
          <form onSubmit={handleRegister}>
          <h2 className="text-center mb-4">¿He olvidado mi contraseña?</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nomber de usuario"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Nueva contraseña"
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-link w-100 mt-2"
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
              setShowForgoten(false)
            }}
          >
            Volver
          </button>
        </form>
      )}


      </div>
    </div >
  );
};
