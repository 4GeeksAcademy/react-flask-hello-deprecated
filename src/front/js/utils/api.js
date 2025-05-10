const API_BASE_URL = "/api";

const API_ENDPOINTS = {
    USER: `${API_BASE_URL}/user`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    PRODUCTS: `${API_BASE_URL}/products`,
};

// Método genérico para realizar solicitudes HTTP
async function apiRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Agregar token de autorización si existe
    const token = localStorage.getItem("token");
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error desconocido");
        }
        return await response.json();
    } catch (error) {
        console.error("API request error:", error.message);
        throw error;
    }
}

export { API_ENDPOINTS, apiRequest };
