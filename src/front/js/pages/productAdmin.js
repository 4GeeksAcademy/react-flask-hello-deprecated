import React, { useState, useEffect } from "react";

export const ProductAdmin = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categories: [],
        imagen_url: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error("Error al cargar las categorías");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value));
        setFormData({ ...formData, categories: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: productData.name,
                    price: parseFloat(productData.price),
                    stock: parseInt(productData.stock),
                    categories: productData.categories.split(",").map((id) => parseInt(id)),
                    description: productData.description,
                    imagen_url: productData.imagen_url, // Campo opcional para la URL de la imagen
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert("Producto creado con éxito");
                setProductData({
                    name: "",
                    price: "",
                    stock: "",
                    categories: "",
                    description: "",
                    imagen_url: "",
                });
            } else {
                const errorData = await response.json();
                alert("Error al crear el producto: " + (errorData.message || "Error desconocido"));
            }
        } catch (error) {
            alert("Error en la solicitud: " + error.message);
        }
    };    

    return (
        <div className="product-admin">
            <h1>Administrar Productos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categorías:</label>
                    <select
                        name="categories"
                        multiple
                        value={formData.categories}
                        onChange={handleCategoryChange}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>URL de Imagen:</label>
                    <input
                        type="text"
                        name="imagen_url"
                        value={formData.imagen_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};
