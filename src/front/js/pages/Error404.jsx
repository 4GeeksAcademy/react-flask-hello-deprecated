import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Error404.css";
import image from "../../img/error404.png"


export function Error404() {
  return (
    <div className="error-container">
      <img className="error-image" src={image} width={700} alt="error404"/>
    <p className="error-message"> Uh oh! That page doesn't exist</p>
      <p>
        Head to our <Link to="/" className="error-link">homepage</Link> that does exist,
        or ask for help with our messenger in the lower-right corner.
      </p>
    </div>
  );
};
