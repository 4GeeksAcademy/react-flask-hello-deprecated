import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";

import { Home } from "./pages/home";
import { PerfilUsuario} from "./pages/perfilUsuario";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { RecuperacionContraseña } from "./component/recuperacionContraseña";
import { VistaMascota } from "./pages/vistaMascota";
import { VistaProducto } from "./pages/VistaProducto";
import { LoginSignup } from "./pages/loginSignup";
import { RegistroMascota } from "./pages/RegistroMascota";
import { CarritoPago } from "./pages/CarritoPago";
import { StripePromise } from "./pages/PaymentPage";
import { PaymentPage } from "./pages/PaymentPage";
import AlertComponent from "./pages/AlertComponent";



//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [activeCategory, setActiveCategory] = useState(null);
    const { actions } = useContext(Context); // Obtenemos acciones del contexto

    useEffect(() => {
        actions.loadUserFromStorage();
        actions.loadCartFromStorage();

        // Detectar actividad del usuario y reiniciar el temporizador
        const resetInactivityTimer = () => {
            clearTimeout(window.inactivityTimer);
            window.inactivityTimer = setTimeout(() => {
                console.log("Usuario inactivo, cerrando sesión...");
                actions.logout();
            }, 30 * 60 * 1000);  // 🔹 Cerrar sesión tras 30 min de inactividad
        };

        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keydown", resetInactivityTimer);
        document.addEventListener("click", resetInactivityTimer);

        return () => {
            document.removeEventListener("mousemove", resetInactivityTimer);
            document.removeEventListener("keydown", resetInactivityTimer);
            document.removeEventListener("click", resetInactivityTimer);
        };
    }, []);


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Routes>
                    {/* Colocamos useLocation dentro de Routes */}
                    <Route path="*" element={<PageWithNavbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

// Nuevo componente para manejar el Navbar
const PageWithNavbar = ({ activeCategory, setActiveCategory }) => {
    const location = useLocation(); 
    const hideNavbarRoutes = ["/perfilUsuario", "/loginSignup"];   // Rutas donde ocultamos el Navbar

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname)  && <Navbar setActiveCategory={setActiveCategory} />}
            <Routes>
                <Route element={<Home activeCategory={activeCategory} />} path="/" />
                <Route element={<VistaProducto />} path="/vista-producto/:id" />
                <Route element={<LoginSignup />} path="/loginSignup" />
                <Route element={<VistaMascota />} path="/pets/:id" />
                <Route element={<PerfilUsuario />} path="/perfilUsuario" />
                <Route element={<Demo />} path="/demo" />
                <Route element={<Single />} path="/single/:theid" />
                <Route element={<RegistroMascota />} path="/registro-mascota" />
                <Route element={<CarritoPago />} path="/carrito" />
                <Route path="/checkout/:totalAmount/:currency" element={<PaymentPage />} />
                <Route element={<AlertComponent />} path="/confirmacion-pedido" /> 
                <Route element={<RecuperacionContraseña />} path="/recuperacionContraseña" />
                <Route element={<h1>Not found!</h1>} path="*" />
            </Routes>
        </>
    );
};

export default injectContext(Layout);
