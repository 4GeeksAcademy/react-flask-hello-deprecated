import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AccessDenied.css";
import image from "../../img/denied.png"


export function AccessDenied() {
  return (
    <div className="denied-container">
      <img className="denied-image" src={image} width={300} alt="denied"/>

      <h1 className="denied-title"> We are sorry...</h1>
      <p>
        You don't have permissions to access this page. <br />Please check out your credentials and try again.
      </p>
      <Link to="/" className="btn custom-btn">
        Go to home
      </Link>
    </div>

  );
};