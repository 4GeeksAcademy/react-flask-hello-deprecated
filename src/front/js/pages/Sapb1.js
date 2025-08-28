import React, { useRef, useState } from "react";
import "../../styles/home.css";

import SAP_one from "../../img/07_finanzas.png";
import SAP_two from "../../img/06_ventas_crm.png";
import SAP_three from "../../img/08_bancos.png";
import SAP_four from "../../img/04_demo-sap-b1-min.png";

import SAP_five from "../../img/10_stock.png"; // https://corponet.com/#ERPparaPYMES GUIA
import SAP_six from "../../img/08_compras.png";       // Puedes cambiar la imagen
import SAP_seven from "../../img/09_produccion.png";  // Puedes cambiar la imagen

export const Sapb1 = () => {
  const services = [
    {
      id: 1,
      title: "Finanzas",
      description:
        "Toma decisiones de tu negocio con información confiable y en tiempo real.",
      image: SAP_one,
    },
    {
      id: 2,
      title: "Ventas y CRM",
      description:
        "Incrementa el nivel de servicio que ofrece tu fuerza de ventas y logra el crecimiento que buscas.",
      image: SAP_two,
    },
    {
      id: 3,
      title: "Tesorería",
      description:
        "Maximiza el tiempo de búsqueda para las cuentas por cobrar y pagar, evita errores al ingresar movimientos para la conciliación bancaria.",
      image: SAP_three,
    },
  ];

  const extraModules = [
    {
      id: 4,
      title: "Inventarios",
      description:
        "Incrementa la confiabilidad en tus costos y existencias para hacer más rentable tu empresa.",
      image: SAP_five,
    },
    {
      id: 5,
      title: "Compras",
      description:
        "Libera tu flujo de efectivo a través de mejores compras con planeación dinámica.",
      image: SAP_six,
    },
    {
      id: 6,
      title: "Producción",
      description:
        "Reduce el costo de tu producción, integrando planeación y control en tus procesos.",
      image: SAP_seven,
    },
  ];

  return (
    <section style={{ padding: "40px", backgroundColor: "#f4f4f4", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ 
      textAlign: "center", 
      fontSize: "2rem", 
      marginBottom: "30px", 
      color: "#36b0a1" 
    }}>
      SAP Business One: el ERP para PYMES
    </h2>

      <div style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "30px", lineHeight: "1.6", fontSize: "16px", textAlign: "justify" }}>
         <p>
          ¿Qué es SAP Business One? Es un ERP diseñado para que la PYME y las empresas en crecimiento de hoy operen
          como un GRANDE. Una <strong>solución completa</strong> para administrar toda tu empresa con transparencia e
          integrando finanzas, ventas, inventarios, operaciones y más.
        </p>
        <p>
          Te ayuda a tener mayor control de tu negocio de forma integral, con acceso instantáneo a información clave,
          mayor productividad y crecimiento rentable.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img
          src={SAP_four}
          alt="SAP B1 Pantalla"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Primera fila */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "300px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{ width: "75px", height: "74px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4 style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>{service.title}</h4>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Segunda fila */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {extraModules.map((module) => (
          <div
            key={module.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "300px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={module.image}
              alt={module.title}
              style={{ width: "75px", height: "74px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4 style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>{module.title}</h4>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>{module.description}</p>
          </div>
        ))}
      </div>
       {/* Ícono flotante de WhatsApp */}
      <a
         href="https://wa.me/64221031551?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "40px",
          color: "#25D366",
          textDecoration: "none",
        }}
      >
        <i className="fab fa-whatsapp"></i>
      </a>
      
    </section>
    
  );
};
