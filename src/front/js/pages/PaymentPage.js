import { useEffect, useState } from "react";
import React from "react";
 import { useParams } from "react-router-dom";
 import { Elements } from "@stripe/react-stripe-js";
 import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../component/CheckoutForm";

 
 const stripePromise = loadStripe("pk_test_51R3GSLPowRpDmMbePIpqy91mpuO8R0FPMJkKLliYzl6tp7bFvTuucNQqzkvYQXdClTD30gKQRBSSEYTHS5zRetxI0001zclcZV");
 export const PaymentPage = () => {
     const { totalAmount, currency } = useParams();
     console.log(totalAmount);
 
     const [clientSecret, setClientSecret] = useState(null);
     const [loading, setLoading] = useState(true);
 
     useEffect(() => {
        if (!totalAmount || !currency) return;
    
        setLoading(true);
    
        // Convertir el totalAmount a un número y redondearlo
        const amountInCents = Math.round(parseFloat(totalAmount) * 100);
    
        fetch(`${process.env.BACKEND_URL}/api/create-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amountInCents, currency: currency }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("Error: clientSecret no recibido", data);
                }
            })
            .catch(error => console.error("Error en la petición:", error))
            .finally(() => setLoading(false));
    }, [totalAmount, currency]);
 
     if (loading) return <p>Generando pago...</p>;
     if (!clientSecret) return <p>Error: No se pudo obtener el clientSecret</p>; // 🔥 Manejo de error
 
     const appearance = {
         theme: 'night', // Selecciona un tema
         labels: 'floating'
     };
 
     return (
         <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
             <CheckoutForm />
         </Elements>
     );
 };