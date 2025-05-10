import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Producto } from "../component/producto";
import { useParams } from "react-router";

export const VistaProducto = () => {
  const { store, actions } = useContext(Context);
  const [detallesProducto, setDetallesProducto] = useState({});
  const { id } = useParams();

  const getInfoProducto = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "tu_cookie_aquí");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/foods/${id}`, requestOptions);
      const data = await response.json();
      setDetallesProducto(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInfoProducto();
  }, [id]);

  return (
    <div className="flex-container mt-5 text-center">
      <Producto data={detallesProducto} id={id} />
      <hr className="mt-5" style={{ width: "90%" }}></hr>
      <div className="sección similares my-5">
        <h3>Productos similares</h3>
        <div className="row justify-content-center my-5">
          <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
          <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
          <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
          <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
        </div>
      </div>
    </div>
  );
};