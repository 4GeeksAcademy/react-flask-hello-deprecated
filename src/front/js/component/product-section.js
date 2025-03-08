import React from "react";
import { ProductCard } from "./product-card";

export const ProductSection = ({ productos, products}) => {
 
    return (
        <>
            <div className="container my-5">
                <h1 className="ms-5 mb-2 text-white">{productos}</h1>
                <div className="section container mx-3 pt-5 px-5 pb-1 border-techno border-4 mt-4 mx-auto">
                    <div className="row justify-content-around">
                            {products.map((product, index) =>{
                                return(
                                    <div className="col-md-3">    
                                        <ProductCard key={index} model={product.modelo} price={product.precio} description={product.descripcion}/>
                                    </div>    
                            )})}; 
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-end">
                           <button className="product-section-button">Ver más productos</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}