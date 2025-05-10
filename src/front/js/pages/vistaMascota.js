import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Modal, Button, Form } from 'react-bootstrap';
import "../../styles/home.css";

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
      console.error("Error al obtener los detalles de la mascota", error);
      setPetDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetDetails(id);
  }, [id]);

  useEffect(() => {
    if (petDetails) {
      actions.getFoodSuggestions(id).then(data => {
        setFoodSuggestions(data);
      });
    }
  }, [petDetails, id]);

  useEffect(() =>{console.log(foodSuggestions)},[foodSuggestions])
  useEffect(() => {
    if (!loading && petDetails === null) {
      navigate("/not-found");
    }
  }, [loading, petDetails, navigate]);

  const handleDelete = async () => {
    try {
      await actions.deletePet(id);
    } catch (error) {
      console.error("Error al eliminar la mascota (se ignora):", error);
    }
    navigate("/perfilUsuario");
  };

  const handleEdit = async () => {
    try {
      await actions.editPet(id, editedPet);
    } catch (error) {
      console.error("Error al editar la mascota (se ignora):", error);
    }
    setShowModal(false);
    navigate("/perfilUsuario");
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!petDetails) return null;

  return (
    <div className="container mt-5">
      <h2>Detalles de la Mascota</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src={petDetails.url || '/default-image.jpg'}
              alt={petDetails.name}
              className="card-img-top"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="card-body">
              <h5 className="card-title">{petDetails.name}</h5>
              <p className="card-text"><strong>Especie:</strong> {petDetails.animal_type}</p>
              <p className="card-text"><strong>Raza:</strong> {petDetails.breed}</p>
              <p className="card-text"><strong>Tamaño:</strong> {petDetails.size}</p>
              <p className="card-text"><strong>Edad:</strong> {petDetails.age}</p>
              <p className="card-text"><strong>Patologías:</strong> {petDetails.pathologies}</p>
              <Button variant="warning" onClick={() => setShowModal(true)} className="me-2">
                ✏️ Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                🗑️ Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Comida Recomendada</h2>
          <div className="d-flex flex-wrap">
            {foodSuggestions.length > 0 ? (
              foodSuggestions.map((food, index) => (
                <div className="card m-2" style={{ width: "18rem" }} key={index}>
                  <img
                    src={food.url || "/default-food.jpg"}
                    className="card-img-top"
                    alt={food.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{food.name}</h5>
                    {food.description && <p className="card-text">{food.description}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron sugerencias de comida.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal para editar mascota */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.name || ""}
                onChange={(e) => setEditedPet({ ...editedPet, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especie</Form.Label>
              <Form.Select
                value={editedPet.animal_type || ""}
                onChange={(e) => setEditedPet({ ...editedPet, animal_type: e.target.value })}
              >
                <option value="">Selecciona una especie</option>
                <option value="perro">Canina</option>
                <option value="gato">Felina</option>
                <option value="exótico">Exótico</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.breed || ""}
                onChange={(e) => setEditedPet({ ...editedPet, breed: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tamaño</Form.Label>
              <Form.Select
                value={editedPet.size || ""}
                onChange={(e) => setEditedPet({ ...editedPet, size: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="pequeña">Pequeño (0-10kg)</option>
                <option value="medio">Mediano (10-25kg)</option>
                <option value="grande">Grande (+25Kg)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Etapa Vital</Form.Label>
              <Form.Select
                value={editedPet.age || ""}
                onChange={(e) => setEditedPet({ ...editedPet, age: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="cachorro">Cachorro (0-1 año)</option>
                <option value="adulto">Adulto (1-7 años)</option>
                <option value="senior">Senior (+7 años)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Patologías</Form.Label>
              <Form.Select
                value={editedPet.pathologies || ""}
                onChange={(e) => setEditedPet({ ...editedPet, pathologies: e.target.value })}
              >
                <option value="">Selecciona una opción</option>
                <option value="ninguna">Sin patologias</option>
                <option value="diabetes">Diabetes</option>
                <option value="renal">Insuficiencia renal</option>
                <option value="escorbuto">Escorbuto</option>
                <option value="obesidad">Obesidad</option>
                <option value="hipoalergénico">Hipoalergénico</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
