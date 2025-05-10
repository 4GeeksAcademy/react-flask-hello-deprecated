import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Loader } from "./component/Loader.jsx";
import { Context } from "./store/appContext";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Groups } from "./pages/Groups.jsx";
import { CurrencyConversion } from "./pages/CurrencyConversion.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { AccessDenied } from "./pages/AccessDenied.jsx";
import { Profile } from "./pages/Profile.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/footer";
import "../styles/layout.css"
import { node } from "prop-types";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isValidToken, setIsValidToken] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const validateToken = async () => {
            if(token){
                try {
                    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001/'}api/home`, {
                        method: 'GET',
                        headers: { 
                            'Content-Type': 'application/json', 
                            'Authorization': `Bearer ${token}` 
                        }
                    })
                    const data = await response.json()
                    if (response.ok){
                        setIsValidToken(true)
                        localStorage.setItem('user', JSON.stringify(data))
                    } else {
                        setIsValidToken(false)
                        localStorage.removeItem('token')
                        setToken(null)
                    }
                } catch (error) {
                    console.log('Error validating token', error)
                    setIsValidToken(false)
                    localStorage.removeItem('token')
                    setToken(null)
                }
            }
            setIsLoading(false)
        }
        validateToken()
    }, [token])
  

    const handleLogin = (newToken) => {
        setToken(newToken);
        setIsLoading(true);
    };

    if(isLoading) return <Loader />

    return (
        <div className="app-container">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {isValidToken && <Navbar />} 
                    <Routes>
                        <Route element={<Login onLogin={handleLogin}/>} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Demo />} path="/demo" />
                        {isValidToken ? (
                            <>
                            <Route element={<Home />} path="/home" />
                            <Route element={<Groups />} path="/groups" />
                            <Route element={<Profile />} path="/profile" />
                            <Route element={<CurrencyConversion />} path="/currency" />
                            <Route element={<Single />} path="/api/accept_invitation/:theid/:theemail" />
                            </>
                        ) : <Route path='/access-denied' element={<AccessDenied/>} />}
                        <Route path="*" element={<Error404 />}/> 
                    </Routes>
                    {/* {isValidToken && <Footer />} */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);