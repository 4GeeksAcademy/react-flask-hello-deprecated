import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/register.jsx";
import ListOfProducts from "./pages/listofproducts.jsx";
import ProductDetail from "./pages/productDetail.jsx";
import Editor from "./pages/editor.jsx";
import WishList from "./pages/wishlist.jsx";
import Agenda from "./pages/agenda.jsx";
import Professionals from "./pages/professionals.jsx";

import { Navbar } from "./component/navbar";
import  Footer  from "./component/footer";
import Contact from "./pages/contact.jsx";
import About from "./pages/about.jsx";
import Social from "./pages/social.jsx";
import Cart from "./pages/cart.jsx"
import CardProfile from "./pages/profile.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LogIn />} path="/logIn" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<ListOfProducts />} path="/products" />
                        <Route element={<Professionals />} path="/professionals" />
                        <Route element={<Editor />} path="/editor" />
                        <Route element={<Cart />} path="/cart" />
                        <Route element={<WishList />} path="/wishlist/users/:token" />
                        <Route element={<ProductDetail />} path="/product/:id" />
                        <Route element={<CardProfile />} path="/user/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Social />} path="/social" />
                        <Route element={<Agenda />} path="/agenda" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
};

export default injectContext(Layout);
