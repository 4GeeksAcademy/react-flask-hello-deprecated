import React, { useState } from "react";
import { ProductCard } from "./product-card";
import { Link } from "react-router-dom";

export const ProductSection = ({ name, products }) => {

    let catalogProduct = "";
    const validacionProduct = (producto) => {
        if (producto == "Laptops") {
            catalogProduct = "/laptops-catalog";
        } else if (producto == "Moviles") {
            catalogProduct = "/phones-catalog";
        } else if (producto == "TVs") {
            catalogProduct = "/tvs-catalog";
        };
    };

    validacionProduct(name);

    return (
        <>
            <div className="container my-5">
                <h1 className="ms-5 mb-2 text-white">{name}</h1>
                <div className="section container mx-3 pt-5 px-5 pb-1 border-techno border-4 mt-4 mx-auto">
                    <div className="row justify-content-around">
                        {products.map((product, index) => {
                            return (
                                <div className="col-md-3" key={index}>
                                    <ProductCard name={name} product={product}/>
                                </div>
                            )
                        })};
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-end">
                            <Link to={catalogProduct}>
                                <button className="product-section-button">Ver más productos</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}