import React, { useRef, useState } from "react";
import "../../styles/home.css";
import desarrolloWEB from "../../img/desarrolloWEB.png";
import webGIF from "../../img/webGIF.gif";
import baseDatos from "../../img/baseDatos.webp";
import tecnologiasNUBE from "../../img/tecnologiasNUBE.webp";
import SCRUM from "../../img/SCRUM.jpg"; // Asegúrate de que el archivo SCRUM.jpg esté en la carpeta img

export const Tecnologias = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
 
  return (
    <div className="position-relative">
      {/* Fondo del título principal */}

      <div
        className="hero-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          backgroundImage: `url(${desarrolloWEB})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Contenido principal con corrección de centrado */}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Hero Section - Ahora completamente centrado */}

        <section 
          className="hero-content mb-5" 
          style={{ 
            paddingTop: "18vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18vh 20px 0"
          }}
        >
          <div className="row justify-content-center" style={{ width: "100%",textAlign: "justify"  }}>
            <div className="col-lg-8">
              <h1 className="hero-title">Tecnologías Cloud</h1>
              <p className="hero-subtitle mt-3">
                 Nos especializamos en soluciones basadas en la nube para maximizar
                la escalabilidad y la seguridad de tus proyectos.
              </p>
            </div>
          </div>
        </section>

        {/* Resto del componente permanece igual */}

        <section className="ecommerce-section" style={{ paddingTop: "53vh" }}>
          <div className="row align-items-stretch">
            <div className="col-md-6 d-flex">
              <div className="card p-4 d-flex" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <div className="d-flex flex-column justify-content-center">
                  <h2 style={{ color: "#36b0a1", textAlign: "justify" }} className="text-center mb-4">
                    ¿Qué es el cloud?
                  </h2>
                  <p>
                    <ul>
<li>Servicios bajo demanda: El cloud (nube) es un conjunto de servicios informáticos (almacenamiento, procesamiento, redes) accesibles a través de Internet.
</li>
<li>Sin infraestructura local: Elimina la necesidad de servidores físicos propios, ya que los recursos se alojan en centros de datos remotos.
</li>
<li>Escalabilidad flexible: Permite aumentar o reducir recursos según necesidad, pagando solo por lo que se usa.
</li>
<li>Acceso global: Los datos y aplicaciones están disponibles desde cualquier lugar con conexión a Internet.
</li>
<li>Tipos principales: Incluye modelos como IaaS (infraestructura), PaaS (plataforma) y SaaS (software, como Gmail o Dropbox).
</li>                </ul>
                </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card p-4 d-flex align-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <img
                  src={webGIF}
                  alt="Desarrollo Web"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </section>

       <section className="mb-5 ecommerce-section">
        

<div className="row align-items-stretch mb-4 g-3">
  <div className="col-xl-3 col-lg-4 col-md-5 d-flex"> {/* Columnas responsivas */}
    <div className="card border-0 shadow-sm w-100" style={{ 
      borderRadius: "12px",
      backgroundColor: "#f8f9fa" /* Fondo claro para contraste */
    }}>
      <div className="card-body d-flex align-items-center justify-content-center p-4">
        <img
          src={tecnologiasNUBE}
          alt="Tecnologías en la Nube"
          className="img-fluid"
          style={{
            maxHeight: "220px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
          }}
        />
      </div>
    </div>
  </div>

  <div className="col-xl-9 col-lg-8 col-md-7 d-flex">
    <div className="card border-0 shadow-sm w-100" style={{ borderRadius: "12px" }}>
      <div className="card-body p-4">
        <h3 style={{ 
          color: "#36b0a1", 
          fontSize: "1.8rem",
          marginBottom: "1.5rem"
        }}>
          Tecnologías en la Nube
        </h3>
        
        <p className="lead mb-4" style={{ fontSize: "1.1rem" }}>
          Plataformas escalables para infraestructura, almacenamiento y servicios gestionados
        </p>

        <div className="cloud-tech-grid">
          <div className="row g-3">
            {/* AWS */}
            <div className="col-md-4">
              <div className="d-flex align-items-start h-100 p-3" style={{
                backgroundColor: "#f1f8fe",
                borderRadius: "8px"
              }}>
                <div className="me-3">
                  <i className="fab fa-aws fa-2x" style={{ color: "#FF9900" }}></i>
                </div>
                <div>
                  <h5 style={{ color: "#232F3E" }}>Amazon Web Services</h5>
                  <p className="small mb-0">
                    Infraestructura escalable con 200+ servicios cloud
                  </p>
                </div>
              </div>
            </div>

            {/* Google Cloud */}
            <div className="col-md-4">
              <div className="d-flex align-items-start h-100 p-3" style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
              }}>
                <div className="me-3">
                  <i className="fab fa-google fa-2x" style={{ color: "#4285F4" }}></i>
                </div>
                <div>
                  <h5 style={{ color: "#34A853" }}>Google Cloud</h5>
                  <p className="small mb-0">
                    Plataforma de alto rendimiento con IA integrada
                  </p>
                </div>
              </div>
            </div>

            {/* Azure */}
            <div className="col-md-4">
              <div className="d-flex align-items-start h-100 p-3" style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "8px"
              }}>
                <div className="me-3">
                  <i className="fab fa-microsoft fa-2x" style={{ color: "#0078D4" }}></i>
                </div>
                <div>
                  <h5 style={{ color: "#5C2D91" }}>Microsoft Azure</h5>
                  <p className="small mb-0">
                    Soluciones empresariales con integración Microsoft
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</div>

<div className="row align-items-stretch mb-4 g-3">
  <div className="col-lg-8 d-flex"> {/* Cambiado a col-lg para mejor responsividad */}
    <div className="card p-4 border-0 shadow-sm w-100" style={{ borderRadius: "12px" }}> {/* Estilo moderno */}
      <h3 style={{ color: "#36b0a1", fontSize: "1.8rem", marginBottom: "1.2rem" }}>Bases de Datos</h3> {/* Tamaño de fuente aumentado */}
      <p className="lead mb-4" style={{ fontSize: "1.1rem" }}> {/* Texto introductorio destacado */}
        Sistemas avanzados para gestión eficiente y segura de datos
      </p>
      
      <div className="database-items">
        <div className="d-flex align-items-start mb-3">
          <div className="me-3">
            <div style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <i className="fas fa-database text-primary"></i> {/* Icono MySQL */}
            </div>
          </div>
          <div>
            <h5 style={{ color: "#00758F", marginBottom: "0.3rem" }}>MySQL</h5> {/* Color corporativo */}
            <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
              Sistema relacional open-source ideal para aplicaciones web tradicionales
            </p>
          </div>
        </div>

        <div className="d-flex align-items-start mb-3">
          <div className="me-3">
            <div style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <i className="fas fa-server text-info"></i> {/* Icono PostgreSQL */}
            </div>
          </div>
          <div>
            <h5 style={{ color: "#336791", marginBottom: "0.3rem" }}>PostgreSQL</h5>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
              Base de datos avanzada con soporte para JSON y estructuras complejas
            </p>
          </div>
        </div>

        <div className="d-flex align-items-start">
          <div className="me-3">
            <div style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <i className="fas fa-leaf text-success"></i> {/* Icono MongoDB */}
            </div>
          </div>
          <div>
            <h5 style={{ color: "#13AA52", marginBottom: "0.3rem" }}>MongoDB</h5>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
              Base de datos NoSQL flexible para big data y aplicaciones modernas
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-lg-4 d-flex"> {/* Cambiado a col-lg */}
    <div className="card border-0 shadow-sm w-100" style={{ 
      borderRadius: "12px",
      overflow: "hidden" /* Para bordes redondeados en imagen */
    }}>
      <img
        src={baseDatos}
        alt="Bases de Datos"
        className="img-fluid h-100 w-100" /* Ocupa todo el espacio */
        style={{ 
          objectFit: "cover",
          minHeight: "100%",
          maxHeight: "350px" /* Altura máxima controlada */
        }}
      />
    </div>
  </div>
</div>



</section>


 {/* Sección de Metodología Agile (SCRUM) con imagen */}
      <section className="mb-5 ecommerce-section">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="card p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
              <h2 style={{ color: "#36b0a1" }} className="text-center mb-4">
                Metodología Agile (SCRUM)
              </h2>
              <p>
                Scrum es un proceso en el que se aplican de manera regular un conjunto
                de buenas prácticas para trabajar colaborativamente, en equipo, y
                obtener el mejor resultado posible de un proyecto:
              </p>
              <div className="mt-4 text-center">
                <img
                  src={SCRUM}
                  alt="Metodología Agile (SCRUM)"
                  className="img-fluid rounded"
                  style={{ maxWidth: "90%", maxHeight: "600px", margin: "0 auto" }}
                />
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