import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        const createPaymentSession = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://fallback-url.com';  // Valor por defecto

            const response = await fetch(`${backendUrl}/api/create-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart: [
                        { product_id: '1', quantity: 2 },  // Ejemplo de artículo en el carrito
                    ]
                })
            });

            const data = await response.json();
            if (data.error) {
                console.error("Error al crear la sesión de pago", data.error);
                return;
            }
            setClientSecret(data.client_secret);  // Asignamos el client_secret para el pago
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
        } else {
            console.log('some error');
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
