import React, { Component, useState,  useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";





export const Producto = ({data,id}) => {

    const {store , actions} = useContext(Context);
    const [precio, setPrecio] = useState(29.99); // Precio inicial



    const handleFormatoChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const nuevoPrecio = selectedOption.dataset.precio;

        // Actualizar el precio si se seleccionó un formato
        if (nuevoPrecio) {
            setPrecio(nuevoPrecio);
        } else {
            setPrecio(29.99); // Precio por defecto
        }
    };
    return (

  
<div className="container mt-5 text-center">
    <div className="row">
        <div className="col-md-8" style={{ width: "90%", height: "400px" }}>
            <div className="card mb-3 d-flex flex-column" style={{ height: "100%" }}>
                <div className="row g-0 flex-fill">
                    <div className="col-md-4">
                        <img src={data.url} className="img-fluid rounded-start m-1" alt="Producto" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column flex-grow-1">
                            <h5 className="card-title"><strong>{data.name}</strong></h5>
                            <hr />
                            <div className="m-3 d-flex justify-content-around align-items-center">
                                <h2 className="card-text text-xl-start">{data.price}€</h2>
                                {/* <div>
                                    <label htmlFor="formatoProducto" className="form-label visually-hidden">Formato del Producto:</label>
                                    <select className="form-select form-select-sm" id="formatoProducto" onChange={handleFormatoChange}>
                                        <option value="">Seleccione un formato</option>
                                        <option value="1" data-precio="29.99">Formato 2Kg - 29.99€</option>
                                        <option value="2" data-precio="39.99">Formato 6Kg - 39.99€</option>
                                        <option value="3" data-precio="49.99">Formato 10Kg - 49.99€</option>
                                    </select>
                                </div> */}
                            </div>
                            <p className="card-text m-3 p-3">{data.description}.
                            </p>
                            <div className="mt-auto text-center">
                                <Link className="btn btn-primary m-2" to={`/loginSignup`}>Añadir carrito.</Link>
                                {/* <Link className="btn btn-primary m-2" to={isRegistered ? '/cestaCompra' : '/loginSignup'}>
                                Añadir carrito.
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



    );
}