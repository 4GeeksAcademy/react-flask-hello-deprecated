import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const createPaymentSession = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            // Obtén los productos reales del carrito
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const cartData = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));

            const response = await fetch(`${backendUrl}/api/create-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: cartData // Aquí pasamos el carrito real
                })
            });

            const data = await response.json();
            if (data.error) {
                console.error("Error al crear la sesión de pago", data.error);
                return;
            }
            setClientSecret(data.client_secret);
        };

        createPaymentSession();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setLoading(false);

        if (error) {
            console.error('[error]', error);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            await clearCart(); // Llamar para vaciar el carrito después del pago
        } else {
            console.log('Some error occurred');
        }
    };

    clearCart: async () => {
        const token = localStorage.getItem("token");
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clear-cart`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const result = await response.json();
            if (response.ok) {
                setStore({ cart: [], cartItemCount: 0 }); // Limpiar carrito y contador
                console.log("Carrito vaciado exitosamente");
            } else {
                console.error("Error al vaciar el carrito:", result.message);
            }
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };        

    return (
        <form className="w-50 bg-light mx-auto" onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                Pay
            </button>
        </form>
    );
};
