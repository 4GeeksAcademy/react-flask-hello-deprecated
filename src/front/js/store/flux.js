const getState = ({ getStore, getActions, setStore }) => {
    const API_URL = process.env.BACKEND_URL.replace(/\/+$|^\/+/g, "");

    return {
        store: {
            message: null,
            user: null,
            isAdmin: false,
            categories: [],
            featuredProducts: [],
            allProducts: [],
            totalProducts: 0, // Total de productos para paginación
            totalPages: 0,    // Total de páginas
            cart: [],         // Estado para almacenar los productos del carrito
       
        },
        actions: {
            // Obtener mensaje desde el backend
            getMessage: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/hello`);
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("Error del servidor:", errorText);
                        throw new Error(`Error ${response.status}: ${errorText}`);
                    }
                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.error("Error al cargar el mensaje desde el backend:", error.message);
                }
            },

            // Verificar si el usuario es administrador
            checkAdmin: async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No se encontró el token");
                    return false;
                }
            
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/auth/current`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
            
                    if (!response.ok) {
                        console.error("Error al verificar administrador:", response.status, response.statusText);
                        if (response.status === 401 || response.status === 403) {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }
                        return false;
                    }
            
                    const user = await response.json();
                    setStore({ user, isAdmin: user.is_admin });
                    return user.is_admin;
                } catch (error) {
                    console.error("Error al verificar administrador:", error.message);
                    return false;
                }
            },            

            // Obtener categorías
            fetchCategories: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/categories`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
                    const categories = await response.json();
                    console.log("Categories Loaded:", categories);
                    setStore({ categories });
                } catch (error) {
                    console.error("Error al obtener categorías:", error.message);
                    setStore({ categories: [] });
                }
            },            

            // Crear un producto
            createProduct: async (productData) => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${API_URL}/api/products`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(productData),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        console.error("Error al crear el producto:", error.error);
                        return { success: false, message: error.error };
                    }

                    const product = await response.json();
                    console.log("Producto creado:", product);
                    return { success: true, product };
                } catch (error) {
                    console.error("Error en la solicitud al crear producto:", error.message);
                    return { success: false, message: error.message };
                }
            },

            // Obtener productos destacados
            getFeaturedProducts: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/products?featured=true&page=1&per_page=5`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
                    const data = await response.json();
                    setStore({ featuredProducts: data.products });
                } catch (error) {
                    console.error("Error al obtener productos destacados:", error.message);
                }
            },

            // Obtener todos los productos
            getAllProducts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
                    const data = await response.json();
                    console.log("Todos los productos:", data); // Verifica la estructura
                    setStore({ allProducts: data.products }); // Solo guardar los productos
                } catch (error) {
                    console.error("Error al obtener todos los productos:", error.message);
                    setStore({ allProducts: [] });
                }
            },                   

            // Buscar productos con filtros
            searchProducts: async (search = '', categoryId = null, page = 1, perPage = 10) => {
                try {
                    const params = new URLSearchParams({
                        search,
                        page,
                        per_page: perPage,
                    });

                    if (categoryId) {
                        params.append('category_id', categoryId);
                    }

                    const response = await fetch(`${API_URL}/api/products?${params.toString()}`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                    const data = await response.json();
                    setStore({
                        allProducts: data.products,
                        totalProducts: data.total,
                        totalPages: data.pages,
                    });
                } catch (error) {
                    console.error("Error al buscar productos:", error.message);
                }
            },

            addToCart: async (product) => {
                const token = localStorage.getItem("token");
                const userId = JSON.parse(localStorage.getItem("user")).id;
                console.log("Enviando producto al carrito:", product);
            
                try {
                    const response = await fetch(`${API_URL}/api/cart`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            product_id: product.id,
                            quantity: 1,
                            user_id: userId,
                        }),
                    });
            
                    if (!response.ok) {
                        const error = await response.json();
                        console.error("Error al añadir al carrito:", error.message);
                        return { success: false, message: error.message };
                    }
            
                    const data = await response.json();
                    console.log("Producto añadido al carrito:", data); // Verifica que la respuesta sea la esperada
            
                    // Actualizar el carrito en el estado global
                    setStore({ cart: [...getStore().cart, data] });
                    alert("Producto añadido al carrito"); // Asegúrate de que se muestra la alerta
                    return { success: true, message: "Producto añadido al carrito" };
                } catch (error) {
                    console.error("Error al realizar la solicitud:", error.message);
                    return { success: false, message: error.message };
                }
            },                        

            // Obtener el carrito de compras del usuario
            getCart: async () => {
                const token = localStorage.getItem("token");
                const userId = JSON.parse(localStorage.getItem("user")).id;
                try {
                    const response = await fetch(`${API_URL}/api/cart?user_id=${userId}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Error al obtener el carrito");
                    }

                    const cartItems = await response.json();
                    setStore({ cart: cartItems });
                } catch (error) {
                    console.error("Error al obtener el carrito:", error.message);
                    setStore({ cart: [] });
                }
            },
        },
    };
};

export default getState;
