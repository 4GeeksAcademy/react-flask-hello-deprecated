import React, { useState } from "react";
import "../../styles/home.css";

import SAP_one from "../../img/12_bbdd-300x140.jpg";
import SAP_two from "../../img/13_BI_productos.jpg";
import SAP_three from "../../img/14_integraciones.jpg";
import SAP_four from "../../img/15_demo_PWBI.jpg";
import App from "../../img/app.png";
import Medicos from "../../img/Medicos.png";

export const Projects = () => {
  const services = [];

  const extraModules = [
    {
      id: 6,
      title: "Demo - Power BI",
      description:
        "¿No conoces Power BI? Aquí puedes ver un ejemplo de lo que podemos hacer.",
      image: SAP_four,
      link: "https://app.powerbi.com/view?r=eyJrIjoiYTAzZDQwMTUtNDU1My00MDU0LTllZmEtNjY5ZGRmMzNmNGRmIiwidCI6Ijk2MjgzZDllLTNhYjQtNDgwNy04ZTZiLWI3NmU0MzI0YWY4ZSJ9",
    },
    {
      id: 7,
      title: "Aplicación de Agendamiento Médico",
      description: "Para controlar tu agenda de Citas. Ve nuestro video.",
      image: Medicos,
      link: "#",
    },
    {
      id: 8,
      title:
        "Aplicación de Manejo de logistica, inventario, creación y seguimiento de despachos",
      description:
        "Crea y sigue despachos en tiempo real, genera PDF con código de barras y administra productos, clientes y choferes en un solo lugar.",
      image: App,
      link: "https://www.signo-app.com/",
    },
  ];

  const [hoverId, setHoverId] = useState(null);

  return (
    <section className="erp-page" style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
          color: "#36b0a1",
        }}
      >
        Algunos de Nuestros Proyectos
      </h2>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "30px",
          lineHeight: "1.6",
          fontSize: "16px",
        }}
      >
        <p style={{ textAlign: "center" }}>Proyectos que hemos trabajado</p>
      </div>

      {/* Segunda fila AHORA PRIMERO */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {extraModules.map((module) => (
          <div
            key={module.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "280px",
              padding: "15px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <a
              href={module.link}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir proyecto"
              onMouseEnter={() => setHoverId(module.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{ display: "block", position: "relative", cursor: "pointer" }}
            >
              {/* CONTENEDOR FIJO (mismo alto para 7 y 8) */}
              <div
                style={
                  module.id === 7 || module.id === 8
                    ? {
                      width: "100%",
                      height: "180px", // alto uniforme
                      borderRadius: "6px 6px 0 0",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }
                    : {
                      width: "100%",
                      height: "auto",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                }
              >
                <img
                  src={module.image}
                  alt={module.title}
                  style={
                    module.id === 7 || module.id === 8
                      ? {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        display: "block",
                      }
                      : {
                        width: "120px",
                        height: "80px",
                        objectFit: "contain",
                        display: "block",
                      }
                  }
                />
              </div>

              {/* Overlay al hover */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: module.id === 7 || module.id === 8 ? "6px 6px 0 0" : "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: hoverId === module.id ? "rgba(0,0,0,0.35)" : "transparent",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  opacity: hoverId === module.id ? 1 : 0,
                  transition: "opacity 160ms ease",
                  pointerEvents: "none",
                }}
              >
                Abrir proyecto ↗
              </div>
            </a>

            <h4 style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>
              {module.title}
            </h4>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
              {module.description}
            </p>
          </div>
        ))}
      </div>

      {/* Primera fila ahora va después */}
      <div
        className="services-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="service-box"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              width: "300px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h4 style={{ marginTop: "15px" }}>{service.title}</h4>
            <p style={{ fontSize: "15px", marginTop: "10px" }}>{service.description}</p>
          </div>
        ))}
      </div>

      <div
        className="services-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="service-box"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              width: "300px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <a href={service.link} target="_blank" rel="noopener noreferrer">
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "6px 6px 0 0",
                  display: "block",
                }}
              />
            </a>
            <h4 style={{ marginTop: "15px" }}>{service.title}</h4>
            <p style={{ fontSize: "15px", marginTop: "10px" }}>{service.description}</p>
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