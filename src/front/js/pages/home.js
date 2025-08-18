import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/home.css";
import heroImage from "../../img/fondo.jpg";
import fondop from "../../img/fondop.jpg";
import { Link } from "react-router-dom"; // Si usas React Router

export const Home = () => {
  const [errors, setErrors] = useState({});
  const form = useRef();


  return (
    <div>
      {/* HERO SECTION */}

      <div
        className="hero-container"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Digitalizamos tu visión <br /> Donde la tecnología se adapta a tu negocio.
          </h1>
          <p className="hero-subtitle">
            Software a la medida, integraciones eficientes, <br />
            consultoria en ERP, especialmente SAP Business One<br />
            Reportes y Business Intelligence<br />
            Tecnología que impulsa tu negocio al siguiente nivel
          </p>
          <button className="hero-button">
            <Link to="/contacto" className="hero-link">
              ¡Hablemos de tu proyecto! <span className="arrow"> <i className="fas fa-paper-plane me-2"></i></span>
            </Link>
          </button>
        </div>
      </div>


      {/* SERVICES SECTION */}
      <section className="services-section">
        <h2 className="section-title">¿QUÉ OFRECEMOS?</h2>
        <div className="cards-container">

          <div className="service-card">
            <div className="icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#36b0a1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="12" width="48" height="32" rx="2" ry="2" />
                <line x1="2" y1="48" x2="62" y2="48" />
                <line x1="22" y1="48" x2="22" y2="52" />
                <line x1="42" y1="48" x2="42" y2="52" />
              </svg>
            </div>
            <h3>Consultoria ERP y BI</h3>
            <p style={{ textAlign: "justify" }}>
            Bindamos apoyo en mejorar la experiencia con SAP Business One, tanto a nivel de procesos como de reporteria. Generando dashboard dinamicos,
            reportes a midida con Crystal report o escalando a Power BI una poderosa herramienta para la construccion de reportes de gestión.
            </p>
          </div>

          <div className="service-card">
            <div className="icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#36b0a1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="12" width="48" height="32" rx="2" ry="2" />
                <line x1="2" y1="48" x2="62" y2="48" />
                <line x1="22" y1="48" x2="22" y2="52" />
                <line x1="42" y1="48" x2="42" y2="52" />
              </svg>
            </div>
            <h3>Desarrollo a la medida</h3>
            <p style={{ textAlign: "justify" }}>
              Diseñamos y desarrollamos soluciones digitales personalizadas que se ajustan a las necesidades específicas de tu negocio. Utilizamos tecnología moderna, buenas prácticas y un equipo comprometido con la calidad y la innovación.
            </p>
          </div>


          <div className="service-card">
            <div className="icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#36b0a1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="8 20 32 4 56 20 56 44 32 60 8 44 8 20" />
                <line x1="32" y1="4" x2="32" y2="60" />
                <line x1="8" y1="44" x2="56" y2="44" />
              </svg>
            </div>
            <h3>Software factory</h3>
            <p style={{ textAlign: "justify" }}>
              Creamos aplicaciones escalables y robustas en la nube, pensadas para empresas que necesitan eficiencia, rendimiento y velocidad de desarrollo. Aplicamos metodologías ágiles y estándares de excelencia técnica en cada proyecto.
            </p>
          </div>
        </div>
      </section>


      <section className="what-we-do">
        <div className="what-we-do-container">
          <div className="what-we-do-image">
            <img src={fondop} alt="programming" />
          </div>
          <div className="what-we-do-text">
            <h2>¿QUÉ HACEMOS?</h2>
            <p>
              El servicio de desarrollo de software de nuestra empresa es una solución
              integral para resolver problemáticas de talento y capacidad en la construcción
              de soluciones digitales con tecnologías cloud. Nos destacamos por combinar
              experiencia técnica, buenas prácticas y un enfoque centrado en la calidad.
            </p>
            {/* Opción con React Router: */}
          <button className="hero-button">
            <Link to="/contacto" className="hero-link">
              CONTÁCTANOS <span className="arrow"> <i className="fas fa-paper-plane me-2"></i></span>
            </Link>
          </button>




          </div>
        </div>
      </section>

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

    </div>
  );
};