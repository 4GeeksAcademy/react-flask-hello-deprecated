import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { SignupForm } from "./component/signup-form";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { PrincipalPage } from "./pages/principalPage"
import { NotFound } from "./pages/notFound";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<Login />} path="/" />
                <Route element={<Demo />} path="/demo" />
                <Route element={<PrincipalPage />} path="/cuentas" />
                <Route element={<SignupForm />} path="/registro" />
                <Route element={<Single />} path="/single/:theid" />
                <Route element={<NotFound/>} path="*" />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
