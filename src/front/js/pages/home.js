import React, { useContext, useEffect } from "react";
import logo from "../../img/perros-gatos-asomandose-sobre-banner-web-aislado-fondo-blanco-al-generado_866663-5304 (1) (1).jpg";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = ({ activeCategory }) => { 
	const { store, actions } = useContext(Context);
	// const dogFoodRef = useRef(null); // Contenedor de cards de perros
	useEffect(() => {
		actions.getDogFood();
		actions.getCatFood();
		actions.getExoticFood();
		actions.getAccessories();
	}, []);

	return (
		<>
			<div className="container-fluid p-0" style={{ 
				backgroundColor: "#AD196", 
				minHeight: "100vh", 
				paddingBottom: "50px" 
			}}>
				<div className="text-center mb-4">
					<img 
						src={logo} 
						alt="Banner" 
						style={{ maxHeight: "350px", width: "80%", objectFit: "cover" }} 
					/>
				</div>

				{/* 📌 Si no hay categoría activa, mostramos todos los productos */}
				{activeCategory === null && (
					<>
						<div className="sección perros m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
							<h3 className="text-dark border-bottom pb-2" style={{ color: "#7D0A0A" }}>Productos top para perros</h3>
							<div className="row">
								{store.dogFood.map((dogFood, index) => (
									<Card key={index} {...dogFood} />
								))}
							</div>
						</div>

						<div className="sección gatos m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
							<h3 className="text-dark border-bottom pb-2" style={{ color: "#7D0A0A" }}>Productos top para gatos</h3>
							<div className="row">
								{store.catFood.map((catFood, index) => (
									<Card key={index} {...catFood} />
								))}
							</div>
						</div>

						<div className="sección exóticos m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
							<h3 className="text-dark border-bottom pb-2" style={{ color: "#7D0A0A" }}>Productos top para animales exóticos</h3>
							<div className="row">
								{store.exoticFood.map((exoticFood, index) => (
									<Card key={index} {...exoticFood} />
								))}
							</div>
						</div>
						<div className="sección accesorios m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
							<h3 className="text-dark border-bottom pb-2" style={{ color: "#7D0A0A" }}>Acesorios top para tu mascota</h3>
						<div className="row">
							{store.accessories.map((accessories, index) => (
								<Card key={index} {...accessories} />
						
							))}
						</div>	
						</div>
					</>
				)}

				{/* 📌 Si el usuario selecciona una categoría, solo mostramos esa */}
				{activeCategory === "dogFood" && (
					<div className="sección perros m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
						<h3 className="text-dark border-bottom pb-2">Productos top para perros</h3>
						<div className="row">
							{store.dogFood.map((dogFood, index) => (
								<Card key={index} {...dogFood} />
							))}
						</div>
					</div>
				)}

				{activeCategory === "catFood" && (
					<div className="sección gatos m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
						<h3 className="text-dark border-bottom pb-2">Productos top para gatos</h3>
						<div className="row">
							{store.catFood.map((catFood, index) => (
								<Card key={index} {...catFood} />
							))}
						</div>
					</div>
				)}

				{activeCategory === "exoticFood" && (
					<div className="sección exóticos m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF" }}>
						<h3 className="text-dark border-bottom pb-2">Productos top para animales exóticos</h3>
						<div className="row">
							{store.exoticFood.map((exoticFood, index) => (
								<Card key={index} {...exoticFood} />
							))}
						</div>
					</div>
				)}

				{activeCategory === "accesories" && (
				<div className="sección accesorios m-5 p-4 rounded" style={{ backgroundColor: "#F2E5BF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
					<h3 className="text-dark border-bottom pb-2">Acesorios top para tu mascota</h3>
					<div className="row">
						{store.accessories.map((accessories, index) => (
						<Card key={index} {...accessories} />
				
						))}
					</div>	
				</div>
				)}

			</div>
		</>
	);
};
