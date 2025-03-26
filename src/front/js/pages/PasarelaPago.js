import React, { useState, useEffect } from "react";
import { FormPayment } from "../component/formPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";


const urlBackend = process.env.BACKEND_URL;
const stripePromise = loadStripe('pk_test_51QxWTcF1M5ixil84DV7yx8UcwpGMJXggd0XSjMwT493HuieKbKIf3nWo94YaWDYrl4A781CqNpXw5vww4Q3p3IBv00oAd5cnVd')

export const PasarelaPago = () => {
  const { actions } = useContext(Context);
  const location = useLocation()
  const paymentAmount = location.state.paymentAmount
  const user_id = sessionStorage.getItem('idUser')
  const [clientSecret, setClientSecret] = useState(null);

  const paymentIntent = async () => {
    const response = await fetch(urlBackend + 'payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'amount': Number(paymentAmount * 100),
        'currency': 'eur'
      })
    });
    const data = await response.json();
    if (data.client_secret) {
      setClientSecret(data.client_secret);
    } else {
      console.error('No se recibió el client_secret');
    };
  };

  useEffect(() => {
    paymentIntent();
  }, []);

  useEffect(() => {
    actions.setNegativeColors();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(234, 248, 252)";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      accessibleColorOnColorPrimary: '#262626'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '20px'
      },
      '.Input': {
        padding: '15px'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  };

  return (
    <>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <div className="pasarela-payment">
            <FormPayment user_id={user_id} amount={paymentAmount} />
          </div>
        </Elements>
      ) : (
        <p style={{ color: 'black', fontSize: '5rem' }}>Cargando pago......</p>
      )}
    </>
  );
}