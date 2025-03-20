import React, { Component } from "react";
import { useContext,useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";




export const Card = ({name, id, description, price, url}) => {

const navigate = useNavigate();
const truncatedDescription =
description.length > 40 ? description.slice(0, 40) + "..." : description;
const truncatedName = name.length > 30 ? name.slice(0, 30) + "..." : name;

const { store, actions } = useContext(Context); 

const handleAddToCart = () => {
  

  if (store.user) { 
    actions.addToCart({ name, id, price, url }); 
  } else {
    navigate("/loginSignup"); // Redirige al login si no está autenticado
  }
};

return (

<div className="card m-2 d-flex flex-column"
style={{ 
  // background: "linear-gradient(to bottom,#FD841F,hsl(61, 80.60%, 71.80%)", 
  // background: "hsl(61, 80.60%, 71.80%)", 
  width: "15rem" }}>
<Link to={`/vista-producto/${id}`} className="text-decoration-none">
  <img 
    src={url}
    style={{ 
      width: "130px", height: "150px" }} 
    className="card-img-top mx-auto d-block mt-2" 
    alt="..." 
  />
  <div className="card-body text-center d-flex flex-column">
    <h5 className="card-title text-black">{truncatedName}</h5>
  
  <div>
    <p className="card-text" style={{
              color:"grey",
              height: "60px", 
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {truncatedDescription}</p>
    </div>
  </div>
  </Link>
 
        
      <div className="mt-auto text-center">
      <h6 className="card-price mt-auto"
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        // color: "#9C2C77", // Cambia el color del precio
        marginBottom: "10px", // Añade un margen inferior
      }}
      
      >{price}€</h6>
      <button
          onClick={handleAddToCart}
          className="btn btn-warning mb-3 "
          style={{
            // background: "#EB5A3C",
            color: "black", // Color del texto
            width: "auto", // Ancho automático (ajusta al contenido)
            padding: "0.375rem 1rem", // Ajusta el padding para hacerlo más estrecho
            fontSize: "0.875rem", // Tamaño de la fuente
          }}>
          Añadir al carrito
        </button>
        



  </div>
</div>

);
}