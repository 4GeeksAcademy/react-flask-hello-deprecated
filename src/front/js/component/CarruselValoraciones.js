import React, { useEffect, useRef } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import styles from "../../styles/CarruselValoraciones.module.css";

const CarruselValoraciones = () => {
  const valoraciones = [
    { id: 1, user: 'Pedro González', rating: 5, comment: 'Excelente plataforma educativa, muy fácil de usar.' },
    { id: 2, user: 'Ana López', rating: 4, comment: 'Gran herramienta para el seguimiento de mis hijos.' },
    { id: 3, user: 'Roberto Martínez', rating: 5, comment: 'Muy útil y completa para los docentes.' }
  ];

  const carouselItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    carouselItemRefs.current.forEach(item => {
      observer.observe(item);
    });

    return () => {
      carouselItemRefs.current.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <Container className={styles.container}>
      <Carousel>
        {valoraciones.map((valoracion, index) => (
          <Carousel.Item key={valoracion.id}>
            <div
              className={styles.carouselItem}
              ref={el => carouselItemRefs.current[index] = el}
            >
              <h5 className={styles.userName}>{valoracion.user}</h5>
              <p className={styles.rating}>
                {'★'.repeat(valoracion.rating)}
                {'☆'.repeat(5 - valoracion.rating)}
              </p>
              <p className={styles.comment}>&quot;{valoracion.comment}&quot;</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarruselValoraciones;
