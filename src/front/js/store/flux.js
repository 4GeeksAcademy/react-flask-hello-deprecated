const getState = ({ getStore, getActions, setStore }) => {
    const API_URL = process.env.BACKEND_URL.replace(/\/+$/, ""); // Corrige las barras finales

    return {
        store: {
            message: null,
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ],
            user: null,
            products: [],
            cart: [],
            orders: [],
            notifications: [], // Renombrado para consistencia en plural
            featuredProducts: [],
            allProducts: [],
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/hello`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.error("Error al cargar el mensaje desde el backend:", error.message);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((item, i) => {
                    if (i === index) item.background = color;
                    return item;
                });
                setStore({ demo });
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(`${API_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setStore({ user: data.user });
                } catch (error) {
                    console.error("Error durante el login:", error.message);
                }
            },

            getFeaturedProducts: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/products?featured=true`);
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    const contentType = response.headers.get("Content-Type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("La respuesta del servidor no es JSON válida");
                    }

                    const products = await response.json();
                    setStore({ featuredProducts: products });
                } catch (error) {
                    console.error("Error al cargar los productos destacados:", error.message);
                }
            },

            getAllProducts: async () => {
                try {
                    const response = await fetch(`${API_URL}/api/products`);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                    const products = await response.json();
                    setStore({ allProducts: products || [] }); // Asigna productos o array vacío
                } catch (error) {
                    console.error("Error al cargar los productos:", error.message);
                    setStore({ allProducts: [] }); // Garantiza un estado válido
                }
            },
            

            getCart: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No se encontró un token válido");

                    const response = await fetch(`${API_URL}/api/cart`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    
                    const contentType = response.headers.get("Content-Type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("La respuesta del servidor no es JSON válida");
                    }

                    const cart = await response.json();
                    setStore({ cart });
                } catch (error) {
                    console.error("Error al cargar el carrito:", error.message);
                }
            },

            getNotifications: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No se encontró un token válido");

                    const response = await fetch(`${API_URL}/api/notifications`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                    const contentType = response.headers.get("Content-Type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("La respuesta del servidor no es JSON válida");
                    }

                    const notifications = await response.json();
                    setStore({ notifications });
                } catch (error) {
                    console.error("Error al cargar las notificaciones:", error.message);
                }
            },
        },
    };
};

export default getState;
