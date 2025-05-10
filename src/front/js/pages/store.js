import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Filters from "../component/Filters";
import ProductCard from "../component/ProductCard";
import "../../styles/store.css";

export const Store = () => {
    const { store, actions } = useContext(Context);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.getAllProducts();
            } catch (err) {
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (Array.isArray(store.allProducts)) {
            setFilteredProducts(store.allProducts);
        }
    }, [store.allProducts]);

    const applyFilters = (filters) => {
        const { category, priceRange } = filters;
        const products = Array.isArray(store.allProducts) ? store.allProducts : [];
        const filtered = products.filter((product) => {
            const matchesCategory = category ? product.category === category : true;
            const matchesPrice =
                (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                (!priceRange.max || product.price <= parseFloat(priceRange.max));
            return matchesCategory && matchesPrice;
        });
        setFilteredProducts(filtered);
    };

    return (
        <div className="store-container">
            <h1 className="store-title">Nuestra Tienda</h1>
            <Filters onApplyFilters={applyFilters} />
            <section className="product-list">
                {loading ? (
                    <p className="loading-text">Cargando productos...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={(product) => actions.addToCart(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-products-text">No se encontraron productos.</p>
                )}
            </section>
        </div>
    );
};
