import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/home.css";
import heroImage from "../../img/ecommerce.png"; // Imagen de fondo como en Home.js
import cohete from "../../img/cohete.png"; // Imagen para "Laptop con Cohete"

export const Ecommerce = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const form = useRef();
  const [errors, setErrors] = useState({});


  return (
    <div className="position-relative">
      {/* HERO SECTION - Fondo completo debajo del navbar */}
      <div
        className="hero-container"
        style={{
          backgroundImage: `url(${heroImage})`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <div className="hero-content mb-5" style={{ paddingTop: "25vh" }}>
          <h1 className="hero-title">
            Desarrollo de Ecommerce Personalizado
            <br /> Soluciones a tu Medida
          </h1>
          <p className="hero-subtitle">
            Impulsa tu negocio con tecnología adaptada a tus necesidades.
          </p>

        </div>
      </div>

      {/* Contenido principal encima del hero */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "100vh" }}>
        <section className="mb-5 ecommerce-section">
          <h2 className="text-center" style={{ color: '#36b0a1' }}>
            Características Diferenciales
          </h2>
          <p className="text-center" style={{ color: '#555' }}>
            Soluciones que Entregamos: Habilitamos interacciones B2B y B2C,
            optimizando operaciones internas con software personalizado.
          </p>
          <div className="row text-center mt-4">
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-cloud fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Arquitectura MACH: Microservicios y Cloud-Native</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-cogs fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Integración de sistemas empresariales</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-user fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Experiencia de Usuario Excepcional</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-mobile-alt fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Diseño responsivo para múltiples dispositivos</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-paint-brush fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Interfaces elegantes y funcionales</p>
              </div>
            </div>
          </div>
          <div className="row text-center mt-4">
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-layer-group fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Frameworks modernos que garantizan escalabilidad</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-tools fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Soluciones 100% personalizadas</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-shopping-cart fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Creamos tiendas online que conectan y sorprenden</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-user-check fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Procesos de compra centrados en el usuario</p>
              </div>
            </div>
            <div className="col-md-2 mb-3 me-3">
              <div className="card h-100 bg-light p-3" style={{ minWidth: "150px" }}>
                <i className="fas fa-tachometer-alt fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <p style={{ color: '#555' }}>Rendimiento óptimo y velocidad de carga</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 ecommerce-section">
          <h2 className="text-center" style={{ color: '#36b0a1' }}>
            Servicios de Desarrollo Ecommerce que Transforman tu Negocio
          </h2>
          <div className="row text-center mt-4">
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-desktop fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Frontend Personalizado</h3>
                <p style={{ color: '#555' }}>
                  Interfaces únicas y optimizadas para una experiencia de usuario excepcional.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-paint-brush fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Diseño de Marca</h3>
                <p style={{ color: '#555' }}>
                  Diseño que refleja y refuerza la identidad de tu marca, asegurando coherencia.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-sitemap fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Interfaces Intuitivas</h3>
                <p style={{ color: '#555' }}>
                  Interfaces de usuario claras y fáciles de usar, enfocadas en eficiencia.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-arrows-alt fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Navegación Fluida</h3>
                <p style={{ color: '#555' }}>
                  Navegación ágil y sin interrupciones para una experiencia óptima.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-server fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Backend Robusto</h3>
                <p style={{ color: '#555' }}>
                  Arquitectura sólida y escalable para rendimiento y seguridad.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-boxes fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Gestión de Inventario</h3>
                <p style={{ color: '#555' }}>
                  Control eficiente y en tiempo real de tu stock para optimizar operaciones.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-credit-card fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Pasarelas de Pago</h3>
                <p style={{ color: '#555' }}>
                  Integración fluida con pasarelas de pago, garantizando transacciones seguras.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Sistemas Seguros</h3>
                <p style={{ color: '#555' }}>
                  Sistemas de pago seguros que protegen transacciones y confianza.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 bg-light p-3">
                <i className="fas fa-truck fa-3x mb-3" style={{ color: '#36b0a1' }}></i>
                <h3 style={{ color: '#36b0a1' }}>Gestión de Pedidos</h3>
                <p style={{ color: '#555' }}>
                  Módulos que optimizan la gestión y entrega de pedidos de forma eficiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 text-center ecommerce-section">
          <h2 style={{ color: '#36b0a1' }} className="mb-4">Planes Web</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">

            <div className="card h-100 shadow-sm border-primary">
                <div className="card-body d-flex flex-column">
                  <h3 style={{ color: '#001c30' }}>Started</h3>
                  <a
                    href="https://wa.me/64221031551?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mb-3"
                    style={{ backgroundColor: '#36b0a1', borderColor: '#36b0a1' }}
                  >
                    COTIZAR
                  </a>
                  <ul className="list-unstyled text-start flex-grow-1">
                    <li style={{ color: '#555' }}>✔ Web autoadministrable</li>
                    <li style={{ color: '#555' }}>✔ 1 Banner slider</li>
                    <li style={{ color: '#555' }}>✔ 4 Cantidad de páginas</li>
                    <li style={{ color: '#555' }}>✔ Multidispositivo</li>
                    <li style={{ color: '#555' }}>✔ Certificado SSL</li>
                    <li style={{ color: '#555' }}>✔ Capacitación</li>
                    <li style={{ color: '#555' }}>✘ Integración medios de pago</li>
                    <li style={{ color: '#555' }}>✘ Carga de productos</li>
                    <li style={{ color: '#555' }}>✘ Blog</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body d-flex flex-column">
                  <h3 style={{ color: '#001c30' }}>ECommerce</h3>
                 

                  <a
                    href="https://wa.me/64221031551?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mb-3"
                    style={{ backgroundColor: '#36b0a1', borderColor: '#36b0a1' }}
                  >
                    COTIZAR
                  </a>
                  <ul className="list-unstyled text-start flex-grow-1">
                    <li style={{ color: '#555' }}>✔ Web autoadministrable</li>
                    <li style={{ color: '#555' }}>✔ 4 Banner slider</li>
                    <li style={{ color: '#555' }}>✔ 7 Cantidad de páginas</li>
                    <li style={{ color: '#555' }}>✔ Multidispositivo</li>
                    <li style={{ color: '#555' }}>✔ Certificado SSL</li>
                    <li style={{ color: '#555' }}>✔ Integración medios de pago</li>
                    <li style={{ color: '#555' }}>✔ Capacitación</li>
                    <li style={{ color: '#555' }}>✔ 40 Carga de productos</li>
                    <li style={{ color: '#555' }}>✔ Blog</li>
                    <li style={{ color: '#555' }}>✔ Chat vía WhatsApp</li>
                    <li style={{ color: '#555' }}>✔ Integración Facebook Pixel</li>
                    <li style={{ color: '#555' }}>✔ Filtro de productos</li>
                    <li style={{ color: '#555' }}>✔ Carro de compras</li>
                    <li style={{ color: '#555' }}>✔ Carro de compras abandonado</li>
                    <li style={{ color: '#555' }}>✔ Integración Google Analytics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
                <div className="card-body">
                  <h3 style={{ color: '#001c30' }}>A Medida</h3>
                  <p className="lead text-muted" style={{ color: '#555' }}>PARA EMPRESAS</p>
                  <a
                    href="https://wa.me/64221031551?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success mb-3"
                     style={{ backgroundColor: '#36b0a1', borderColor: '#36b0a1' }}
                  >
                    CONTÁCTANOS
                  </a>
                  <ul className="list-unstyled text-start">
                    <li style={{ color: '#555' }}>✔ Previo levantamiento</li>
                  </ul>
                </div>
              </div>
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
    </div>
  );
};