import React, { useState, useContext, useEffect } from 'react';
import { Form, Container, Modal, Button } from 'react-bootstrap';
import styles from "../../styles/RegistrationForm.module.css";
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import logginBackground from "../../img/logginBack.png"


const RegistrationForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        telefono: '',
        password: ''
    });

    useEffect(() => {
        if (store.successMessage) {
            setShowSuccessModal(true);
        }
    }, [store.successMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const response = await actions.handleRegister(formData);

        if (response !== true) {
            setError(response);
            return;
        }

        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        actions.clearMessages();
        navigate('/login');
    };

    return (
        <div style={{ backgroundImage: `url(${logginBackground})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className={`${styles.ContainerF}`}>
                <Container className="mt-4">
                    <h2 className="text-center mb-4"><strong>Formulario de Inscripción</strong></h2>
                    {error && <div className='alert alert-danger text-center'>{error}</div>}
                    <Form onSubmit={handleSubmit} className={`${styles.ContainerForm} border`}>
                        <Form.Group controlId="nombre">
                            <Form.Label><strong>Nombre</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Juan"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                            />
                        </Form.Group>

                        <Form.Group controlId="apellido">
                            <Form.Label><strong>Apellido</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Perez"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="usuario@mail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="direccion">
                            <Form.Label><strong>Dirección</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="FakeStreet 123"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                            />
                        </Form.Group>

                        <Form.Group controlId="telefono">
                            <Form.Label><strong>Celular</strong></Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="XXXX-XX-XXXX"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="******"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className='rounded-pill mb-3'
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-3">
                            <button
                                type="submit"
                                className={`${styles.buttonRegForm} button nav-link rounded-pill`}
                            >
                                Enviar Inscripción
                            </button>
                        </div>
                    </Form>

                    <Modal show={showSuccessModal} onHide={handleModalClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>¡Registro Exitoso!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¡Su usuario se ha registrado correctamente! Bienvenido a SchoolHub.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleModalClose}>
                                Continuar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default RegistrationForm;
