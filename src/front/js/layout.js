import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import Login from "./pages/login"; 
import Register from "./pages/register"; 
import Profile from "./pages/profile";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ProductAdmin } from "./pages/productAdmin";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import ProtectedRoute from "./component/ProtectedRoute"; // Importamos el componente de protección
import { Store } from "./pages/store"; // Importar la vista de Tienda
import { Cart } from "./pages/cart"; // Importar la vista de Carrito
import { OrderHistory } from "./pages/orderHistory"; // Importar la vista de Historial de Pedidos
import { Notifications } from "./pages/notifications"; // Importar la vista de Notificaciones
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import NotFound from "./pages/notFound";
import CreateProduct from "./pages/CreateProduct"; // Importa el componente

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop> 
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/store" element={<Store />} /> 
                        <Route path="/cart" element={<Cart />} /> 
                        <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} /> 
                        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} /> 
                        <Route path="/admin/products" element={<ProductAdmin />} />
                        <Route path="/admin/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
                        <Route path="/success" element={<SuccessPage />} />
                        <Route path="/cancel" element={<CancelPage />} />
                        <Route element={<NotFound />} path="*"  />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
