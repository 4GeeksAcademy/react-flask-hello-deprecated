import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {

    return (
        <div className="text-center p-5 bg-dark text-warning flex-grow-1">
            <h1 className="display-1 fw-bold">Welcome to the Star Wars Universe</h1>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png"
                alt="Star Wars Logo"
                style={{ width: "300px", margin: "20px auto" }}
            />
            <p className="lead">Explore characters, planets, and starships from a galaxy far, far away...</p>
        </div>
    );
};
