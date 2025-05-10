import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Genre2 } from "./pages/genre2";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Login } from "./pages/login";
import { UserProfile } from "./pages/UserProfile"; // ✅ Nueva vista
import { SavedSongs } from "./pages/SavedSongs"; // ✅ Nueva vista
import { SavedArtists } from "./pages/SavedArtists"; // ✅ Nueva vista
import ArtistProfile from "./pages/ArtistProfile";
import { HomeUser } from "./pages/HomeUser";
import { UserData } from "./pages/UserData"
import { ArtistData } from "./pages/ArtistData"
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <LayoutContent /> {/* Renderiza el contenido con la lógica de ocultar */}
            </ScrollToTop>
        </BrowserRouter>
    );
};

const LayoutContent = () => {
    const location = useLocation(); // Obtiene la ruta actual

    const hideNavbarFooter = location.pathname === "/"; // Solo oculta en /login

    return (
        <>
            {!hideNavbarFooter && <Navbar />}

            <Routes>
                <Route element={<Genre2 />} path="/genre2" />
                <Route element={<Login />} path="/" />
                <Route element={<Demo />} path="/demo" />
                <Route element={<Single />} path="/single/:theid" />
                <Route element={<HomeUser />} path="/homeuser" />
                <Route element={<UserProfile />} path="/userProfile" />  {/* ✅ nueva */}
                <Route element={<SavedSongs />} path="/savedSongs" />  {/* ✅ nueva */}
                <Route element={<SavedArtists />} path="/savedArtists" />  {/* ✅ nueva */}
                <Route element={<ArtistProfile />} path="/artist/:artistId" /> {/* ultima */}
                <Route element={<UserData />} path="/userData" />
                <Route element={<ArtistData />} path="/artistData" />
                <Route element={<h1>Not found!</h1>} />
            </Routes>

            {!hideNavbarFooter && <Footer />}
        </>
    );
};

export default injectContext(Layout);


