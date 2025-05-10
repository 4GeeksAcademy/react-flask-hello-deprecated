import React, { useState, useEffect } from "react";

const CreateProductForm = () => {
  const BASE_URL = "https://stunning-lamp-g45qpxg76p9gfpq4-3001.app.github.dev";
  const endpoint = "/api/user/current";
  const url = new URL(endpoint, BASE_URL).toString(); // Garantiza que no haya "//"
  
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es administrador
    const checkAdmin = async () => {
      const BASE_URL = "https://stunning-lamp-g45qpxg76p9gfpq4-3001.app.github.dev";
      const endpoint = "/api/user/current";
      const url = new URL(endpoint, BASE_URL).toString();
    
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No se encontró un token de sesión. Por favor, inicia sesión.");
        window.location.href = "/login";
        return;
      }
    
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Respuesta del servidor:", errorText);
          if (response.status === 422) {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          throw new Error(`Error HTTP: ${response.status}`);
        }
    
        const data = await response.json();
        if (!data.is_admin) {
          throw new Error("No tienes permiso para acceder a esta página");
        }
    
        setIsAdmin(true);
      } catch (error) {
        console.error("Error al verificar el administrador:", error.message);
        setIsAdmin(false);
      }
    };    

    // Obtener categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error al cargar las categorías");
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    checkAdmin();
    fetchCategories();
  }, [BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Producto creado con éxito");
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category_id: "",
        });
      } else {
        console.error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (!isAdmin) {
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
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar categoría</option>
        {categories.map((category) => (
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
