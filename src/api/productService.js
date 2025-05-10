export const fetchProducts = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return response;
};
