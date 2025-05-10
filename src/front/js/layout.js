import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import PrivateRoute from "./component/PrivateRoute.jsx";
import { Navbar } from "./component/navbar";

//Herramientas
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import  { Toaster } from "react-hot-toast";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";

// Vistas globales
import { Home } from "./pages/home";
import Registro from "./pages/registro";
import Login from "./pages/Login.jsx";



// Vistas user
import ResutadoDeBusqueda from "./pages/ResutadoDeBusqueda.jsx";
import FreelancePerfil  from "./pages/freelancePerfil.js";   
import DetalladoDeOrden from "./pages/DetalladoDeOrden.jsx";
import  Ordenes  from "./pages/Ordenes.jsx";


// Vistas freelance
import FreelanceDescrption from "./pages/freelanceDescripcion.js";
import FreelanceFormulario from "./pages/freelanceFormulario.js";
import FreelanceEdit from "./pages/freelanceEdit.js";
import FreelanceLayout from "./pages/freelanceLayout.js";
import FreelanceDashboard from "./pages/freelanceDashboard.js";
import Sidebar from "./component/Sidebar.jsx";


import Favorites from "./pages/Favorites.jsx"


const initialOptions = {
    "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
    currency: "MXN",
    intent: "capture",
  };



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <PayPalScriptProvider options={initialOptions}>
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                     <Sidebar/>
                    <Routes>
                       
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Registro/>} path="/registro" />
                        <Route element={<Login/>} path="/iniciar-sesion" />
                        <Route element={<PrivateRoute allowedRoles={ ["freelance"] }><FreelanceEdit/></PrivateRoute>} path="/freeEdit"/>
                        <Route element={<PrivateRoute allowedRoles={ ["freelance"] }><FreelanceDescrption/></PrivateRoute>} path="/freeCV"/>
                        <Route element={<PrivateRoute allowedRoles={ ["freelance"] }><FreelanceFormulario/></PrivateRoute>} path="/freeForm"/>
                        <Route element={<PrivateRoute allowedRoles={ ["freelance"] }><FreelanceLayout /></PrivateRoute>} path="/freeConfig"/>
                        <Route element={<PrivateRoute allowedRoles={ ["freelance"] }><FreelanceDashboard /></PrivateRoute>} path="/freeDash"/>
                        <Route element={<FreelancePerfil />} path="/freelancePerfil/:freelance_id"/>
                        <Route element={<ResutadoDeBusqueda/>} path="/busqueda" />
                        <Route element={<DetalladoDeOrden />} path="/detallado-de-orden" />
                        <Route element={<Ordenes />} path="/ordenes" />
                        <Route element={<Favorites />} path="/favoritos" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
                <Toaster/>
            </BrowserRouter>
        </div>
        </PayPalScriptProvider>
    );
};

export default injectContext(Layout);
