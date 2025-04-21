import React, { useState, useContext } from "react";
import logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      toast.warn("El correo no tiene un formato válido");
      return;
    }

    setLoading(true);
    const success = await actions.login(email, password);
    setLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      toast.error("Correo o contraseña incorrectos 😓");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mt-3">
          <img
            src={logo}
            alt="Logo de AhorrApp"
            className="img-fluid"
            style={{ maxHeight: "220px", objectFit: "contain" }}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="email@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label className="form-label" htmlFor="form3Example3">
                Email
              </label>
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Tu contrasena"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <label className="form-label" htmlFor="form3Example4">
                Contrasena
              </label>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-login w-100"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Login"}
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-center">
                ¿No tenés una cuenta?{" "}
                <Link to={"/signup"} className="link-danger">
                  Registrarse
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
