import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Howitworks } from "../component/howitworks";
import { Calltoaction } from "../component/calltoaction";
import { Header } from "../component/header";
import { Sectores } from "../component/sectores";
import { Navbar } from "../component/navbar";
import { Carruselinfluencers } from "../component/carruselinfluencers";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="mt-5">
      <Header />
      <Howitworks />
      <Sectores />
      <Carruselinfluencers />
      <Calltoaction />
    </div>
  );
};
