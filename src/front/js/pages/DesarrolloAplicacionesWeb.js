import React, { useRef, useState } from "react";
import "../../styles/home.css";
import desarrolloWEB from "../../img/desarrolloWEB.png";
import appWeb from "../../img/appWeb.png";
import webGIF from "../../img/webGIF.gif";
import frameworks from "../../img/frameworks.jpg";
import frameworksBack from "../../img/frameworksBack.webp";
import baseDatos from "../../img/baseDatos.webp";
import tecnologiasNUBE from "../../img/tecnologiasNUBE.webp";
import lenguajesGif from "../../img/lenguajesGif.gif";

export const DesarrolloAplicacionesWeb = () => {
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
              <h1 className="hero-title">Desarrollo de Aplicaciones Web</h1>
              <p className="hero-subtitle mt-3">
                Desarrollamos aplicaciones web personalizadas que optimizan
                procesos, mejoran la experiencia del usuario y potencian la
                eficiencia de tu negocio. Nuestras soluciones están diseñadas
                para adaptarse a tus necesidades específicas, permitiendo
                escalabilidad, seguridad y un rendimiento óptimo.
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
                    ¿Qué es el Desarrollo Web y por qué es importante?
                  </h2>
                  <p>
                    El desarrollo web es el proceso de crear sitios y aplicaciones
                    accesibles a través de internet. En la era digital, las
                    empresas necesitan herramientas eficientes para mejorar sus
                    procesos, conectar con sus clientes y optimizar la gestión
                    interna. Este servicio ofrece soluciones escalables,
                    accesibles y seguras que permiten a las organizaciones
                    destacar en un mercado competitivo.
                    La importancia radica en su capacidad para transformar
                    negocios, mejorar la experiencia del usuario y proporcionar
                    una presencia online sólida. Desde sitios corporativos hasta
                    plataformas interactivas, el desarrollo web es clave para el
                    éxito empresarial.
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
          <div className="row align-items-center">
            <div className="col-md-12">
              <h2 style={{ color: "#36b0a1" }} className="text-center mb-4">
                Tipos de Aplicaciones Web Más Utilizadas:
              </h2>
            </div>

            <div className="row text-center my-5">
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-chart-line fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Análisis de Requisitos</h3>
                  <p>
                    Identificamos las necesidades del cliente y los objetivos del
                    software, asegurando una estructura eficiente, escalable y
                    adecuada a los datos.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-cogs fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Aplicaciones ERP y CRM</h3>
                  <p>
                    Soluciones para gestionar recursos humanos, inventarios y
                    relaciones con clientes, optimizando procesos empresariales.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-shopping-cart fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Plataformas de Comercio Electrónico</h3>
                  <p>
                    Impulsamos el crecimiento digital con tiendas online que
                    integran pagos y gestionan inventarios de forma eficiente.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-calendar-alt fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Sistemas de Reservas</h3>
                  <p>
                    Facilitamos reservas en línea para hoteles, restaurantes y
                    servicios, reduciendo la carga administrativa.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-chalkboard-teacher fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Aplicaciones de e-Learning</h3>
                  <p>
                    Ofrecemos plataformas educativas online con acceso a cursos y
                    material desde cualquier lugar.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-code fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Desarrollo de Backend</h3>
                  <p>
                    Construimos la lógica y estructura del software, garantizando
                    eficiencia y seguridad en los datos.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-paint-brush fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Diseño de UI/UX</h3>
                  <p>
                    Creamos experiencias atractivas y funcionales para los
                    usuarios con un diseño intuitivo.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-tools fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Mantenimiento</h3>
                  <p>
                    Ofrecemos soporte continuo para mejoras y actualizaciones del
                    software.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card p-3 border h-100">
                  <i
                    className="fas fa-tachometer-alt fa-3x"
                    style={{ color: "#36b0a1" }}
                  ></i>
                  <h3 style={{ color: "#36b0a1" }}>Optimización</h3>
                  <p>
                    Mejoramos el rendimiento y la velocidad para una experiencia
                    óptima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 ecommerce-section">
          <h2 style={{ color: "#36b0a1" }} className="text-center mb-4">
            Tecnologías Utilizadas en el Desarrollo de Aplicaciones Web
          </h2>
          <p className="text-center">
            El desarrollo de aplicaciones web involucra diversas tecnologías y
            frameworks que permiten crear soluciones eficientes y escalables. A
            continuación, exploramos las herramientas más utilizadas.
          </p>


  <div className="row align-items-stretch mb-4 g-3">
  <div className="col-md-5 d-flex">
            <div className="card p-3 border w-100 d-flex align-items-center justify-content-center bg-dark"> {/* Fondo oscuro para contraste */}
              <img
                src={lenguajesGif}
                alt="Frameworks Backend"
                className="img-fluid rounded"
                style={{
                  maxHeight: "280px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(1.05)" /* Ajuste de brillo para mejor visualización */
                }}
              />
            </div>
          </div>

          <div className="col-md-7 d-flex">
            <div className="card p-4 border w-100">
              <h3 style={{ color: "#36b0a1", marginBottom: "1.5rem" }}>Lenguajes de Programación</h3>
              <p className="mb-4">
                Utilizamos lenguajes esenciales para desarrollar soluciones robustas. Incluyen opciones versátiles para frontend, backend y análisis de datos.
              </p>
              
              <div className="backend-tech-list">
                <div className="d-flex align-items-start mb-3">
                  <div className="tech-icon me-3" style={{ color: "#68A063" }}> {/* Color Node.js */}
                    <i className="fab fa-node-js fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">JavaScript:</h5>
                    <p className="mb-0">
                      Ideal para frontend y backend con Node.js.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div className="tech-icon me-3" style={{ color: "#092E20" }}> {/* Color Django */}
                    <i className="fab fa-python fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Python:</h5>
                    <p className="mb-0">
                      Fácil de usar, ideal para IA y análisis.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                   <div className="tech-icon me-3" style={{ color: "#092E20" }}> {/* Color Django */}
                    <i className="fab fa-php fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">PHP:</h5>
                    <p className="mb-0">
                      Perfecto para gestión de bases de datos.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>












 <div className="row align-items-stretch mb-4 g-3">
  <div className="col-md-8 d-flex">
    <div className="card p-4 border w-100">
      <h3 style={{ color: "#36b0a1", marginBottom: "1.5rem" }}>Frameworks Frontend</h3>
      <p className="mb-4">
        Soluciones modernas para construir interfaces de usuario dinámicas y altamente escalables.
      </p>
      
      <div className="framework-list">
        <div className="d-flex align-items-center mb-3">
          <div className="framework-icon me-3" style={{ color: "#61DAFB" }}>
            <i className="fab fa-react fa-2x"></i>
          </div>
          <div>
            <h5 className="mb-1">React.js</h5>
            <p className="mb-0 text-muted">
              Biblioteca para interfaces dinámicas con Virtual DOM y componente reutilizables
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <div className="framework-icon me-3" style={{ color: "#DD0031" }}>
            <i className="fab fa-angular fa-2x"></i>
          </div>
          <div>
            <h5 className="mb-1">Angular</h5>
            <p className="mb-0 text-muted">
              Framework completo para aplicaciones empresariales complejas
            </p>
          </div>
        </div>

          <div className="d-flex align-items-center">
            <div className="framework-icon me-3" style={{ color: "#4FC08D" }}>
              <i className="fab fa-vuejs fa-2x"></i>
            </div>
            <div>
              <h5 className="mb-1">Vue.js</h5>
              <p className="mb-0 text-muted">
                Framework progresivo y flexible para interfaces interactivas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-4 d-flex">
      <div className="card p-3 border w-100 d-flex align-items-center justify-content-center bg-light">
        <img
          src={frameworks}
          alt="Frameworks Frontend"
          className="img-fluid rounded"
          style={{
            maxHeight: "300px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
          }}
        />
      </div>
    </div>
  </div>


        <div className="row align-items-stretch mb-4 g-3">
          <div className="col-md-5 d-flex">
            <div className="card p-3 border w-100 d-flex align-items-center justify-content-center bg-dark"> {/* Fondo oscuro para contraste */}
              <img
                src={frameworksBack}
                alt="Frameworks Backend"
                className="img-fluid rounded"
                style={{
                  maxHeight: "280px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(1.05)" /* Ajuste de brillo para mejor visualización */
                }}
              />
            </div>
          </div>

          <div className="col-md-7 d-flex">
            <div className="card p-4 border w-100">
              <h3 style={{ color: "#36b0a1", marginBottom: "1.5rem" }}>Frameworks Backend</h3>
              <p className="mb-4">
                Soluciones robustas para desarrollo server-side con alto rendimiento y escalabilidad.
              </p>
              
              <div className="backend-tech-list">
                <div className="d-flex align-items-start mb-3">
                  <div className="tech-icon me-3" style={{ color: "#68A063" }}> {/* Color Node.js */}
                    <i className="fab fa-node-js fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Node.js</h5>
                    <p className="mb-0">
                      Entorno de ejecución JavaScript rápido y escalable para operaciones I/O intensivas
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div className="tech-icon me-3" style={{ color: "#092E20" }}> {/* Color Django */}
                    <i className="fab fa-python fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Django</h5>
                    <p className="mb-0">
                      Framework Python "baterías incluidas" con énfasis en seguridad y rapidez de desarrollo
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div className="tech-icon me-3" style={{ color: "#FF2D20" }}> {/* Color Laravel */}
                    <i className="fab fa-laravel fa-2x"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Laravel</h5>
                    <p className="mb-0">
                      Framework PHP elegante con arquitectura MVC y amplio ecosistema
                    </p>
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



        </section>

        <section className="mb-5 ecommerce-section">
          <div
            className="card p-4 border"
            style={{
              backgroundColor: "#000000cc",
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
              El desarrollo de aplicaciones web se ha convertido en un pilar
              fundamental para la transformación digital de las empresas. En un
              entorno donde la rapidez, la eficiencia y la experiencia del usuario
              son determinantes, contar con soluciones web personalizadas permite
              automatizar procesos, integrar sistemas y brindar un acceso ágil y
              seguro desde cualquier dispositivo. Más allá de ser una simple
              herramienta tecnológica, una aplicación web bien diseñada representa
              una ventaja estratégica: impulsa la productividad, mejora la relación
              con los clientes y abre nuevas oportunidades de crecimiento. En
              nuestro equipo, combinamos innovación, experiencia y tecnologías
              modernas para desarrollar plataformas que no solo resuelven
              necesidades actuales, sino que también preparan a tu empresa para los
              desafíos del futuro.
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