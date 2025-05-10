import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styles from '../../styles/CardDocente.module.css';
import docente4 from "../../img/docente4.jpg";
import docente3 from "../../img/docente3.jpg";
import docente2 from "../../img/docente2.jpg";
import docente1 from "../../img/Docente1.jpg";

const CardDocente = () => {
    const [docentes, setDocentes] = useState([]);
    const fakeDocentes = [
        { id: 'f1', name: 'María Pérez', description: 'Docente de Matemáticas', img: docente4 },
        { id: 'f2', name: 'Juan López', description: 'Docente de Historia', img: docente2 },
        { id: 'f3', name: 'Laura García', description: 'Docente de Ciencias', img: docente3 },
        { id: 'f4', name: 'Carlos Díaz', description: 'Docente de Lengua', img: docente1 },
    ];

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/info/teachers`, {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                const combinedDocentes = [...data, ...fakeDocentes.slice(data.length)];
                setDocentes(combinedDocentes);
            })
            .catch(error => {
                console.error('Error:', error);
                setDocentes(fakeDocentes);
            });
    }, []);

    return (
        <Container className={styles.container}>
            <Row>
                {docentes.map((docente, index) => (
                    <Col key={index} md={6} lg={3} className="mb-4">
                        <Card className={styles.card}>
                            <Card.Img
                                variant="top"
                                src={docente.foto}
                                alt={`Foto de ${docente.fullName}`}
                                className={styles.cardImg}
                            />
                            <Card.Body className={styles.cardBody}>
                                <Card.Title className={styles.cardTitle}>{docente.fullName}</Card.Title>
                                <Card.Text className={styles.cardText}>{docente.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CardDocente;
