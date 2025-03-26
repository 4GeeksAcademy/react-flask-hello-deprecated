import React, { useContext } from "react";
import { ProductCardSmall } from "./productCardSmall";
import { Context } from "../store/appContext";

export const RelatedProducts = ({ productType }) => {
    
    const { store } = useContext(Context);

    const products = store[productType];

    const relatedCarruselProducts = [];
    for (let i = 0; i < products.length; i += 5) {
        relatedCarruselProducts.push(products.slice(i, i + 5));
    };

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="section container">
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {relatedCarruselProducts.map((products, index) => (
                                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                    <div className="d-flex justify-content-center">
                                        {products.map((product, index) => (
                                            <div className="col-md-2 p-2" key={index}>
                                                <ProductCardSmall product={product} productType={productType}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark rounded-circle me-4" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark rounded-circle ms-4" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
