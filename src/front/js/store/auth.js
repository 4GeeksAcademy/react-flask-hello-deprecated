export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Retorna true si el token existe.
};
