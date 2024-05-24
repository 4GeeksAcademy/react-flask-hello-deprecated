import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { LogIn } from "./pages/LogIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Home } from "./pages/Home.jsx";
import { MyRooms } from "./pages/MyRooms.jsx";
import { Profile } from "./pages/Profile.jsx";
import { RoomDetail } from "./pages/RoomDetail.jsx";
import { CreateRoom } from "./pages/CreateRoom.jsx";
import { EditRoom } from "./pages/EditRoom.jsx"; // Import the EditRoom component
import PrivateRoute from "./component/PrivateRoute.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<PrivateRoute><Profile /></PrivateRoute>} path="/profile" />
                        <Route element={<PrivateRoute><MyRooms /></PrivateRoute>} path="/my-rooms" />
                        <Route element={<RoomDetail />} path="/room/:roomId" />
                        <Route element={<CreateRoom />} path="/create-room" />
                        <Route element={<PrivateRoute><EditRoom /></PrivateRoute>} path="/edit-room/:room_id" /> 
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
