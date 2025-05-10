import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = () => {
	
	const { store, actions } = useContext(Context);


	useEffect(()=>{
				actions.getDogFood()
				},[])

	useEffect(()=>{
				actions.getCatFood()
				},[])

	useEffect(()=>{
					actions.getExoticFood()
					},[])
	
	return (
		
		<div className="container m-0"> 
			<div className="text-center"> {/* Centra la imagen */}
				<img 
					className="img-fluid" 
					src="https://animalesde.net/wp-content/uploads/2016/12/los-animales-dom%C3%A9sticos.jpg" 
					alt="Banner" 
				/>
			</div>

			<div className="sección perros m-5">
			{/* <div className="cards d-flex overflow-auto m-4"> */}
				<h3>Productos top para perros</h3>
				<div className="row">

			{store.dogFood.map((dogFood, index) => {
				return(
				<Card 
              	name={dogFood.name} 
			  	category={"dogFood"} 
             	id={dogFood.id} 
				description={dogFood.description}
             	key={index}/>
        	);
	  		})}</div>
			</div>

			
			<div className="sección gatos m-5">
				<h3>Productos top para gatos</h3>
				<div className="row">
					
				{store.catFood.map((catFood, index) => {
				return(
				<Card 
              	name={catFood.name} 
			  	category={"catFood"} 
             	id={catFood.id} 
				description={catFood.description}
             	key={index}/>
        	);
	  		})}</div>
			</div>


			<div className="sección exóticos m-5">
				<h3>Productos top para animales exóticos</h3>
				<div className="row">
					
				{store.exoticFood.map((exoticFood, index) => {
				return(
				<Card 
              	name={exoticFood.name} 
			  	category={"exóticFood"} 
             	id={exoticFood.id} 
				description={exoticFood.description}
             	key={index}/>
				);
				})}</div>
			</div>

		
		</div>
	);
};
