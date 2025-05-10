import React, { Component } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory} from "react-router-dom";
import { LoginSignup } from "../pages/loginSignup";


export const Card = ({name, id, description, price}) => {

const { store, actions } = useContext(Context); 
// const history = useHistory();

// const isRegistered = false; // Cambia esto según tu lógica de autenticación

// const handleButtonClick = () => {
//   isRegistered ? history.push('/carrito') : history.push('/login');
// };

return (
<div className="card m-2" style={{ width: "18rem" }}>
  {/* <img 
    src="https://static.zoomalia.com/prod_img/46527/la_53533e8075e9970de0cfea955afd4644bb21537446021.jpg" 
    style={{ width: "150px", height: "200px" }} 
    className="card-img-top mx-auto d-block mt-2" 
    alt="..." 
    
  /> */}

  <Link to={`/vista-producto/${id}`}>
                <div className="card-body text-center">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <h5 className="card-price">{price}€</h5>
                </div>
     </Link>
  <div className="mt-auto text-center">
    
    {/*FALTA LINK PARA ENVIAR AL ICONO CARRITO DEL NAVBAR */}
     <Link className="btn btn-primary m-2" to={`/loginSignup`}>Añadir carrito.</Link>
     {/* <Link className="btn btn-primary m-2" to={isRegistered ? '/cestaCompra' : '/loginSignup'}>
      Añadir carrito.
    </Link> */}
  </div>
</div>
);
}