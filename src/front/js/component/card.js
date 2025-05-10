import React, { Component } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Card = ({name, id, description}) => {

const { store, actions } = useContext(Context); 

return (
<div className="card m-2" style={{ width: "18rem" }}>
  {/* <img 
    src="https://static.zoomalia.com/prod_img/46527/la_53533e8075e9970de0cfea955afd4644bb21537446021.jpg" 
    style={{ width: "150px", height: "200px" }} 
    className="card-img-top mx-auto d-block mt-2" 
    alt="..." 
  /> */}
  <div className="card-body text-center">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
  </div>
  <div className="mt-auto text-center">
     <button className="btn btn-primary m-2">Añadir carrito</button>
  </div>
</div>
);
}