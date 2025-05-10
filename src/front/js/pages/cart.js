import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/cart.css";

export const Cart = () => {
    const { store, actions } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token no encontrado");
                return; // Si no hay token, no se realiza la solicitud
            }

            try {
                // Verifica la URL base antes de hacer la solicitud
                const baseUrl = process.env.BACKEND_URL || "https://special-funicular-pjgr67xp9qgv29w79-3001.app.github.dev";
                const url = `${baseUrl}/api/cart?user_id=${userId}`;
                console.log("URL de la solicitud:", url); // Verifica la URL completa

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Incluye el token
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error al obtener el carrito:", errorText);
                    alert("Hubo un problema al cargar el carrito.");
                } else {
                    const data = await response.json();
                    console.log("Datos del carrito:", data);
                    setCartItems(data);
                }
            } catch (error) {
                console.error("Error al procesar los datos del carrito:", error);
                alert("Hubo un error al procesar los datos del carrito.");
            }
        };

        fetchCart();
    }, [actions]);

    return (
        <div className="cart-container">
            <h1>Tu Carrito</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.product ? (
                                <>
                                    <p>{item.product.name}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                </>
                            ) : (
                                <p>Producto no encontrado.</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    );
};
