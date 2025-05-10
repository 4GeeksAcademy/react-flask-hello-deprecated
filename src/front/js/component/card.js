import React, { Component } from "react";
import { useContext,useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";




export const Card = ({name, id, description, price, url}) => {

const navigate = useNavigate();

const { store, actions } = useContext(Context); 

const handleAddToCart = () => {
  
  // Verifica si el usuario está registrado
  if (store.user) { // Asumiendo que `store.user` contiene información del usuario si está autenticado
    actions.addToCart({ name, id, price, url }); // Añade el producto al carrito
  } else {
    navigate("/loginSignup"); // Redirige al login si no está autenticado
  }
};

return (

<div className="card m-2" style={{ width: "18rem" }}>
<Link to={`/vista-producto/${id}`} className="text-decoration-none">
  <img 
    src={url}
    style={{ width: "100px", height: "150px" }} 
    className="card-img-top mx-auto d-block mt-2" 
    alt="..." 
  />
  <div className="card-body text-center">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <h6 className="card-price">{price}€</h6>
  </div>
  </Link>
 
        
      <div className="mt-auto text-center">
        <button onClick={handleAddToCart} className="btn btn-primary m-2">
          Añadir al carrito
        </button>
        



  </div>
</div>

);
}