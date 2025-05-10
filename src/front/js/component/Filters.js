import React, { useState } from "react";
import "../../styles/filters.css";

const Filters = ({ onApplyFilters, categories }) => {
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
        console.log("Filters Applied:", filters);
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
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
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
