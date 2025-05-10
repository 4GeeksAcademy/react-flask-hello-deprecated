import React from "react";
import PropTypes from "prop-types";
import "../../styles/productCard.css"; // Asegúrate de crear y vincular los estilos específicos para este componente

const ProductCard = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        console.log("Añadir al carrito:", product); // Verifica si se está llamando correctamente
        onAddToCart(product);
    };

    return (
        <div className="product-card">
            <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name || "Producto"}
                loading="lazy"
            />
            <h3>{product.name || "Producto sin nombre"}</h3>
            <p>${(product.price || 0).toFixed(2)}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>
                Añadir al carrito
            </button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
    }),
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
