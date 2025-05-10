import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import cloudinary from "cloudinary-core"; // Importar el SDK de Cloudinary

const CreateProductForm = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categories: [], // Mantén el formato compatible con el backend
        image: null, // Campo para la imagen
    });

    // Estado para verificar si las categorías ya fueron cargadas
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                const isAdmin = await actions.checkAdmin();
                if (!isAdmin) {
                    alert("No tienes permiso para acceder a esta página.");
                    return;
                }
                if (!categoriesLoaded) {
                    await actions.fetchCategories();
                    setCategoriesLoaded(true); // Marcar que las categorías han sido cargadas
                }
            } catch (error) {
                console.error("Error al inicializar:", error.message);
            }
        };
        if (!categoriesLoaded) {
            initialize();
        }
    }, [categoriesLoaded, actions]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === "categories") {
            const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
            setFormData({ ...formData, categories: selectedOptions });
        } else if (type === "file") {
            setFormData({ ...formData, image: files[0] }); // Guardar archivo de imagen
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const cloudinaryInstance = cloudinary.Cloudinary.new({ cloud_name: "dp1hfcvss" }); // Usar tu cloud name
            const uploadPreset = "your_upload_preset"; // Usa el preset de carga de imágenes de Cloudinary

            try {
                const result = await cloudinaryInstance.uploader.upload(file, {
                    upload_preset: uploadPreset,
                });

                // Guardar la URL de la imagen subida
                setFormData({ ...formData, image: result.secure_url });
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);

        // Enviar las categorías como un arreglo de enteros
        formDataToSend.append("categories", formData.categories);

        // Subir la imagen si existe
        if (formData.image) {
            formDataToSend.append("image", formData.image); // Se agrega la URL de la imagen de Cloudinary
        }

        // Usar la URL del backend desde la variable de entorno
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formDataToSend,
        });

        const data = await response.json();
        if (response.ok) {
            alert("Producto creado con éxito");
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                categories: [],
                image: null,  // Limpiar el campo de imagen
            });
            // Aquí puedes redirigir o renderizar la nueva imagen, dependiendo de lo que necesites.
        } else {
            alert("Error al crear el producto: " + data.error);
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

            {/* Campo para subir la imagen */}
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
            />

            <button type="submit">Crear producto</button>
        </form>
    );
};

export default CreateProductForm;
