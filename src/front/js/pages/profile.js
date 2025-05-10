import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import logo from "../store/logo-sin-fondo.jpg"
export const Profile = () => {

    return(
        <div className="center" style={{ width: "18rem" }}>
          
          <h4> Welcome back </h4>
          <p> here goes the avatar </p>
          <img src={ logo } alt="Logo sin fondo"/>
          
          <h1>Welcome back</h1>

          <button> Back </button>
  

        </div>
      )

}