import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductCardSmall = ({ product }) => {
    const navigate = useNavigate();
    let imagen;
    const color = product.colores?.[0].toLowerCase()?.replace(/ /g, "_")
    if (product.tipo === 'smartphone' || product.tipo === 'laptop') {
        imagen = product.imagen?.[color][0];
    } else if (product.tipo === 'tv') {
        imagen = product.imagen[0];
    };
    
    const sendToIndividualProduct = () => {
        let route;
        if (product.tipo == "laptop") {
            route = `/laptop-info/${product.laptop_id}`;
        } else if (product.tipo == "smartphone") {
            route = `/smartphone-info/${product.smartphone_id}`;
        } else if (product.tipo == "tv") {
            route = `/tv-info/${product.tv_id}`;
        };
        navigate(route);
    };

    const precio = parseInt(product.precio.replace('€', ""));
    const totalPrecioEur = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(precio);

    return (
        <div className="content-small-card mt-3 mb-5" onClick={sendToIndividualProduct} style={{backgroundColor: "rgb(255, 255, 255)" }}>
            <div className='container-img-small'>
                <img src={imagen} className="card-img-top" style={{ height: '150px' }} />
            </div>
            <div className="description-info">
                <div className='title-card-small'>
                    <h7 className="titulo">{product.modelo}</h7>
                </div>
                <p className='titulo'>{totalPrecioEur}</p>
                <span className='texto'>{product.tipo == "laptop" || product.tipo == "tv" ?  'Marca: ' + product.marca : product.procesador }</span>
            </div>
        </div>
    );
};