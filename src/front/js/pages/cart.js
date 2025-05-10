import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
import "../../styles/cart.css";

// Cargar la librería de Stripe
const stripePromise = loadStripe("pk_test_y6j09buhEITjgLAbivNqMsbP");

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
                const baseUrl = process.env.REACT_APP_BACKEND_URL || "https://fallback-url.com";
                const url = `${baseUrl}/api/cart?user_id=${userId}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    alert("Hubo un problema al cargar el carrito.");
                    return;
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error al procesar los datos del carrito:", error);
                alert("Hubo un error al procesar los datos del carrito.");
            }
        };

        fetchCart();
    }, [actions]);

    const handleRemoveProduct = async (productId) => {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("user")).id;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error al eliminar el producto:", errorText);
                alert("Hubo un problema al eliminar el producto.");
            } else {
                const updatedCart = cartItems.filter(item => item.product.id !== productId);
                setCartItems(updatedCart);
                alert("Producto eliminado del carrito.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
            alert("Hubo un error al eliminar el producto.");
        }
    };

    const handlePayment = async () => {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const token = localStorage.getItem("token");

        if (!token || !userId) return;

        const items = cartItems.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
        }));

        const requestBody = { user_id: userId, cart: items };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/create-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            const session = await response.json();

            if (session.error) {
                alert("Error al crear la sesión de pago.");
                return;
            }

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (error) {
            alert("Hubo un error al procesar el pago.");
        }
    };

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
                                    <button onClick={() => handleRemoveProduct(item.product.id)}>
                                        Eliminar
                                    </button>
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
            <button onClick={handlePayment}>Pagar con Stripe</button>
        </div>
    );
};
