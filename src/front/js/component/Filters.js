import React, { useState } from "react";
import "../../styles/filters.css"; // Asegúrate de tener este archivo para estilos

const Filters = ({ onApplyFilters }) => {
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleApplyFilters = () => {
        const filters = {
            category: category || null,
            priceRange: {
                min: minPrice || null,
                max: maxPrice || null,
            },
        };
        onApplyFilters(filters);
    };

    return (
        <div className="filters-container">
            <h3>Filtros</h3>

            {/* Filtro por Categoría */}
            <div className="filter-group">
                <label htmlFor="category">Categoría:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="pañales">Pañales</option>
                    <option value="higiene">Higiene</option>
                    <option value="juguetes">Juguetes</option>
                </select>
            </div>

            {/* Filtro por Rango de Precio */}
            <div className="filter-group">
                <label htmlFor="minPrice">Precio Mínimo:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Mín."
                />
            </div>
            <div className="filter-group">
                <label htmlFor="maxPrice">Precio Máximo:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Máx."
                />
            </div>

            <button className="apply-filters-btn" onClick={handleApplyFilters}>
                Aplicar Filtros
            </button>
        </div>
    );
};

export default Filters;
