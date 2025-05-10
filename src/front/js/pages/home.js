import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProductCard from "../component/ProductCard";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.getFeaturedProducts();
            } catch (err) {
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderProducts = () => {
        if (loading) return <p className="loading-text">Cargando productos...</p>;
        if (error) return <p className="error-text">{error}</p>;

        return (
            <div className="product-grid">
                {store.featuredProducts.map((product) => (
                    <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(product) => actions.addToCart(product)} // Verifica que se pase correctamente
                />                
                ))}
            </div>
        );
    };

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1 className="hero-title">¡Bienvenidos a Chikitin Express!</h1>
                <p className="hero-subtitle">
                    Todo lo que necesitas para tus pequeños, entregado directamente a tu puerta.
                </p>
            </header>

            <section className="featured-products">
                <h2>Productos Destacados</h2>
                {renderProducts()}
            </section>

            <section className="benefits">
                <h2>¿Por qué elegirnos?</h2>
                <ul>
                    <li>Suscripciones personalizadas para tus necesidades.</li>
                    <li>Entrega rápida y confiable.</li>
                    <li>Puntos de recompensa por cada compra.</li>
                </ul>
            </section>
        </div>
    );
};
