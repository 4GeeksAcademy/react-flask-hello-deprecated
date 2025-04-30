import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Registro from "./pages/registro";git 
import DetalladoDeOrden from "./pages/DetalladoDeOrden.jsx";
import { Freelance } from "./pages/freelance";

import Login from "./pages/Login.jsx";
import ResutadoDeBusqueda from "./pages/ResutadoDeBusqueda.jsx";
import FreelancePerfil  from "./pages/freelancePerfil.js";
import FreelanceConfiguracion from "./pages/freelanceConfiguracion.js";



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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Registro/>} path="/registro" />
                        <Route element={<FreelanceConfiguracion/>} path="/freelanceConfiguracion"/>
                        <Route element={<FreelancePerfil />} path="/freelancePerfil/:freelance_id"/>
                        <Route element={<ResutadoDeBusqueda/>} path="/busqueda" />
                        <Route element={<Login/>} path="/iniciar-sesion" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<DetalladoDeOrden />} path="/detallado-de-orden" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
