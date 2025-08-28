import React from "react";
import "../../styles/home.css";

import SAP_one from "../../img/12_bbdd-300x140.jpg";
import SAP_two from "../../img/13_BI_productos.jpg";
import SAP_three from "../../img/14_integraciones.jpg";
import SAP_four from "../../img/15_demo_PWBI.jpg";

export const Analytics = () => {
  const services = [
    {
      id: 1,
      title: "Bases de Datos",
      description: (
        <>
          Trabajamos con distintas bases de datos tales como:
          <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "10px" }}>
            <li>SQL Server</li>
            <li>PostgreSQL</li>
            <li>HANA DB</li>
            <li>MySQL</li>
          </ul>
        </>
      ),
      image: SAP_one,
    },
    {
      id: 2,
      title: "Business Analytics",
      description: (
        <>
        
          Trabajamos con distintos productos para lograr entregar de la manera más sencilla y ágil posible los datos de su negocio:
          <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "10px" }}>
            <li>Crystal Reports</li>
            <li>Power BI</li>
            <li>Tableau</li>
            <li>Conexión Excel a BDs</li>
          </ul>
        </>
      ),
      image: SAP_two,
    },
    {
      id: 3,
      title: "Desarrollos especiales",
      description:
        "Si necesita una intranet con acceso a información clave para sus usuarios, esto lo podemos realizar.",
      image: SAP_three,
    },
  ];

  const extraModules = [
    
  ];

  return (
    <section className="erp-page" style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      
    <h2 style={{ 
          textAlign: "center", 
          fontSize: "2rem", 
          marginBottom: "30px", 
          color: "#36b0a1" 
        }}>
          Soluciones para Business Analytics
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
         <p style={{ textAlign: "justify" }}>
          Las soluciones de Business Analytics ayudan a empresas de todos los tamaños a hacer más con sus datos, 
          transformándolos en información procesable y visualizaciones fácilmente entendibles que le permitirán tomar mejores
          decisiones basadas en hechos, descubrir tendencias ocultas y mejorar rápidamente el rendimiento de su negocio.
          Consiga una rápida comprensión de todo lo que acontece en su negocio con las mejores capacidades de análisis, 
          incluida inteligencia empresarial en tiempo real, planificación y análisis.
        </p>
      </div>

      {/* Segunda fila AHORA PRIMERO */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
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
            <a href={module.link} target="_blank" rel="noopener noreferrer">
              <img
                src={module.image}
                alt={module.title}
                style={{
                  width: "130px",
                  height: "90px",
                  objectFit: "contain",
                  borderRadius: "6px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </a>
            <h4 style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>{module.title}</h4>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>{module.description}</p>
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
