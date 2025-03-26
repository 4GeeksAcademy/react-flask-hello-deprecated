import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { ProductList } from '../component/cart-product-list';
import { OrderResume } from '../component/cart-order-resume';
import { EmptyCart } from '../component/empty-cart';

export const Cart = () => {
    const { store, actions } = useContext(Context);
    const [userId, setUserId] = useState(sessionStorage.getItem("idUser"));

    useEffect(() => {
        actions.setNegativeColors();
        actions.setNavbarVisibility();
        actions.getCart(userId);
    }, []);

    return (
        <>
            <div className="container-fluid negative-background cart" style={{ backgroundColor: "rgb(234, 248, 252)" }}>
                <div className="row justify-content-around mx-3">
                {store.cart.length > 0 ?
                    <>
                    <div className="col-lg-7 col-sm-12">
                        <ProductList user_id={userId} />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <OrderResume />
                    </div>
                    </>
                    :
                    <>
                    <div className="d-flex flex-column align-items-center" >
                        <EmptyCart />
                    </div>
                    </>
                    
                }
                    
                    
                </div>
            </div>
        </>
    )
}