import React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// Estilos para el botón de Google
const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#4285F4', // Color del logo de Google
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '12px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '320px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
};

const googleLogoStyle = {
  width: '24px',
  height: '24px',
  marginRight: '12px',
};

const Login = ({ onSignIn }) => {
  const supabase = useSupabaseClient();

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        redirectTo: 'https://sample-service-name-gtkf.onrender.com/auth/callback',
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    } else {
      onSignIn(); // Notify parent component of successful login
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button style={buttonStyle} onClick={googleSignIn}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google logo"
          style={googleLogoStyle}
        />
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
