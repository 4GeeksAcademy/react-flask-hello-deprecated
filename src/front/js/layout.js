import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Contacts } from "./pages/contacts.jsx";
import { Characters } from "./pages/characters.jsx";
import { Starships } from "./pages/starships.jsx";
import { Planets } from "./pages/planets.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100 bg-dark">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="flex-grow-1">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<Contacts />} path="/contacts" />
                            <Route element={<Characters />} path="/characters" />
                            <Route element={<Characters />} path="/characters/:uid" />
                            <Route element={<Starships />} path="/starships" />
                            <Route element={<Starships />} path="/starships/:uid" />
                            <Route element={<Planets />} path="/planets" />
                            <Route element={<Planets />} path="/planets/:uid" />
                            <Route element={<h1>Not found!</h1>} path="*" />
                        </Routes>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
