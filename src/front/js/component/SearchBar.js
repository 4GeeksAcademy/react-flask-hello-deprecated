import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const SearchBar = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const handleSearch = () => {
        actions.searchProducts(search, categoryId);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {store.categories &&
                    store.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
            </select>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchBar;