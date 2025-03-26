import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LogIn } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import { PersonalZone } from "./pages/personalZone";
import { Tendencias } from "./pages/tendencias";
import { VistaIndividualPhone } from "./pages/vistaIndividualPhone";
import { Catalog } from "./pages/catalog";
import { VistaIndividualTv } from "./pages/vistaIndividualTV";
import { VistaIndividualLaptop } from "./pages/vistaIndividualLaptop";
import { Cart } from "./pages/cart";
import { PasarelaPago } from "./pages/PasarelaPago";
import { MessagePayment } from "./pages/ConfirmPay";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="app-content flex-grow-1 overflow-auto">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<LogIn />} path="/login" />
                            <Route element={<SignUp />} path="/signup" />
                            <Route element={<PersonalZone />} path="/personalzone" />
                            <Route element={<Tendencias />} path="/tendencias" />
                            <Route element={<VistaIndividualPhone />} path="/smartphone-info/:smartphone_id" />
                            <Route element={<VistaIndividualTv />} path="/tv-info/:tv_id" />
                            <Route element={<VistaIndividualLaptop />} path="/laptop-info/:laptop_id" />
                            <Route element={<Catalog productList="phones" />} path="/phones-catalog" />
                            <Route element={<Catalog productList="tvs" />} path="/tvs-catalog" />
                            <Route element={<Catalog productList="laptops" />} path="/laptops-catalog" />
                            <Route element={<MessagePayment/>} path="/message-payment" />
                            <Route element={<Cart />} path="/cart" />
                            <Route element={<PasarelaPago/>} path="/pasarela-pago"/>
                            <Route element={<h1>Not found!</h1>} />
                            
                        </Routes>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
