import React, { useState, useEffect } from 'react';
import { ProductSection } from './product-section';


const urlBackend = process.env.BACKEND_URL;

export const HomeCatalog = () => {
    const [phones, setPhones] = useState([]);
    const [tvs, setTvs] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [random, setRandom] = useState(null);

    useEffect(() => {
        const interval = setInterval(() =>
            setRandom(Math.floor(Math.random() * 15) + 1)
            , 10000);

        return () => clearInterval(interval);
    }, []);

    const idProduct = [
        Math.max(1, random),
        Math.max(2, random - 1),
        Math.max(3, random - 2),
    ];

    let uniqueArray = [...new Set(idProduct)]
    if (uniqueArray.length < 3) {
        uniqueArray.push(random + 2);
    };

    const fetchProducts = async (product, idProduct, setProduct) => {
        try {
            const productPromises = idProduct.map(async (id) => {
                const response = await fetch(`${urlBackend}${product}/${id}`);
                return response.json(); // Devuelve el JSON de la respuesta
            });
            const data = await Promise.all(productPromises); // Espera todas las promesas
            setProduct(data); // Actualiza el estado con un array de datos            
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        };
    };

    useEffect(() => {
        fetchProducts('phone', uniqueArray, setPhones);
        fetchProducts('tv', uniqueArray, setTvs);
        fetchProducts('laptop', uniqueArray, setLaptops);
    }, [random]);

    return (
        <>
            <div className="container-card-home">
                <ProductSection name="Moviles" products={phones} />
                <ProductSection name="TVs" products={tvs} />
                <ProductSection name="Laptops" products={laptops} />
            </div>
        </>
    );
};