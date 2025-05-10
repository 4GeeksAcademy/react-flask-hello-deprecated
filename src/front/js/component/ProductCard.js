import React from "react";
import PropTypes from "prop-types";
import "../../styles/productCard.css"; // Asegúrate de crear y vincular los estilos específicos para este componente

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name || "Producto"}
                loading="lazy"
            />
            <h3>{product.name || "Producto sin nombre"}</h3>
            <p>${(product.price || 0).toFixed(2)}</p>
            <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
                Añadir al carrito
            </button>
        </div>
    );
};

// Definición de tipos de datos para las props
ProductCard.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
    }),
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
