import React, { useContext, useState, useEffect } from "react";
import LogIn from '../pages/LogIn.jsx';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
const Navbar = () => {
  const { store, actions } = useContext(Context);
  function handleLogout() {
    alert('Cerraste sesión. Esperamos verte pronto!');
    actions.logout();
    window.location.href = '/';
  }
  return (
    <nav className="navbar container-fluid navbar-expand navbar-light">

      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src="https://res.cloudinary.com/albertge/image/upload/v1691882080/TRIP%20NEXUS/Texto_del_p%C3%A1rrafo_c411q0.png" width="70" height="65" alt="Logo"></img>
        </Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {store.auth ? (
              <>

                <h3 style={{ color: "white" }}>Bienvenido, <strong>{store.user?.username ? store.user.username : store.business_user?.business_name}! </strong></h3>

              </>
            ) : (
              <>
                <li className="nav-item d-flex">
                  <a className="nav-link btn login me-2" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Entra</a>
                </li>
                <li><Link className="nav-link btn signup" to='/signup'>Registro</Link></li>
              </>
            )}
            <li className="nav-item dropstart">
              <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                &#9776;
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {/* <li><Link className="dropdown-item">Avisos/Notificaciones</Link></li> */}
                <li><Link to='/reviews' className="dropdown-item">Reseñas</Link></li>
                <li><Link to='/offers' className="dropdown-item">Ofertas</Link></li>
                <li><Link to='/trips' className="dropdown-item">Explora tu siguiente trip</Link></li>
                <li><Link className="dropdown-item">Ayuda</Link></li>
                <li><Link to='/contact' className="dropdown-item">Contacto</Link></li>
                {store.user.username && (
                  <>
                    <li><Link to='/favoritos' className="dropdown-item">Favoritos</Link></li>
                    <li><Link to='/user/private' className="dropdown-item">Mi espacio personal</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                  </>
                )}
                {store.business_user.business_name && (
                  <>
                    <li><Link className="dropdown-item">Favoritos</Link></li>
                    <li><Link to='/business_user/private' className="dropdown-item">Mi espacio personal</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
          <LogIn />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
