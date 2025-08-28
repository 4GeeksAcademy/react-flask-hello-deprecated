import React, { useRef, useState } from "react";
import "../../styles/home.css";
import APIs from "../../img/APIs.png";
import apiGif from "../../img/apiGif.gif";
import AiChatGif from "../../img/AiChatGif.gif";
import ProtocolosGif from "../../img/ProtocolosGif.gif";
import lenguajesGif from "../../img/lenguajesGif.gif";
import BDGif from "../../img/BD-Gif.gif";
import seguridadGif from "../../img/seguridadGif.gif";
import cloud from "../../img/cloud.gif";


export const ApisIntegraciones = () => {
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
          backgroundImage: `url(${APIs})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: 0,
          paddingTop: 0,
        }}
      ></div>

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
          <div className="row justify-content-center" style={{ width: "100%" ,textAlign: "justify" }}>
            <div className="col-lg-8">
              <h1 className="hero-title">Desarrollo de APIs e Integraciones</h1>
              <p className="hero-subtitle mt-3">
                Conectamos sistemas, automatizamos procesos y mejoramos la eficiencia operativa de tu empresa a través de APIs seguras y escalables.
              </p>

            </div>
          </div>
        </section>

        {/* Sección ¿Qué es el Desarrollo de APIs? - Ahora centrada */}


 <section className="ecommerce-section" style={{ paddingTop: "60vh" }}>
          <div className="row align-items-stretch">
            <div className="col-md-6 d-flex">
              <div className="card p-4 d-flex" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <div className="d-flex flex-column justify-content-center">
                  <h2 style={{ color: "#36b0a1", textAlign: "justify" }} className="text-center mb-4">
                    ¿Qué es el Desarrollo de APIs e Integraciones?
                  </h2>
                  <p>
                   Las APIs (Application Programming Interfaces) son interfaces
                  que permiten que diferentes aplicaciones y sistemas se
                  comuniquen entre sí. Funcionan como «puentes digitales» que
                  permiten intercambiar datos y ejecutar funciones sin necesidad
                  de intervención manual.
                  Por otro lado, las integraciones hacen posible que los
                  sistemas trabajen en conjunto de manera eficiente. Por
                  ejemplo, una empresa que usa un software de facturación, un
                  CRM y una plataforma de e-commerce puede integrar estos
                  sistemas mediante APIs para que compartan información en
                  tiempo real.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card p-4 d-flex align-items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <img
                  src={apiGif}
                  alt="API e Integraciones"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección del proceso de desarrollo - Ahora centrada */}
    <section className="mb-5 ecommerce-section">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h3 style={{ color: "#36b0a1" }} className="text-center mb-4">
                El proceso de desarrollo de APIs e integraciones incluye varias
                etapas:
              </h3>
            </div>
            <div className="row text-center my-4">
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-solid fa-book fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>
                    Implementación y documentación:
                  </h3>
                  <p>
                    Se lanza la API y se proporciona documentación clara para
                    su uso.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-tools fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Mantenimiento y optimización:</h3>
                  <p>
                    Se monitorea el rendimiento y se realizan mejoras continuas.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-search fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Análisis de necesidades:</h3>
                  <p>
                    Se identifican los sistemas que necesitan comunicarse y los
                    datos que deben compartirse.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-6">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-code fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Diseño y desarrollo de la API:</h3>
                  <p>
                    Se crea una API segura, escalable y optimizada para el
                    rendimiento.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-6">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-shield-alt fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>
                    Pruebas de seguridad y compatibilidad:
                  </h3>
                  <p>Se validan la integridad y seguridad de los datos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Beneficios - Ahora centrada */}
         <section className="mb-5 ecommerce-section">
          <h2 style={{ color: "#36b0a1" }} className="text-center mb-4">
            Beneficios del Desarrollo de APIs para Empresas
          </h2>
          <p>
            Contar con APIs e integraciones bien diseñadas puede transformar la
            operatividad de una empresa, mejorando la eficiencia y reduciendo
            costos. Algunos de los beneficios más importantes incluyen:
          </p>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-robot fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>Automatización de Procesos:</h3>
                <p>
                  Las APIs permiten que los sistemas se comuniquen sin
                  intervención manual, reduciendo errores y acelerando flujos
                  de trabajo.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-users fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>
                  Mejora en la Experiencia del Cliente:
                </h3>
                <p>
                  Las integraciones ofrecen servicios rápidos y personalizados,
                  como pagos en segundos en e-commerce.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-money-bill-wave fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>Reducción de Costos Operativos:</h3>
                <p>
                  La automatización minimiza trabajo manual, optimizando
                  recursos.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-chart-line fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>Escalabilidad y Flexibilidad:</h3>
                <p>
                  Permite crecer sin restricciones, agregando funcionalidades
                  y plataformas.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-shield-alt fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>Seguridad y Control de Datos:</h3>
                <p>
                  Incluye autenticación, cifrado y control de accesos para
                  proteger información.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card p-3 border h-100">
                <i
                  className="fas fa-plug fa-3x"
                  style={{ color: "#36b0a1" }}
                ></i>
                <h3 style={{ color: "#36b0a1" }}>
                  Integración con Software Externo:
                </h3>
                <p>
                  Conecta con CRM, ERP, pasarelas de pago y más para un flujo
                  eficiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Tecnologías - Ahora centrada */}
         <section className="mb-5 ecommerce-section">
          <h2 style={{ color: "#36b0a1" }} className="text-center mb-4">
            Tecnologías Utilizadas en el Desarrollo de APIs
          </h2>
          <p>
            El desarrollo de APIs requiere el uso de tecnologías avanzadas para
            garantizar rendimiento, seguridad y escalabilidad. Algunas de las
            más utilizadas incluyen:
          </p>

   
   
     <div className="row align-items-stretch mb-4 g-3"> {/* Added g-3 for consistent gutter */}
          <div className="col-md-5 d-flex">
            <div className="card p-3 border w-100 d-flex align-items-center justify-content-center"> 
              <img
                src={ProtocolosGif}
                alt="Lenguajes de Programación"
                className="img-fluid rounded"
                style={{
                  maxHeight: "250px",
                  width: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>
        <div className="col-md-7 d-flex">
          <div className="card p-4 border w-100">
            <h3 style={{ color: "#36b0a1", marginBottom: "1rem" }}>Protocolos de Comunicación</h3>
            <div className="database-content">
              <div className="d-flex mb-3"> {/* Flex container for icon + text */}
                <div className="me-3" style={{ color: "#36b0a1" }}>
                 <i className="fas fa-bolt fa-lg"></i> {/* Realtime icon */}
                </div>
                <p className="mb-0">
                  <strong>REST (Representational State Transfer):</strong> Es el estándar más utilizado en APIs, basado en HTTP.
                </p>
              </div>
              <div className="d-flex mb-3">
                <div className="me-3" style={{ color: "#36b0a1" }}>
                  <i className="fas fa-bolt fa-lg"></i> {/* Realtime icon */}
                </div>
                <p className="mb-0">
                  <strong>GraphQL:</strong>Permite consultas más flexibles y optimizadas en comparación con REST.
                </p>
              </div>
              <div className="d-flex">
                <div className="me-3" style={{ color: "#36b0a1" }}>
                  <i className="fas fa-bolt fa-lg"></i> {/* Realtime icon */}
                </div>
                <p className="mb-0">
                  <strong>SOAP (Simple Object Access Protocol): </strong> SOAP (Simple Object Access Protocol): 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="row align-items-stretch mb-4 g-3">
        <div className="col-md-8 d-flex">
          <div className="card p-4 border w-100">
            <h3 style={{ color: "#36b0a1", marginBottom: "1.5rem" }}>Lenguajes de Programación</h3>
            
            <div className="tech-items">
              <div className="d-flex align-items-start mb-3">
                <div className="tech-icon me-3" style={{ color: "#f0db4f" }}>
                  <i className="fab fa-js-square fa-2x"></i> {/* JS icon */}
                </div>
                <div>
                  <h5 className="mb-1">JavaScript (Node.js)</h5>
                  <p className="mb-0">
                    Ideal para desarrollo backend y APIs escalables con ecosistema amplio.
                  </p>
                </div>
              </div>

            <div className="d-flex align-items-start mb-3">
              <div className="tech-icon me-3" style={{ color: "#3776ab" }}>
                <i className="fab fa-python fa-2x"></i> {/* Python icon */}
              </div>
              <div>
                <h5 className="mb-1">Python (Flask, Django)</h5>
                <p className="mb-0">
                  Popular en aplicaciones empresariales y análisis de datos.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <div className="tech-icon me-3" style={{ color: "#5382a1" }}>
                <i className="fab fa-java fa-2x"></i> {/* Java icon */}
              </div>
              <div>
                <h5 className="mb-1">Java y C#</h5>
                <p className="mb-0">
                  Ampliamente utilizados en entornos corporativos y software empresarial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4 d-flex">
        <div className="card p-3 border w-100 d-flex align-items-center justify-content-center">
          <img
            src={lenguajesGif}
            alt="Lenguajes de Programación"
            className="img-fluid rounded"
            style={{
              maxHeight: "280px",
              width: "auto",
              objectFit: "contain"
            }}
          />
        </div>
      </div>
    </div>

        <div className="row align-items-stretch mb-4 g-3"> {/* Added g-3 for consistent gutter */}
          <div className="col-md-5 d-flex">
            <div className="card p-3 border w-100 d-flex align-items-center justify-content-center"> 
              <img
                src={BDGif}
                alt="Bases de Datos"
                className="img-fluid rounded"
                style={{
                  maxHeight: "250px",
                  width: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>
        <div className="col-md-7 d-flex">
          <div className="card p-4 border w-100">
            <h3 style={{ color: "#36b0a1", marginBottom: "1rem" }}>Bases de Datos</h3>
            <div className="database-content">
              <div className="d-flex mb-3"> {/* Flex container for icon + text */}
                <div className="me-3" style={{ color: "#36b0a1" }}>
                  <i className="fas fa-database fa-lg"></i> {/* Database icon */}
                </div>
                <p className="mb-0">
                  <strong>PostgreSQL y MySQL:</strong> Opciones relacionales para almacenamiento
                  de datos estructurados.
                </p>
              </div>
              <div className="d-flex mb-3">
                <div className="me-3" style={{ color: "#36b0a1" }}>
                  <i className="fas fa-server fa-lg"></i> {/* Server icon */}
                </div>
                <p className="mb-0">
                  <strong>MongoDB:</strong> Base de datos NoSQL flexible y escalable.
                </p>
              </div>
              <div className="d-flex">
                <div className="me-3" style={{ color: "#36b0a1" }}>
                  <i className="fas fa-bolt fa-lg"></i> {/* Realtime icon */}
                </div>
                <p className="mb-0">
                  <strong>Firebase:</strong> Base de datos en tiempo real para
                  aplicaciones móviles y web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       





          
          <div className="row align-items-stretch mb-4"> {/* Cambiado a align-items-stretch */}

<div className="col-md-8 d-flex">
  <div className="card p-4 border w-100">
    <h3 style={{ color: "#36b0a1", marginBottom: "1.5rem" }}>
      Herramientas de Seguridad y Autenticación
    </h3>
    
    <div className="tech-items">
      <div className="d-flex align-items-start mb-3">
        <div className="tech-icon me-3" style={{ color: "#eb5424" }}>
          <i className="fas fa-user-shield fa-2x"></i> {/* OAuth icon */}
        </div>
        <div>
          <h5 className="mb-1">OAuth 2.0</h5>
          <p className="mb-0">
            Protocolo de autorización seguro para compartir datos.
          </p>
        </div>
      </div>

      <div className="d-flex align-items-start mb-3">
        <div className="tech-icon me-3" style={{ color: "#63a4ff" }}>
          <i className="fas fa-key fa-2x"></i> {/* JWT icon */}
        </div>
        <div>
          <h5 className="mb-1">JWT (JSON Web Tokens)</h5>
          <p className="mb-0">
            Sistema de autenticación segura para APIs.
          </p>
        </div>
      </div>

      <div className="d-flex align-items-start">
        <div className="tech-icon me-3" style={{ color: "#3c78d8" }}>
          <i className="fas fa-lock fa-2x"></i> {/* SSL/TLS icon */}
        </div>
        <div>
          <h5 className="mb-1">SSL/TLS</h5>
          <p className="mb-0">
            Cifrado de datos en tránsito para proteger la comunicación.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

          <div className="col-md-4 d-flex">
            <div className="card p-4 border w-100 d-flex flex-column"> {/* Flex column para la imagen */}
              <img
                src={seguridadGif}
                alt="Seguridad y Autenticación"
                className="img-fluid rounded mt-auto mb-auto" /* Centrado vertical */
                style={{ 
                  maxHeight: "100%",
                  width: "auto",
                  objectFit: "contain" /* Mantiene relación de aspecto */
                }}
              />
            </div>
          </div>
        </div>







   <div className="row align-items-stretch mb-4 g-3">
  {/* Columna de imagen (30%) */}
  <div className="col-md-4 d-flex">
    <div className="card p-3 border-0 shadow-sm w-100" style={{ 
      borderRadius: "12px",
      backgroundColor: "#f8f9fa"
    }}>
      <div className="card-body d-flex align-items-center justify-content-center">
        <img
          src={cloud}
          alt="Cloud Computing"
          className="img-fluid rounded"
          style={{
            maxHeight: "220px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
          }}
        />
      </div>
    </div>
  </div>

  {/* Columna de contenido (70%) */}
  <div className="col-md-8 d-flex">
    <div className="card p-4 border-0 shadow-sm w-100" style={{ borderRadius: "12px" }}>
      <h3 style={{ 
        color: "#36b0a1",
        fontSize: "1.8rem",
        marginBottom: "1.5rem"
      }}>
        Infraestructura en la Nube
      </h3>
      
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
                    Ofrece API Gateway, Lambda, bases de datos escalables y más de 200 servicios cloud.
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
                    Proporciona herramientas para desarrollo, implementación de APIs e integración con IA.
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
                    Plataforma con soluciones empresariales avanzadas y perfecta integración con Microsoft 365.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>





    </div>
  </div>
</div>

<style>{`
  .bg-aws { background-color: #232F3E; }
  .bg-gcp { background-color: #4285F4; }
  .bg-azure { background-color: #0078D4; }
`}</style>


        </section>

        {/* Sección de Conclusión - Ahora centrada */}
      <section className="mb-5 ecommerce-section">
        <div
          className="card p-4 border"
          style={{
            backgroundColor: "#000000cc", // fondo oscuro con opacidad
            backgroundSize: "cover",
            color: "white",
            width: "100%",
            height: "auto",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "#36b0a1",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Conclusión
          </h2>

          <p
            style={{
              textAlign: "justify",
              maxWidth: "800px",
              fontSize: "18px",
              lineHeight: "1.6",
              padding: "0 10px",
              color: "white",
            }}
          >
             
              El desarrollo de APIs e integraciones es fundamental para cualquier
              empresa que busque optimizar procesos, mejorar la experiencia del
              cliente y aumentar la eficiencia operativa. Al conectar sistemas,
              automatizar tareas y garantizar la seguridad de los datos, las
              APIs permiten a las empresas crecer y adaptarse a las nuevas
              exigencias del mercado.
            Si deseas transformar tu empresa con soluciones tecnológicas
            avanzadas, un equipo experto en desarrollo de APIs puede ayudarte
              a diseñar e implementar integraciones eficientes y seguras.

              ¡Contáctanos hoy y descubre cómo las APIs pueden impulsar tu
              negocio al siguiente nivel!

          </p>
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