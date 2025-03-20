import React from 'react';

export const ProductCardSmall = ({ product }) => {

    let imagen;
    const color = product.colores?.[0].toLowerCase()?.replace(/ /g, "_")
    if(product.tipo === 'smartphone' || product.tipo === 'laptop'){
        imagen = product.imagen?.[color][0]
    }else if(product.tipo === 'tv'){
        imagen = product.imagen[0]
    }

    let IndividualProduct = "";
    const validacionProduct = (producto) => {
        if (producto == "laptops") {
            IndividualProduct = `/laptop-info/${product.laptop_id}`
        };
        if (producto == "phones") {
            IndividualProduct = `/smartphone-info/${product.smartphone_id}`
        };
        if (producto == "tvs") {
            IndividualProduct = `/tv-info/${product.tv_id}`
        };
    };

    validacionLista(productType);
    validacionProduct(productType);


    return (
        <div className="container content-small-card">
            <div className="col-md-12">
                <div className="card border-0 w-100 mb-4 text-black rounded-4 mx-auto d-flex flex-column" style={{ height: '400px', backgroundColor: "rgb(255, 255, 255)" }}>
                    <img src={imagen} className="card-img-top" style={{}} />
                    <div className="card-body border-card border-5 product d-flex flex-column justify-content-between">
                        <h5 className="card-title mb-0"><a href="#">{product.modelo}</a></h5>
                        <p className="fs-4 my-0 py-0"><b>{product.precio}</b></p>
                        <p className="card-text" style={{ fontSize: "0.8em" }}>{product.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};