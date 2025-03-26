import React, { useContext, useEffect, useState } from 'react';
import { ListProduct } from './cart-product-list-product';
import { Context } from '../store/appContext';

export const ProductList = ({ user_id }) => {
    const { store, actions } = useContext(Context)



    return (
        <>
            <div className="container-fluid my-5">
                <div>
                    <div className="container-fluid mb-5">
                        <div className="d-flex justify-content-between">
                        <div>
                        <h1>Carrito</h1>
                        <span><p>Lista de productos en tu carrito personal</p></span>
                        </div>
                        </div>
                        {store.cart.map((item) => {
                            return (
                                <>
                                    <div className="p-2">
                                        <ListProduct  name={item.modelo} description={item.descripcion} quantity={item.cantidad} image={item.imagen}  color={item.color}  user_id={user_id}  />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                   
                </div>
            </div>
        </>
    )
}