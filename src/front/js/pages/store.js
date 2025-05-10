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

    const [activeFilters, setActiveFilters] = useState({
        category: null,
        priceRange: { min: null, max: null },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.fetchCategories(); // Carga las categorías desde el backend
                await actions.getAllProducts(); // Carga los productos desde el backend
            } catch (err) {
                setError("Error al cargar productos o categorías");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filtrar productos cada vez que cambian los productos o los filtros
        const filterProducts = () => {
            const { category, priceRange } = activeFilters;
            const products = Array.isArray(store.allProducts) ? store.allProducts : [];

            const filtered = products.filter((product) => {
                const matchesCategory = category
                    ? product.categories.some((cat) => cat.id === parseInt(category, 10))
                    : true;

                const matchesPrice =
                    (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                    (!priceRange.max || product.price <= parseFloat(priceRange.max));

                return matchesCategory && matchesPrice;
            });

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [store.allProducts, activeFilters]);

    const handleFilters = (filters) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            category: filters.category || null,
            priceRange: {
                min: filters.priceRange.min || null,
                max: filters.priceRange.max || null,
            },
        }));
    };

    return (
        <div className="store-container">
            <h1 className="store-title">Nuestra Tienda</h1>
            
            {/* Filtros */}
            <Filters onApplyFilters={handleFilters} categories={store.categories} />
            
            {/* Lista de productos */}
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
