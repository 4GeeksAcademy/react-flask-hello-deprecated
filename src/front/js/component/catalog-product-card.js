import React from 'react';
import { Link } from 'react-router-dom';

export const CatalogProductCard = ({ product, productName }) => {
    const precio = parseInt(product.precio.replace('€', ""));
    const totalPrecioEur = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(precio);

    let tvOn = null;
    let images = "";

    const validacionLista = (producto) => {
        if (producto == "laptops" || producto == "phones") {
            const color = (product.colores[0].toLowerCase()).replace(/ /g, "_");
            images = product.imagen[color];
            tvOn = false;
        }
        else {
            images = product.imagen;
            tvOn = true;
        }
    };

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

    validacionLista(productName);
    validacionProduct(productName);

    return (
        <div className="container_card container_card_catalog">
            <div className="card_product">
                <div className='container_img'>
                    <Link to={IndividualProduct}>
                        <img src={images[0]} />
                    </Link>
                </div>
                <span>{product.modelo}</span>
                <ul className='card_description'>
                    {!tvOn ?
                        <>
                            <li><b>Almacenamiento:  </b>{product.almacenamiento}</li>
                            <li><b>Memoria Ram:  </b> {product.memoria_ram}</li>
                            <li><b>Camara:  </b> {product.camara}</li>
                        </>
                        :
                        <>
                            <li><b>Marca:  </b> {product.marca}</li>
                            <li><b>Pantalla:  </b> {product.pantalla}</li>
                            <li><b>Año Lanzamiento:  </b> {product.año_modelo}</li>
                        </>
                    }
                </ul>
                <h3>{totalPrecioEur}</h3>
                <Link to={IndividualProduct}>
                    <button className='btn_card_product'>comprar</button>
                </Link>
            </div>
        </div>
    )
}