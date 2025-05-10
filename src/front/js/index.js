// Importa React y ReactDOM desde el módulo correcto
import React from "react";
import ReactDOM from "react-dom/client"; // Importa desde "react-dom/client"

// Incluye tu archivo de estilos
import "../styles/index.css";

// Importa tus propios componentes
import Layout from "./layout";

// Crea el root usando `createRoot` y renderiza tu aplicación
const root = ReactDOM.createRoot(document.querySelector("#app"));

root.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>
);
