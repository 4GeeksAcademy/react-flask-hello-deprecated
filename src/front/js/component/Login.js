import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import GoogleLogin from './GoogleLogin'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApjxCBvwLVsW8B6WFLsgJ3AxCoMEM8--I",
  authDomain: "app-de-clima-cd5ef.firebaseapp.com",
  projectId: "app-de-clima-cd5ef",
  storageBucket: "app-de-clima-cd5ef.appspot.com",
  messagingSenderId: "157882657628",
  appId: "1:157882657628:web:3a8df06718e466630eef99",
  measurementId: "G-TRHDBC0V03",
};

function saveTokenAndUserInfo(token) {
  // Decode the token (JWT) to extract user info
  const decoded = decodeJwt(token);

  // Check if decoding was successful
  if (decoded) {
      // Save the token in localStorage
      localStorage.setItem('auth_token', token);

      // Save user info in localStorage
      localStorage.setItem('user_info', JSON.stringify({
          id: decoded.sub,
          email: decoded.email,
          exp: decoded.exp
      }));

      console.log('Token and user info saved successfully!');
  } else {
      console.error('Invalid token or unable to decode.');
  }
}

// Function to decode JWT token
function decodeJwt(token) {
  try {
      // JWTs are composed of three parts: header, payload, and signature
      const payload = token.split('.')[1];

      // Decode the base64-encoded payload and parse as JSON
      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload;
  } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
  }
}


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuario logueado con Google:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      alert("Error al iniciar sesión con Google. Por favor, intenta nuevamente.");
    }
  };

  const responseMessage = (response) => {

    const decodedToken = jwtDecode(response.credential);

    const email = decodedToken.email;
    const name = decodedToken.name;

    const userData = {
      token: response.credential,
      email: email,
      name: name,
  };

  localStorage.setItem('userCredentials', JSON.stringify(userData));

  navigate('/dashboard');
};
const errorMessage = (error) => {
    console.log(error);
};

  // Inicio de sesión con correo y contraseña
  const handelSignIn = () => {
    console.log('Sing In ')
  }

   const loginUser = async (email, password) => {
    const url = 'https://effective-space-trout-vgvrqw54744fw95p-3001.app.github.dev/api/login';
    
    const body = JSON.stringify({
      email: email,
      password: password
    });
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      // Assuming the response is JSON
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error:', error);
      throw error;  // Re-throw error for handling by the caller
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
     // const userCredential = await signInWithEmailAndPassword(auth, email, password);
     // const user = userCredential.user;
      const userDB = await  loginUser(email, password)
      console.log("userDB", userDB)
      saveTokenAndUserInfo(userDB.token);

      console.log("Usuario logueado con correo:", userDB);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión con correo:", error);
      alert("Usuario o contraseña incorrectos. Por favor, intenta nuevamente.");
    }
  };

  // Redirigir al registro
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFFDC4",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2>🌦️ App de Clima</h2>
        <h3>Iniciar Sesión</h3>
        
        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
          <button
            type="submit"
            style={{
              margin: "10px 0",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        <GoogleLogin onSignIn={handelSignIn} />
        {/* <GoogleLogin 
        onSuccess={responseMessage} 
        onError={errorMessage}
        cookiePolicy='single_host_origin'
        responseType='code'
        scope="openid email profile https://www.googleapis.com/auth/calendar" /> */}

        <button
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            boxSizing: "border-box",
          }}
          onClick={handleRegisterRedirect}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Login;