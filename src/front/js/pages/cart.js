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
                // Verifica la URL base antes de hacer la solicitud
                const baseUrl = process.env.REACT_APP_BACKEND_URL || "https://fallback-url.com";  // Valor por defecto
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

    // Función que se ejecuta cuando el usuario hace clic en el botón de pagar
    const handlePayment = async () => {
        console.log("Iniciando el proceso de pago");
    
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("Token no encontrado");
            return;
        }
    
        const items = cartItems.map(item => ({
            product_id: item.product.id, // ID del producto
            quantity: item.quantity, // Cantidad del producto
        }));
    
        const requestBody = {
            user_id: userId,
            cart: items, // El carrito con la estructura correcta
        };
    
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
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id, // Usar el id de sesión de Stripe
            });
    
            if (error) {
                console.error("Error al redirigir a Stripe", error);
                alert("Hubo un error al procesar el pago.");
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
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
            {/* Botón de pago que llama a la función handlePayment */}
            <button onClick={handlePayment}>Pagar con Stripe</button>
        </div>
    );
};
