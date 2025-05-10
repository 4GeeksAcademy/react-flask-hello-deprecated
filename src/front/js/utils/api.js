const backendUrl = process.env.REACT_APP_BACKEND_URL?.endsWith("/")
    ? process.env.REACT_APP_BACKEND_URL.slice(0, -1)
    : process.env.REACT_APP_BACKEND_URL || "https://fallback-url.com"; 

const API_ENDPOINTS = {
    USER: `${backendUrl}/auth`,
    CATEGORIES: `${backendUrl}/api/categories`,
    PRODUCTS: `${backendUrl}/api/products`,
};

const apiRequest = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
    const fullUrl = endpoint.startsWith("http") ? endpoint : `${backendUrl}${endpoint}`;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Incluir token si existe
        },
        ...(body && { body: JSON.stringify(body) }), // Incluir body si existe
    };

    try {
        const response = await fetch(fullUrl, options);
        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            throw new Error(data.message || "Error desconocido");
        }

        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

export { API_ENDPOINTS, apiRequest };
