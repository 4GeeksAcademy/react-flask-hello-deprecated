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
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8" style={{ width: "90%" }}>
          <div className="card mb-3 d-flex flex-column">
            <div className="row g-0 flex-fill">
              <div className="col-md-4">
                {data.url && (
                  <img
                    src={data.url}
                    alt={data.name}
                    className="img-fluid"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">
                    <strong>{data.name}</strong>
                  </h5>
                  <hr />
                  <p className="card-text m-3 p-3">
                    <strong>Descripción:</strong> {data.description}.
                  </p>
                  <p className="card-text m-3 p-3">
                    <strong>Ingredientes:</strong> {data.ingredients}.
                  </p>
                  <p className="card-text m-3 p-3">
                    <strong>Específico para:</strong> {data.pathologies}.
                  </p>
                  <div className="m-3 d-flex justify-content-around align-items-center">
                    <h2 className="card-text text-xl-start">{data.price}€</h2>
                  </div>

                  <div className="mt-auto text-center">
                    <Link to="/carrito" className="btn btn-primary m-2" onClick={productAdd}>
                      Añadir al carrito
                    </Link>
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