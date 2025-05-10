import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../component/leftMenuParent/Avatar.jsx";
import logo from "../../img/logo-blanco.png";
import defaultAvatar from "../../img/avatar-de-perfil.png";
import styles from "../../styles/Navbar.module.css";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { token, unreadCount, role, personalInfo, profesorPersonalInfo } = store;

  useEffect(() => {
    actions.getMessages();
  }, []);

  const handleLogout = () => {
    actions.handleLogout();
  };

  const handleMessaging = () => {
    const dashboardPath = role === "admin" ? "/dashboard/admin" :
      role === "docente" ? "/dashboard/teacher" :
        role === "representante" ? "/dashboard/parent" :
          "/home";

    if (window.location.pathname !== dashboardPath) {
      navigate(dashboardPath);
    }
    actions.toggleChat();
  };

  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      handleMessaging();
    }
  };

  return (
    <Navbar expand="lg" className={`${styles["navbar-custom"]} navbar-dark fixed-top`}>
      <Navbar.Brand as={Link} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px" }}
          className="ms-5 ps-3"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={`${styles["navbar-toggler"]}`} />
      <Navbar.Collapse id="basic-navbar-nav" className={`${styles.collapseCustom}`}>
        {token && role ? (
          <Nav className="ms-auto text-center align-items-center">
            <Nav.Link onClick={handleNotificationClick}>
              <div className={`${styles["campana-container"]}`}>
                <i className={`fas fa-bell ${store.unreadCount > 0 ? styles.campanaConNotificacion : styles.campana}`}></i>
                {unreadCount > 0 && (
                  <span className={styles.notificacionDot}></span>
                )}
              </div>
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className={`${styles.Toggle}`}>
                <Avatar
                  src={personalInfo?.foto || profesorPersonalInfo?.foto || defaultAvatar}
                  alt="User Avatar"
                  size={40}
                  className={`${styles["navbar-avatar"]}`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className={`${styles.ItemAvatar}`}>
                <Dropdown.Item
                  onClick={actions.personalInfo} //seguir con esta función
                  className={`${styles.ItemAvatarButtom} `}
                  as={Link} to={
                    role === "admin" ? "/dashboard/admin" :
                      role === "docente" ? "/dashboard/teacher" :
                        role === "representante" ? "/dashboard/parent" :
                          "/unauthorized"
                  }
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={
                  role === "admin" ? "/dashboard/admin/profile" :
                    role === "docente" ? "/dashboard/teacher/profile" :
                      role === "representante" ? "/dashboard/parent/profile" :
                        "/profile"
                } className={`${styles.ItemAvatarButtom}`}>
                  Perfil
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    // Ejecutar toggleChat antes de la navegación
                    actions.toggleChat();

                    // Redirigir al dashboard correspondiente, pasando el estado para hacer scroll
                    const route =
                      role === "admin" ? "/dashboard/admin" :
                        role === "docente" ? "/dashboard/teacher" :
                          role === "representante" ? "/dashboard/parent" :
                            "/home";

                    navigate(route, { state: { scrollTo: "Mensajería" } });
                  }}
                  className={`${styles.ItemAvatarButtom} `}
                >
                  Chat
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} className={`${styles.ItemAvatarButtom}`}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ms-auto text-center">
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "bienvenida" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "profesorado" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Profesorado
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "caracteristicas" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Características
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={`${styles.NavButton} nav-link`}>
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
