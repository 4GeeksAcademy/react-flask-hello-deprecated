import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import logo from "../store/logo-sin-fondo.jpg"

export const Loginview = () => {
  // const { store, actions } = useContext(Context);

  return (


    <div className="container-fluid mx-auto d-flex marginlogintop justify-content-center">
      <div className="card border border-0 marginloginright" style={{ width: "18rem" }}>
      <img src={ logo } alt="Logo sin fondo"/>


      </div>

      <form>
        <div className="mb-3">
          <div className="d-flex justify-content-center mb-4 fs-1 textcolors">Welcome Back!</div>
          <div className="d-flex justify-content-center mb-4">Login below or&nbsp;<a href="forgot password"> create an account</a>
          </div>
          <label for="exampleInputEmail1" className="form-label ">Email address</label>
          <input type="email" className="form-control bordercolor border border-3" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control bordercolor border border-3" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="backbutton  w-100 border border rounded p-1 mb-1">Sign in</button>
        <Link to={"/resetpassword/"} className="d-flex justify-content-center mt-2">
          Have you forgotten your password?
        </Link>
      </form >
    </div >
  );
};
