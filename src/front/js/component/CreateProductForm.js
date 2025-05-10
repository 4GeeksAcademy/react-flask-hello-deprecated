import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const CreateProductForm = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categories: [], // Mantén el formato compatible con el backend
    });

    useEffect(() => {
    const initialize = async () => {
        try {
            const isAdmin = await actions.checkAdmin();
            if (!isAdmin) {
                alert("No tienes permiso para acceder a esta página.");
                window.location.href = "/";
            } else {
                await actions.fetchCategories();
            }
        } catch (error) {
            console.error("Error al inicializar:", error.message);
        }
    };
    initialize();
}, [actions]);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "categories") {
            const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
            setFormData({ ...formData, categories: selectedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.createProduct(formData); // Usa la acción del store
        if (success) {
            alert("Producto creado con éxito.");
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                categories: [],
            });
        } else {
            alert("Error al crear el producto. Revisa los datos e inténtalo de nuevo.");
        }
    };

    if (!store.isAdmin) {
        return <p>No tienes permiso para acceder a esta página.</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Cantidad en stock"
                value={formData.stock}
                onChange={handleChange}
            />
            <select
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                multiple
                required
            >
                <option value="" disabled>
                    Seleccionar categorías
                </option>
                {store.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type="submit">Crear producto</button>
        </form>
    );
};

export default CreateProductForm;
