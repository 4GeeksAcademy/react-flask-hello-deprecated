import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Eye, EyeOff } from "lucide-react";

export const EdicionPerfil = ({ isOpen, onClose }) => {
  const { store, actions } = useContext(Context);
  const user = store.user || {};

  const [formData, setFormData] = useState({
    name: "",
  email: "",
  password: "",
  confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 🔹 Sincroniza el estado del formulario con los datos del usuario cuando se abra el modal
  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "", // No mostrar la contraseña actual por seguridad
    });
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError("El nombre y el correo son obligatorios");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    
    try {
      await actions.updateUser({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined // Solo enviar la contraseña si se ingresó
      });
      await actions.getUser(); // 🔹 Vuelve a traer los datos actualizados
      onClose();
    } catch (error) {
      setError("Hubo un error al actualizar el perfil");
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await actions.deleteUser();
      setShowDeleteConfirm(false);
    } catch (error) {
      setError("Hubo un error al eliminar la cuenta");
    }
  };

  return (
    <>
      {/* Modal de Edición */}
      <Modal show={isOpen} onHide={onClose}>
    <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nueva Contraseña (opcional)</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
        <Button variant="danger" onClick={handleDelete}>Eliminar Cuenta</Button>
    </Modal.Footer>
</Modal>

{/* Modal de Confirmación de Eliminación */}
<Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
        <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
    </Modal.Footer>
</Modal>
    </>
  );
};
