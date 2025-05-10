import { useNavigate } from "react-router-dom";
const BASE_URL = "https://literate-space-broccoli-pjgpgxr54vxjh7r9w-3001.app.github.dev/api";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: sessionStorage.getItem("token") || null
        },
        actions: {
            registerUser: async (email, password, nombre, apellidos, navigate) => {
                try {
                    const response = await fetch(`${BASE_URL}/create`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password, nombre, apellidos })
                    });

                    if (!response.ok) {
                        throw new Error("Error al registrar usuario");
                    }

                    alert("Registro exitoso. Ahora puedes iniciar sesión.");
                    navigate("/login");
                } catch (error) {
                    console.error("Error en el registro:", error);
                }
            },

            loginUser: async (email, password, navigate) => {
                try {
                    const response = await fetch(`${BASE_URL}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        throw new Error("Credenciales incorrectas");
                    }

                    const data = await response.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    alert("Inicio de sesión exitoso.");
                    navigate("/profile");
                } catch (error) {
                    console.error("Error en el inicio de sesión:", error);
                }
            },

            logoutUser: (navigate) => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
                alert("Has cerrado sesión.");
                navigate("/");
            }
        }
    };
};

export default getState;



