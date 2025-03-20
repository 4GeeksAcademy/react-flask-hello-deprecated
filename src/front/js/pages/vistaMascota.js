import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Modal, Button, Form } from 'react-bootstrap';

export const VistaMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedPet, setEditedPet] = useState({
    name: "",
    animal_type: "",
    breed: "",
    size: "",
    age: "",
    pathologies: ""
  });
  const [foodSuggestions, setFoodSuggestions] = useState([]);

  useEffect(() => {
    const getPetDetails = async (id) => {
      try {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/pets/${id}`);
        if (resp.status === 404) {
          setPetDetails(null);
        } else {
          const petData = await resp.json();
          setPetDetails(petData);
          setEditedPet({
            name: petData.name || "",
            animal_type: petData.animal_type || "",
            breed: petData.breed || "",
            size: petData.size || "",
            age: petData.age || "",
            pathologies: petData.pathologies || ""
          });
        }
      } catch (error) {
        setPetDetails(null);
      } finally {
        setLoading(false);
      }
    };
    getPetDetails(id);
  }, [id]);

  useEffect(() => {
    if (petDetails) {
      actions.getFoodSuggestions(id).then(data => {
        setFoodSuggestions(data);
      });
    }
  }, [petDetails, id]);

  useEffect(() => {
    if (!loading && petDetails === null) {
      navigate("/not-found");
    }
  }, [loading, petDetails, navigate]);

  const handleDelete = async () => {
    try {
      await actions.deletePet(id);
    } catch (error) {}
    navigate("/perfilUsuario");
  };

  const handleEdit = async () => {
    try {
      await actions.editPet(id, editedPet);
    } catch (error) {}
    setShowModal(false);
    navigate("/perfilUsuario");
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!petDetails) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🐾 Detalles de la Mascota</h2>

      {/* Diseño mejorado para mostrar la imagen y el nombre al lado */}
      <div className="row justify-content-center">
  <div className="col-md-6">
    <div className="card shadow-lg border-0 p-3 d-flex flex-row align-items-center">
      
      {/* Contenedor de la imagen y el nombre */}
      <div className="d-flex flex-column align-items-center me-4">
        <img
          src={
            petDetails.animal_type === "perro" ? "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f436.png" :
            petDetails.animal_type === "gato" ? "https://cdn-icons-png.flaticon.com/512/6988/6988878.png" :
            petDetails.animal_type === "exotico" ? "https://cdn-icons-png.flaticon.com/512/802/802338.png" :
            "https://via.placeholder.com/60"
          } 
          alt={petDetails.name} 
          className="rounded-circle border border-secondary"
          style={{ width: "140px", height: "140px", objectFit: "cover" }}
        />
        {/* Nombre de la mascota debajo de la imagen */}
        <h4 className="fw-bold mt-2">{petDetails.name}</h4>
      </div>

      {/* Contenedor de los datos a la derecha */}
      <div className="w-100">
        <p><strong>Raza:</strong> {petDetails.breed}</p>
        <p><strong>Tamaño:</strong> {petDetails.size}</p>
        <p><strong>Edad:</strong> {petDetails.age}</p>
        <p><strong>Patologías:</strong> {petDetails.pathologies}</p>

        {/* Contenedor de los botones alineados a la derecha */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button 
            variant="outline-warning" 
            size="sm" 
            onClick={() => setShowModal(true)}
            style={{ transition: '0.3s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#ffbb33"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            ✏️ Editar
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={handleDelete}
            style={{ transition: '0.3s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#dc3545"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
          >
            🗑️ Eliminar
          </Button>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* Comida Recomendada */}
<div className="mt-5">
  <h2 className="text-center mb-4">🍽️ Comida Recomendada</h2>
  <div className="d-flex flex-wrap justify-content-center">
    {foodSuggestions.length > 0 ? (
      foodSuggestions.map((food, index) => (
        <div className="card shadow-sm border-0 m-3" style={{ width: "18rem" }} key={index}>
          <img
            src={food.url || "/default-food.jpg"}
            className="card-img-top rounded-top"
            alt={food.name}
            style={{ 
              height: "200px", 
              objectFit: "contain", // 🔹 Evita que la imagen se corte
              padding: "10px" // 🔹 Da espacio alrededor de la imagen
            }}
          />
          <div className="card-body text-center">
          <h5 className="card-title fw-bold">
            <Link to={`/vista-producto/${food.id}`} className="text-decoration-none text-dark">
              {food.name}
            </Link>
          </h5>
            {food.description && (
              <p className="text-muted">
                {food.description.length > 80 ? food.description.substring(0, 80) + "..." : food.description}
              </p>
            )}
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">No se encontraron sugerencias de comida.</p>
    )}
  </div>
</div>


      {/* Modal para editar mascota */}
{/* Modal para editar mascota */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton className="bg-light" style={{ maxWidth: "500px", margin: "auto", borderRadius: "10px" }}>
    <Modal.Title className="fw-bold text-primary">Editar Mascota</Modal.Title>
  </Modal.Header>
  
  <Modal.Body style={{ maxWidth: "500px", margin: "auto", borderRadius: "10px", padding: "15px" }}>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Nombre</Form.Label>
        <Form.Control
          type="text"
          value={editedPet.name || ""}
          onChange={(e) => setEditedPet({ ...editedPet, name: e.target.value })}
          placeholder="Ej: Max, Luna, Rex..."
          style={{ fontSize: "1rem", padding: "10px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Especie</Form.Label>
        <Form.Select
          value={editedPet.animal_type || ""}
          onChange={(e) => setEditedPet({ ...editedPet, animal_type: e.target.value })}
          style={{ fontSize: "1rem", padding: "10px" }}
        >
          <option value="">Selecciona una especie</option>
          <option value="perro">Canina</option>
          <option value="gato">Felina</option>
          <option value="exotico">Exótico</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Raza</Form.Label>
        <Form.Control
          type="text"
          value={editedPet.breed || ""}
          onChange={(e) => setEditedPet({ ...editedPet, breed: e.target.value })}
          placeholder="Ej: Labrador, Siamés, Iguana..."
          style={{ fontSize: "1rem", padding: "10px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Tamaño</Form.Label>
        <Form.Select
          value={editedPet.size || ""}
          onChange={(e) => setEditedPet({ ...editedPet, size: e.target.value })}
          style={{ fontSize: "1rem", padding: "10px" }}
        >
          <option value="">Selecciona una opción</option>
          <option value="pequeña">Pequeño (0-10kg)</option>
          <option value="medio">Mediano (10-25kg)</option>
          <option value="grande">Grande (+25Kg)</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Etapa Vital</Form.Label>
        <Form.Select
          value={editedPet.age || ""}
          onChange={(e) => setEditedPet({ ...editedPet, age: e.target.value })}
          style={{ fontSize: "1rem", padding: "10px" }}
        >
          <option value="">Selecciona una opción</option>
          <option value="cachorro">Cachorro (0-1 año)</option>
          <option value="adulto">Adulto (1-7 años)</option>
          <option value="senior">Senior (+7 años)</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Patologías</Form.Label>
        <Form.Select
          value={editedPet.pathologies || ""}
          onChange={(e) => setEditedPet({ ...editedPet, pathologies: e.target.value })}
          style={{ fontSize: "1rem", padding: "10px" }}
        >
          <option value="">Selecciona una opción</option>
          <option value="ninguna">Sin patologías</option>
          <option value="diabetes">Diabetes</option>
          <option value="renal">Insuficiencia renal</option>
          <option value="escorbuto">Escorbuto</option>
          <option value="obesidad">Obesidad</option>
          <option value="hipoalergenico">Hipoalergénico</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer className="d-flex justify-content-between" style={{ maxWidth: "500px", margin: "auto", borderRadius: "10px" }}>
    <Button 
      variant="success" 
      size="md"
      onClick={handleEdit}
      className="fw-bold px-4"
      style={{ transition: '0.3s', fontSize: "1rem", padding: "8px 15px" }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
    >
      Guardar Cambios
    </Button>

    <Button 
      variant="danger" 
      size="md"
      onClick={() => setShowModal(false)}
      className="fw-bold px-4"
      style={{ transition: '0.3s', fontSize: "1rem", padding: "8px 15px" }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
    >
      Cancelar
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};