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
    <div className="flex-container p-4 text-center"    style={{ backgroundColor:"#EAD196"}}>
      <Producto data={detallesProducto} id={id} />
      <hr className="mt-5" style={{ width: "90%" }}></hr>
    </div>
  );
};