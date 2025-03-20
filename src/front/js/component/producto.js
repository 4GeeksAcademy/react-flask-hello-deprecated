import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Producto = ({ id, data }) => {
  const [precio, setPrecio] = useState(29.99);
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const handleFormatoChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const nuevoPrecio = selectedOption.dataset.precio;
    if (nuevoPrecio) {
      setPrecio(nuevoPrecio);
    } else {
      setPrecio(29.99);
    }
  };

  const productAdd = () => {
    // Verificar usuario registrado
    if (store.user) {
      // Añade el producto al carrito con todos los campos
      actions.addToCart({
        id: data.id,
        name: data.name,
        price: data.price,
        url: data.url,
        description: data.description,
      });
    } else {
      navigate("/loginSignup"); // Redirige al login si no está autenticado
    }
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-8" style={{ width: "100%" }}>
          <div className="card mb-3 d-flex flex-column">
            <div className="row g-0 flex-fill">
            <div className="col-md-4 d-flex align-items-center justify-content-center"
              // style={{ backgroundColor: "#f8f9fa" }} // Fondo opcional
            >
              {data.url && (
                <img
                  src={data.url}
                  alt={data.name}
                  className="img-fluid"
                  style={{
                    maxHeight: "300px",
                    objectFit: "cover",
                    width: "auto",
                    maxWidth: "100%",
                  }}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column flex-grow-1 text-start">
                  <h5 className="card-title text-black" 
                  // style={{
                  //       color: "#BF3131"}}
                        >
                    <strong>{data.name}</strong>
                  </h5>
                  <hr />
                  <p className="card-text text-start" style={{
                        color: "#7D0A0A"}}>
                    <strong><u>Descripción:</u></strong>
                    </p>
                    <p className="card-text text-start text-black">{data.description}.
                  </p>
                  <hr/>
                  <p className="card-text text-start" style={{
                        color: "#7D0A0A"}}>
                    <strong><u>Ingredientes:</u></strong>
                    </p>
                    <p className="card-text text-start text-black">{data.ingredients}.
                  </p>
                  <hr/>
                  <p className="card-text text-start" style={{
                        color: "#7D0A0A"}}>
                    <strong><u>Específico para:</u></strong> 
                    </p>
                    <p className="card-text text-start text-black">{data.pathologies}.
                  </p>
                 
                  <div className=" d-flex justify-content-around align-items-center">
                    <h2 className="card-text text-xl-start"
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      // color: "#9C2C77", // Cambia el color del precio
                      marginBottom: "10px", // Añade un margen inferior
                    }}>{data.price}€</h2>
                  </div>

                  <div className="mt-auto text-center">
                    <button
                     className="btn btn-warning m-2"  style={{
                        // background: "#BF3131", 
                        width:"300px",
                        color: "black",
                        border: "none", 
                        padding: "0.5rem 1rem", 
                        borderRadius: "5px",
                      }} onClick={productAdd}><strong>
                      Añadir al carrito</strong>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
