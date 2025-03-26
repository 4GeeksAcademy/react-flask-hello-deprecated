import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, name }) => {

    let images = "";
    const validacionLista = (producto) => {
        if (producto == "Laptops" || producto == "Moviles") {
            const color = (product.colores[0].toLowerCase()).replace(/ /g, "_");
            images = product.imagen[color];
        }
        else {
            images = product.imagen
        };
    };

    let IndividualProduct = "";
    const validacionProduct = (producto) => {
        if (producto == "Laptops") {
            IndividualProduct = `/laptop-info/${product.laptop_id}`
        } else if (producto == "Moviles") {
            IndividualProduct = `/smartphone-info/${product.smartphone_id}`
        } else if (producto == "TVs") {
            IndividualProduct = `/tv-info/${product.tv_id}`
        };
    };

    const precio = parseInt(product.precio.replace('€', ""));
    const totalPrecioEur = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(precio);

    validacionLista(name);
    validacionProduct(name);

    return (
        <div className="container_card">
            <div className="card_product">
                <div className='container_img'>
                    <Link to={IndividualProduct}>
                        <img src={images[0]} />
                    </Link>
                </div>
                <div className='card-title-home'>
                    <span>{product.modelo}</span>
                </div>
                <div className='card_description'>
                    <p>{product.descripcion}</p>
                </div>
                <h3>{totalPrecioEur}</h3>
                <Link to={IndividualProduct}>
                    <button className='btn_card_product'>comprar</button>
                </Link>
            </div>
        </div>
    )
}