import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Asegúrate de importar ProductCard
import { fetchProducts } from "../api/productService"; // Función para obtener productos de la API

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener productos
        const getProducts = async () => {
            try {
                const response = await fetchProducts();  // Asegúrate de que esta función obtenga los productos desde tu API
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);  // Asumimos que el backend retorna una propiedad 'products'
                } else {
                    console.error("Error al obtener productos");
                }
            } catch (error) {
                console.error("Hubo un problema con la solicitud de productos:", error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(product) => console.log("Producto agregado al carrito:", product)}
                    />
                ))
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    );
};

export default ProductList;
