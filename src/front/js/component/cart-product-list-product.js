import React, { useContext, useEffect, useState } from "react";
import { deleteProduct } from "../apiservices/callToApi";
import { updateQuantityCartProduct } from "../apiservices/callToApi";
import { Context } from "../store/appContext";

export const ListProduct = ({ name, description, quantity, image, color, user_id }) => {

    const [cantidad, setCantidad] = useState(quantity)
    const { actions } = useContext(Context)
    const aumentarCantidad = () => {
        setCantidad(prevCantidad => prevCantidad + 1);

    };

    const decrementarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prevCantidad => prevCantidad - 1);
        };
    };

    const updateProducts = async () => {
        await updateQuantityCartProduct(user_id, name, color, cantidad)
        actions.getCart(user_id)
    }


    useEffect(() => {
        updateProducts()
    }, [cantidad])


    return (
        <>
            <div className="container">
                <div className="row card-cart-product p-3 rounded border border-1 border-light">
                    <div className="col-md-2 col-sm-1 px-0">
                        <div>
                            <div className="ratio ratio-1x1">
                                <img src={image} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-10">
                        <div>
                            <span className="cart-product-list-title"><p className="mb-0">{name} {color != "no" && `(${color})`}</p></span>
                            <span><p className="description-cart-product">{description}</p></span>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                        <div className="d-flex justify-content-around">{cantidad > 1 ?
                            <button onClick={decrementarCantidad} className="btn primar-color text-white rounded-circle me-2"><i class="fa-solid fa-minus"></i></button> :
                            <button 
                                onClick={()=> console.log(name, color)}
                                className="btn btn-danger rounded-circle me-2" data-bs-toggle="modal" data-bs-target={`#exampleModal${name.replace(/ /g,"_")}${color.replace(/ /g,"_")}`} ><i class="fa-solid fa-trash"></i></button>
                        }
                            <p><b>{cantidad}</b></p>
                            <button className="btn primar-color text-white rounded-circle ms-2" onClick={aumentarCantidad} ><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id={`exampleModal${name.replace(/ /g,"_")}${color.replace(/ /g,"_")}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">¿Estás seguro de eliminar este producto de tu carrito?</h1>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger"
                                    onClick={async () => {
                                        await deleteProduct(user_id, name, color)
                                        actions.getCart(user_id)
                                    }} aria-label="Close" data-bs-dismiss="modal">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}