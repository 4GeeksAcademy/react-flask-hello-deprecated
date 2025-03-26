import "../../styles/home.css";
import React, { useEffect, useContext } from "react";
import { Welcome } from '../component/home-carrousel'
import { Onfire } from '../component/onfire'
import { HomeCatalog } from "../component/home-catalog";
import { Context } from "../store/appContext";

export const Home = () => {
	const { actions } = useContext(Context);

	useEffect(() => {
		actions.setPositiveColors();
		actions.setNavbarVisibility();
	}, []);

	return (
		<div className="page-content" style={{ backgroundColor: "rgb(47, 65, 79)" }}>
			<Welcome />
			<div className="container mx-auto py-4">
				<Onfire type1="tvs" id1="8" type2="laptops" id2="2" />
				<HomeCatalog />
			</div>
		</div>
	);
};
