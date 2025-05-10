import React from "react";
import Navbar from "../component/navbar";
import Clima from "../component/Clima";
import Formulario from "../component/Formulario";
import Footer from "../component/footer";
import CreatedEvent from "./CreateEvent";

const Dashboard = () => {
	return (
		<div>
			<Navbar />
			<div className="container">
				<Clima />
				<CreatedEvent />
				<Formulario />
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;

