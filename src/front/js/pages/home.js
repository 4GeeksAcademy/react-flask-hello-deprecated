import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
        <div className="home-container">
            <h1>Home</h1>
        </div>
    );
};
