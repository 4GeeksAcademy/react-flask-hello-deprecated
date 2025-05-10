import React, { useEffect, useContext, useState } from "react";
import logo from "/workspaces/PupperEatsAppreact-flask-hello-deprecated/src/front/img/Icono puppereats.png";
import {EdicionPerfil} from "../component/edicionPerfil";
import { Context } from "../store/appContext";
import { User, MapPin, PlusCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const PerfilUsuario = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    actions.getUser(); // Obtiene el usuario desde el backend
    actions.getPets(); // Obtiene la lista de mascotas del usuario
  }, []);

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (!store.user) {
      navigate("/"); // Redirige a la página de login o home
    }
  }, [store.user]);

  if (!store.user) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container py-5" style={{ background: "#f9f6f2", minHeight: "100vh", borderRadius: "10px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/" className="navbar-brand d-flex align-items-center" onClick={() => setActiveCategory(null)}>
                              <img src={logo} alt="Logo" style={{ height: "60px", border: "3px solid #000", borderRadius: "10px", padding: "3px" }} />
                              <span className="fw-bold text-dark" style={{ fontSize: "1.5rem", marginLeft: "10px" }}>Pupper Eats</span>
                          </Link>
                          <button className="btn btn-warning me-2" onClick={() => navigate("/carrito")}>🛒 Carrito</button>
          <button className="btn btn-outline-secondary" onClick={actions.logout}>Cerrar sesión</button>
        </div>
      </div>

      {/* Perfil de Usuario */}
      <div className="card p-4 mb-4 shadow-lg" style={{ borderRadius: "12px", backgroundColor: "#fff8e1" }}>
        <h2 className="text-dark">Hola, <span className="fw-bold">{store.user.name}</span> 👋</h2>
        <div className="mt-3">
          <p><User size={16} /> {store.user.name}</p>
          <p><MapPin size={16} /> {store.user.email}</p>
          <button className="btn btn-outline-primary" onClick={() => setIsEditModalOpen(true)}>Editar perfil</button>
        </div>
      </div>

      {/* Modal de Edición de Perfil */}
      <EdicionPerfil isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

      {/* Mis Mascotas */}
      <h3 className="text-dark mb-3">🐾 Mis Mascotas</h3>
      <div className="card p-3 shadow-lg" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <button className="btn btn-outline-primary d-flex flex-column align-items-center">
            <PlusCircle size={40} />
            <Link to="/registro-mascota" className="btn btn-primary">Añadir perfil mascota</Link>
          </button>
          {store.pets && store.pets.length > 0 ? (
            store.pets.map((pet, index) => (
              <div 
                key={index} 
                className="text-center cursor-pointer" 
                onClick={() => navigate(`/pets/${pet.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img 
                  src={pet.url || "https://via.placeholder.com/60"} 
                  alt={pet.name} 
                  className="rounded-circle border border-secondary"
                  style={{ width: 60, height: 60, objectFit: "cover" }} 
                />
                <span className="d-block mt-1 fw-semibold">{pet.name}</span>
              </div>
            ))
          ) : (
            <p className="text-muted">Aún no tienes mascotas registradas. ¡Agrega una ahora! 🐶🐱</p>
          )}
        </div>
      </div>
    </div>
  );
};
