import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { deleteCart, createCart } from "../apiservices/callToApi";


export const FormPayment = ({ user_id, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const finalAmount = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(amount)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://super-duper-space-adventure-pjpjqx6q46qp27jgx-3000.app.github.dev/cart'
            },
            redirect: "if_required"
        },
        );

        setLoading(false);

        if (error) {
            setMessage(error.message)
        } else if (paymentIntent.status === 'succeeded') {
            setMessage("Pago confirmado!!!");
            await deleteCart(user_id)
            await createCart(user_id)
            navigate('/message-payment');

        } else {
            setMessage("Estado Inesperado")
        }
    };

    return (
        <>
            <form className="container-form-payment" style={{ width: '30rem' }} onSubmit={handleSubmit}>
                <div style={{ minHeight: '35rem' }}>
                    <PaymentElement />
                </div>
                <p>Total a pagar: &nbsp; <b>{finalAmount}</b></p>
                <div className="container-button-payment">
                    <button type="submit" disabled={!stripe || loading}>
                        <span>
                            {loading ? 'Procesando' : 'Pagar'}
                        </span>
                    </button>
                </div>
                <p className="d-block justify-content-center">{message}</p>
            </form>
        </>

    )
}