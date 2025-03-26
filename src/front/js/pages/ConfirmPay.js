import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const MessagePayment = () => {
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.setNegativeColors();
      }, []);
    
      useEffect(() => {
        document.body.style.backgroundColor = "rgb(234, 248, 252)";
        return () => {
          document.body.style.backgroundColor = "";
        };
      }, []);

    return (
        <main className="container-message container">
            <h1 className="titulo">Gracias por tu compra!!!!</h1>
            <section className="container-img-payment">
                <img src="https://agenciapromarketing.com/wp-content/uploads/2020/03/BANNER-PAGO-EXITOSO-1.png" />
            </section>
            <section className="container-button-confirm">
                <Link to={"/"}>
                    <button className="sub-titulo">Página principal</button>
                </Link>
                <Link to={"/phones-catalog"}>
                    <button className="sub-titulo">Ver Móviles</button>
                </Link>
                <Link to={"/laptops-catalog"}>
                    <button className="sub-titulo">Ver Laptops</button>
                </Link>
                <Link to={"/tvs-catalog"}>
                    <button className="sub-titulo">Ver Televisores</button>
                </Link>
                <Link to={"/cart"}>
                    <button className="sub-titulo">Carrito de compras</button>
                </Link>
            </section>
        </main>
    )
}