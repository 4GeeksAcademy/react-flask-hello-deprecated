import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logo-blanco.png";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links">

        <li className="nav-item position-relative">
          <Link
            to="/"
            className="nav-link d-flex align-items-center py-3 px-3"
            style={{
              transition: 'all 0.3s ease',
              borderRadius: '4px',
              color: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#36b0a1';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'inherit';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <i className="fas fa-home me-2" style={{ color: '#f57c0bff' }}></i> {/* Icono Home */}
            <span>Home</span>
          </Link>
        </li>


<li className="nav-item dropdown position-relative">
  <span 
    className="nav-link dropdown-toggle d-flex align-items-center py-3 px-3"
    id="erpDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '4px'
    }}
    onMouseEnter={(e) => e.currentTarget.classList.add('bg-light')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light')}
  >
    <i className="fas fa-cubes me-2" style={{ color: '#36b0a1' }}></i> {/* Icono ERP */}
    ERP
   
  </span>

  <ul 
    className="dropdown-menu shadow-lg border-0"
    aria-labelledby="erpDropdown"
    style={{
      minWidth: '220px',
      borderTop: '3px solid #36b0a1'
    }}
  >
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3"
        to="/erpservicios-page"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
        <i className="fas fa-cogs me-2 text-muted"></i> {/* Icono servicios */}
        <div>
          <div>ERP Servicios</div>
          <small className="text-muted">Soluciones personalizadas</small>
        </div>
      </Link>
    </li>
    
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3"
        to="/sapb1"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
       <i className="fas fa-microchip me-2 text-muted"></i>
        <div>
          <div>SAP Business One</div>
          <small className="text-muted">Gestión integrada</small>
        </div>
      </Link>
    </li>
    
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3"
        to="/bi"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
        <i className="fas fa-chart-line me-2 text-muted"></i> {/* Icono BI */}
        <div>
          <div>Business Intelligence</div>
          <small className="text-muted">Análisis avanzado</small>
        </div>
      </Link>
    </li>
  </ul>
</li>
<li className="nav-item dropdown position-relative">
  <span 
    className="nav-link dropdown-toggle d-flex align-items-center py-3 px-3" 
    id="developmentDropdown"
    role="button"
    data-bs-toggle="dropdown" 
    aria-expanded="false"
    style={{
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '4px'
    }}
    onMouseEnter={(e) => e.currentTarget.classList.add('bg-light')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light')}
  >
    <i className="fas fa-laptop-code me-2" style={{ color: '#12eb1dff' }}></i> {/* Nuevo icono */}
    Desarrollo

  </span>
  
  <ul 
    className="dropdown-menu shadow-lg border-0" 
    aria-labelledby="developmentDropdown"
    style={{
      minWidth: '220px',
      borderTop: '3px solid #36b0a1'
    }}
  >
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3" 
        to="/desarrollo-aplicaciones-web"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
        <i className="fas fa-code me-2 text-muted"></i>
        <div>
        <div>Desarrollo Web</div>
        <small className="text-muted">Su Sitio</small>
        </div>
      </Link>
    </li>
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3" 
        to="/apis-integraciones"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
        <i className="fas fa-plug me-2 text-muted"></i>
        <div>
        <div>Integraciones y APIs</div>
        <small className="text-muted">Conectemos</small>
        </div>
      </Link>
    </li>
    <li>
      <Link 
        className="dropdown-item d-flex align-items-center py-2 px-3" 
        to="/tecnologias"
        style={{ transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor =  '#fc8210ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
      >
        <i className="fas fa-microchip me-2 text-muted"></i>
        <div>
        <div>Tecnologias</div>
        <small className="text-muted">Optimizamos</small>
        </div>
      </Link>
    </li>
  </ul>
</li>


     <li className="nav-item position-relative">
        <Link
          to="/ecommerce"
          className="nav-link d-flex align-items-center py-3 px-3"
          style={{
            transition: 'all 0.3s ease',
            borderRadius: '4px',
            color: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#36b0a1';
            e.currentTarget.style.backgroundColor = '#f8f9fa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'inherit';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <i className="fas fa-shopping-cart me-2"style={{ color: '#fa0808ff' }}></i> {/* Icono eCommerce */}
          <span>eCommerce</span>
        
        </Link>
      </li>


          <li className="nav-item position-relative">
            <Link
              to="/proyectos"
              className="nav-link d-flex align-items-center py-3 px-3"
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '4px',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#36b0a1';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="fas fa-project-diagram me-2"style={{ color: '#5a0bd8ff' }}></i> {/* Icono proyectos */}
              <span>Proyectos</span>
            </Link>
          </li>

          <li className="nav-item position-relative">
            <Link
              to="/aboutus"
              className="nav-link d-flex align-items-center py-3 px-3"
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '4px',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#36b0a1';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className="fas fa-users me-2" style={{ color: '#d4f806ff' }}></i> {/* Icono nosotros */}
              <span>Nosotros</span>
            </Link>
          </li>

          <li className="nav-item position-relative ms-lg-2"> {/* Margen izquierdo en desktop */}
            <Link
              to="/contacto"
              className="nav-link d-flex align-items-center py-2 px-3 contact-button"
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '3px',
                backgroundColor: '#36b0a1',
                color: 'white',
                fontWeight: '200'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2c8b7d';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#36b0a1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-paper-plane me-2"></i> {/* Icono contacto */}
              <span>Contacto</span>
            </Link>
          </li>







      </ul>
    </nav>
  );
};
