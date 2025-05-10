import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Landing } from "./pages/landingpage";
import { Listing } from "./pages/listingpage";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { AboutUs } from "./pages/aboutUs";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ContactUs } from "./pages/contactUs";
import { SparklineChart } from "./pages/sparklineChart";
import { Userdashboard } from "./pages/userdashboard";
import { Favorites } from "./component/Favorites";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <ContactUs />
                    <Routes>
                        <Route element={<Landing />} path="/" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<Listing />} path="/listingpage" />
                        <Route element={<Userdashboard />} path="/userdashboard" />
                        <Route element={<SparklineChart />} path="/sparklineChart" />
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
