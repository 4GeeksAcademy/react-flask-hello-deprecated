import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Filters from "../component/Filters";
import ProductCard from "../component/ProductCard";
import SearchBar from "../component/SearchBar";
import "../../styles/store.css";

export const Store = () => {
    const { store, actions } = useContext(Context);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeFilters, setActiveFilters] = useState({
        search: "",
        category: null,
        priceRange: { min: null, max: null },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.fetchCategories(); // Carga las categorías desde el backend
                await actions.getAllProducts(); // Carga los productos desde el backend
                console.log(store.allProducts); // Verifica el formato de los datos
            } catch (err) {
                setError("Error al cargar productos o categorías");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [store.allProducts, activeFilters]);

    const filterProducts = () => {
        const { search, category, priceRange } = activeFilters;
        const products = Array.isArray(store.allProducts) ? store.allProducts : [];
    
        const filtered = products.filter((product) => {
            const matchesSearch = search
                ? product.name.toLowerCase().includes(search.toLowerCase())
                : true;
    
            const matchesCategory = category
                ? product.categories.some((cat) => cat.id === parseInt(category, 10))
                : true;
    
            const matchesPrice =
                (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                (!priceRange.max || product.price <= parseFloat(priceRange.max));
    
            console.log({
                product: product.name,
                matchesSearch,
                matchesCategory,
                matchesPrice,
            });
    
            return matchesSearch && matchesCategory && matchesPrice;
        });
    
        console.log("Filtered Products:", filtered);
        setFilteredProducts(filtered);
    };    

    const handleSearch = (searchTerm) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            search: searchTerm,
        }));
    };

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
            <SearchBar onSearch={handleSearch} />
            <Filters onApplyFilters={handleFilters} categories={store.categories} />
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
