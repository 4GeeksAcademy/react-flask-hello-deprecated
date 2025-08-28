import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/logo-blanco.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'erp' | 'dev' | null
  const [pinnedDropdown, setPinnedDropdown] = useState(null); // anclado por click en desktop
  const navRef = useRef(null);

  // ¿El dispositivo soporta hover y puntero fino? (desktop)
  const [canHover, setCanHover] = useState(
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = () => setCanHover(mq.matches);
    mq.addEventListener?.("change", handler);
    window.addEventListener("resize", handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // Al pasar a desktop, cierra todo
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
        setOpenDropdown(null);
        setPinnedDropdown(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Cerrar al hacer click fuera o con ESC
  useEffect(() => {
    const handleDocClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setPinnedDropdown(null);
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setPinnedDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);

  // Alterna un dropdown. En desktop ancla/desancla; en móvil solo abre/cierra.
  const handleToggle = (key) => {
    if (canHover) {
      // Desktop: decidir nextPin y forzar openDropdown en el mismo tick
      setPinnedDropdown((prevPin) => {
        const nextPin = prevPin === key ? null : key;
        setOpenDropdown(nextPin); // si hay pin -> abierto; si no -> cerrado
        return nextPin;
      });
    } else {
      // Móvil: solo alternar abierto/cerrado
      setOpenDropdown((prev) => (prev === key ? null : key));
    }
  };

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setPinnedDropdown(null);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Principal" ref={navRef}>
      <div className="nav-inner">

        {/* Botón hamburguesa */}
        <button
          className={`navbar-toggle ${menuOpen ? "active" : ""}`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <ul id="navbar-links" className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {/* Home */}
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeAll}>
              <i className="fas fa-home me-2" style={{ color: "#f57c0bff" }} />
              Home
            </Link>
          </li>

          {/* ERP */}
          <li
            className={`nav-item dropdown ${openDropdown === "erp" ? "open" : ""}`}
            onMouseEnter={() => {
              if (canHover && !pinnedDropdown) setOpenDropdown("erp");
            }}
            onMouseLeave={() => {
              if (canHover && !pinnedDropdown) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle"
              aria-expanded={openDropdown === "erp"}
              // En desktop anclamos en pointerdown (antes que mouseleave/click), en móvil usamos click
              onPointerDown={(e) => {
                if (canHover) {
                  e.preventDefault();
                  handleToggle("erp");
                }
              }}
              onClick={(e) => {
                if (!canHover) handleToggle("erp");
              }}
            >
              <i className="fas fa-cubes me-2" style={{ color: "#36b0a1" }} />
              ERP 
            </button>

            <ul className="dropdown-menu" role="menu">
              <li>
                <Link className="dropdown-item" to="/erpservicios-page" onClick={closeAll}>
                  <i className="fas fa-cogs me-2 text-muted" />
                  <div>
                    <div>ERP Servicios</div>
                    <small className="text-muted">Soluciones personalizadas</small>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/sapb1" onClick={closeAll}>
                  <i className="fas fa-microchip me-2 text-muted" />
                  <div>
                    <div>SAP Business One</div>
                    <small className="text-muted">Gestión integrada</small>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/bi" onClick={closeAll}>
                  <i className="fas fa-chart-line me-2 text-muted" />
                  <div>
                    <div>Business Intelligence</div>
                    <small className="text-muted">Análisis avanzado</small>
                  </div>
                </Link>
              </li>
            </ul>
          </li>

          {/* Desarrollo */}
          <li
            className={`nav-item dropdown ${openDropdown === "dev" ? "open" : ""}`}
            onMouseEnter={() => {
              if (canHover && !pinnedDropdown) setOpenDropdown("dev");
            }}
            onMouseLeave={() => {
              if (canHover && !pinnedDropdown) setOpenDropdown(null);
            }}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle"
              aria-expanded={openDropdown === "dev"}
              onPointerDown={(e) => {
                if (canHover) {
                  e.preventDefault();
                  handleToggle("dev");
                }
              }}
              onClick={(e) => {
                if (!canHover) handleToggle("dev");
              }}
            >
              <i className="fas fa-laptop-code me-2" style={{ color: "#12eb1dff" }} />
              Desarrollo
            </button>

            <ul className="dropdown-menu" role="menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/desarrollo-aplicaciones-web"
                  onClick={closeAll}
                >
                  <i className="fas fa-code me-2 text-muted" />
                  <div>
                    <div>Desarrollo Web</div>
                    <small className="text-muted">Su Sitio</small>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/apis-integraciones" onClick={closeAll}>
                  <i className="fas fa-plug me-2 text-muted" />
                  <div>
                    <div>Integraciones y APIs</div>
                    <small className="text-muted">Conectemos</small>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/tecnologias" onClick={closeAll}>
                  <i className="fas fa-microchip me-2 text-muted" />
                  <div>
                    <div>Tecnologias</div>
                    <small className="text-muted">Optimizamos</small>
                  </div>
                </Link>
              </li>
            </ul>
          </li>

          {/* eCommerce */}
          <li className="nav-item">
            <Link to="/ecommerce" className="nav-link" onClick={closeAll}>
              <i className="fas fa-shopping-cart me-2" style={{ color: "#fa0808ff" }} />
              eCommerce
            </Link>
          </li>

          {/* Proyectos */}
          <li className="nav-item">
            <Link to="/proyectos" className="nav-link" onClick={closeAll}>
              <i className="fas fa-project-diagram me-2" style={{ color: "#5a0bd8ff" }} />
              Proyectos
            </Link>
          </li>

          {/* Nosotros */}
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link" onClick={closeAll}>
              <i className="fas fa-users me-2" style={{ color: "#d4f806ff" }} />
              Nosotros
            </Link>
          </li>

          {/* Contacto */}
          <li className="nav-item contact-wrapper">
            <Link to="/contacto" className="nav-link contact-button" onClick={closeAll}>
              <i className="fas fa-paper-plane me-2" />
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};