import React, { useContext } from 'react';
import { CatalogProductCard } from './catalog-product-card';
import { Context } from '../store/appContext';

export const CatalogCatalog = ({ productList }) => {

    const { store } = useContext(Context)
    let titulo = ""
    const products = store[productList]

    if (productList == "phones") {
        titulo = "de Móviles"
    } else if (productList == "tvs") {
        titulo = "de TVs";
    } else if (productList == "laptops") {
        titulo = "de Portátiles";
    };

    return (
        <>
            <div className="container ">
                <h1 className="d-flex justify-content-center text-white">Catálogo {titulo}</h1>
                <div className="catalog-section-catalog-phones">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {
                            products.map((product, index) => (
                                <div className="col d-flex justify-content-center">
                                    <div className="p-3">
                                        <CatalogProductCard
                                            key={index}
                                            product={product}
                                            productName={productList} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}