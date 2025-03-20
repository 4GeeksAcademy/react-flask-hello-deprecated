import React, { useEffect, useContext, useState } from "react";
import logo from "../../img/Icono puppereats.png";
import { EdicionPerfil } from "../component/edicionPerfil";
import { Context } from "../store/appContext";
import { User, MapPin, PlusCircle, LogOut, ShoppingCart } from "lucide-react"; // Importar ShoppingCart para el ícono
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
      {/* Navbar personalizado */}
      <nav className="navbar navbar-expand-lg mb-4" style={{ borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor:"#257180" }}>
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img 
              src={logo} 
              alt="Logo" 
              style={{ height: "60px", border: "3px solid #000", borderRadius: "10px", padding: "3px" }} 
            />
            <span className="fw-bold text-dark ms-2" style={{ fontSize: "2.5rem" }}>Pupper Eats</span>
          </Link>

          {/* Botón del carrito */}
          <button 
            className="btn btn-warning btn-sm d-flex align-items-center gap-2 ms-auto" 
            onClick={() => navigate("/carrito")}
            style={{ borderRadius: "8px", whiteSpace: "nowrap" }} // Estilo personalizado
          >
            <ShoppingCart size={16} /> {/* Ícono del carrito */}
            <span>Carrito</span>
          </button>
        </div>
      </nav>

     {/* Perfil usuario */}
     <div className="card p-4 mb-5" style={{ borderRadius: "12px", backgroundColor: "#f9f6f2", border: "none", border: "none" }}>
        <h2 className="text-dark mb-3">Hola, <span className="fw-bold">{store.user.name}</span> 👋</h2>
        <button 
          className="btn btn-sm d-flex align-items-center gap-2" 
          onClick={actions.logout}
          style={{ border: "none", color: "#6c757d", padding: "0" }} // Estilo personalizado
        >
          <LogOut size={16} /> {/* Ícono de cerrar sesión */}
          <span>Cerrar sesión</span>
        </button>
        <div className="mt-3">
          <p className="d-flex align-items-center gap-2">
            <User size={20} className="text-primary" /> {store.user.name}
          </p>
          <p className="d-flex align-items-center gap-2">
            <MapPin size={20} className="text-primary" /> {store.user.email}
          </p>
          <button 
            className="btn btn-dark" 
            onClick={() => setIsEditModalOpen(true)}
            style={{ borderRadius: "none", backgroundColor: "#FD8B51" }}
          >
            Editar perfil
          </button>
        </div>
      </div>

      {/* Modal de Edición de Perfil */}
      <EdicionPerfil isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

      {/* Mis Mascotas */}
      <h2 className="text-dark mb-4">🐾 Mis Mascotas</h2>
      <div className="card p-4" style={{ borderRadius: "12px", backgroundColor: "#fff", border: "none" }}>
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <button 
            className="btn btn-outline-light d-flex flex-column align-items-center justify-content-center p-3" 
            style={{ borderRadius: "12px", width: "120px", height: "120px", color:"#F2E5BF" }}
          >
            <PlusCircle size={40} className="mb-2" />
            <Link to="/registro-mascota" className="text-decoration-none text-dark fs-6 fw-medium">
              <span>Añadir mascota</span>
            </Link>
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
                  src={pet.animal_type === "perro" ? "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f436.png" :
                       pet.animal_type === "gato" ? "https://cdn-icons-png.flaticon.com/512/6988/6988878.png" :
                       pet.animal_type === "exotico" ? "https://cdn-icons-png.flaticon.com/512/802/802338.png" :
                    "https://via.placeholder.com/60" }
                  alt={pet.name} 
                  className="rounded-circle border border-secondary"
                  style={{ width: 60, height: 60, objectFit: "cover" }} 
                />
                <span className="d-block mt-2 fw-semibold">{pet.name}</span>
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
