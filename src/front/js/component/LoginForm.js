import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/LoginForm.module.css";
import { Context } from '../store/appContext';
import logginBackground from "../../img/logginBack.png"
import logoLoggin from "../../img/logoOficial.png"

const LoginForm = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {

        if (store.role) {
            navigate(redirect(store.role))
        }

    }, [store.role])

    const redirect = (role) => {
        let route = "/dashboard/"
        switch (role) {
            case "admin":
                route += "admin"
                break
            case "docente":
                route += "teacher"
                break
            case "representante":
                route += "parent"
                break
            default:
                route = null
        }
        return route
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (email === '' || password === '') {
            setError('Por favor, complete todos los campos');
            return;
        }

        const response = await actions.handleLogin({ email, password });

        if (response.success) {
            const route = redirect(store.role)
            route ? navigate(route) : setError("Rol no reconocido.");
        } else {
            setError(response.message);
        }

    };

    return (
        <div style={{ backgroundImage: `url(${logginBackground})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className={`${styles.LoginForm} d-flex justify-content-center align-items-center h-100`}>


                <Row className='ms-5'>
                    <Col xs={12} md={6} lg={4} >
                        <h2 className="text-center mb-4"><strong>Iniciar Sesión</strong></h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className={`${styles.formLog} p-4 border shadow`}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingrese su correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='rounded-pill'
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='rounded-pill'
                                />
                            </Form.Group>
                            <button type="submit" className="btn-outline-register w-100 mt-4 rounded-pill">
                                Iniciar Sesión
                            </button>
                            <Button
                                variant="link"
                                onClick={() => navigate('/register')}
                                className="w-100 mt-3 text-center" style={{ 'text-decoration': 'none' }}
                            >
                                <span className={`${styles.spanLog}`}>¿No tienes cuenta? <strong>Regístrate</strong></span>
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => navigate('/password/recovery/')}
                                className="w-100 mt-3 text-center" style={{ 'text-decoration': 'none', fontSize: '14px' }}
                            >
                                <span className={`${styles.spanLog}`}>¿Olvidaste tu contraseña?</span>
                            </Button>
                        </Form>
                    </Col>

                    <Col className='d-flex justify-content-center mt-5 pt-5'>
                        <div className='loggin-logo-content ms-5' style={{ width: '80%', maxWidth: '500px' }}>
                            <img src={logoLoggin} alt='logo' className='img-fluid mb-5' style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(2px 4px 6px black)' }} />
                            <p>Una nueva forma de seguir la educación de tus hijos, sus progresos, eventos y logros académicos, al alcance de un clic.</p>
                            <div className='d-flex display-6'>
                                <i className="bi bi-facebook me-3"></i>
                                <i className="bi bi-instagram me-3"></i>
                                <i className="bi bi-twitter-x me-1"></i>
                                <i className="bi bi-youtube me-3"></i>
                            </div>
                            <span>Síguenos en redes.</span>
                        </div>
                    </Col>
                </Row>



            </div>
        </div>
    );
};

export default LoginForm;
