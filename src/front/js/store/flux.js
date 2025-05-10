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
            cart: [],
            cartItemCount: 0,
        },
        actions: {
            getMessage: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/hello`);
                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.error("Error al cargar el mensaje desde el backend:", error.message);
                }
            },

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
                        console.error("Error al verificar administrador:", response.status);
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

            fetchCategories: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/categories`);
                    const categories = await response.json();
                    setStore({ categories });
                } catch (error) {
                    console.error("Error al obtener categorías:", error.message);
                    setStore({ categories: [] });
                }
            },

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
                    return { success: true, product };
                } catch (error) {
                    console.error("Error en la solicitud al crear producto:", error.message);
                    return { success: false, message: error.message };
                }
            },

            getFeaturedProducts: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/products?featured=true`);
                    const data = await response.json();
                    setStore({ featuredProducts: data.products });
                } catch (error) {
                    console.error("Error al obtener productos destacados:", error.message);
                }
            },

            getAllProducts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
                    const data = await response.json();
                    setStore({ allProducts: data.products });
                } catch (error) {
                    console.error("Error al obtener todos los productos:", error.message);
                    setStore({ allProducts: [] });
                }
            },

            addToCart: async (product) => {
                const token = localStorage.getItem("token");
                const userId = JSON.parse(localStorage.getItem("user")).id;
            
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
                    setStore({ cart: [...getStore().cart, data] });

                    const totalItems = getStore().cart.reduce((total, item) => total + item.quantity, 0);
                    setStore({ cartItemCount: totalItems });
            
                    alert("Producto añadido al carrito");
                    return { success: true, message: "Producto añadido al carrito" };
                } catch (error) {
                    console.error("Error al realizar la solicitud:", error.message);
                    return { success: false, message: error.message };
                }
            },

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

                    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
                    setStore({ cartItemCount: totalItems });
                } catch (error) {
                    console.error("Error al obtener el carrito:", error.message);
                    setStore({ cart: [], cartItemCount: 0 });
                }
            },

            clearCart: async () => {
                const token = localStorage.getItem("token");
                const userId = JSON.parse(localStorage.getItem("user")).id;
            
                try {
                    const response = await fetch(`${API_URL}/api/clear-cart`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
            
                    const result = await response.json();
            
                    if (response.ok) {
                        setStore({ cart: [], cartItemCount: 0 });
                        localStorage.setItem("cart", JSON.stringify([]));
                        console.log("Carrito vaciado exitosamente");
                    } else {
                        console.error("Error al vaciar el carrito:", result.message);
                    }
                } catch (error) {
                    console.error("Error al vaciar el carrito:", error);
                }
            },            
        },
    };
};

export default getState;
