import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";

import Login from "./component/Login"; // Página principal
import Register from "./component/Register"; // Página de registro
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback"
import WeatherPage from "./pages/weather";
import UsersPage from './pages/userListpage'

const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<Routes>
					{/* Ruta principal para el Login */}
					<Route path="/" element={<Login />} />
					{/* Ruta para el registro */}
					<Route path="/register" element={<Register />} />
					{/* Ruta del Dashboard */}
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/auth/callback" element={<AuthCallback />} />
					<Route path="/clima" element={<WeatherPage />} />
					<Route path ="/users" element= {<UsersPage />} />
					{/* Ruta por defecto: Not Found */}
					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);



