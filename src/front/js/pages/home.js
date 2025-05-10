import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import img1 from "../../img/niñosylibros.jpg";
import img3 from "../../img/un-aula-de-un-colegio.jpeg";
import CardDocente from '../component/CardDocente';
import CarruselValoraciones from '../component/CarruselValoraciones';
import homeBackground from '../../img/homeBackground.png';
import logoBlanco from '../../img/logo-blanco.png';


export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [location.state]);

  return (
    <div className="allSection" >
      <div style={{ backgroundImage: `url(${homeBackground})`, backgroundRepeat: "repeat-y", backgroundSize: "110% auto", backgroundPosition: "center" }}>
        <section id="bienvenida" className="section alternate">
          <div className="container">
            <div className="text-content p-5">
              <h1>Bienvenidos a SchoolHub</h1>
              <p className="Parrafos">
                Una plataforma de usos múltiples donde cada usuario podrá aprovecharla de diferente manera.
                Como <strong>Directivo</strong> podrás distribuir carga horaria, validar usuarios y supervisar todo a detalle.
                Desde el rol de <strong>Docente</strong>, serás capaz de ver tus horarios, asignar notas al alumnado e interactuar con los responsables de los niños.
                El <strong>Representante</strong> del alumno podrá divisar las notas, anotarlo a actividades extracurriculares y más.
              </p>
            </div>
            <div className="image-content">
              <img src={img3} alt="Aula de colegio" className="section-image" />
            </div>
          </div>
        </section>

        <section id="profesorado" className="section">
          <div className="container">
            <div className="text-content">
              <h2>Nuestro Profesorado</h2>
              <p className="Parrafos">
                Conoce a los expertos que forman parte de nuestro equipo. Cada docente es elegido con cautela y múltiple evaluaciones para demostrar que es apto para el cargo.
              </p>
            </div>
            <CardDocente />
            <CarruselValoraciones />
          </div>
        </section>

        <section id="caracteristicas" className="section alternate">
          <div className="container">
            <div className="text-content">
              <h2>Características</h2>
              <p className="Parrafos">
                Descubre todas las funcionalidades y beneficios de nuestra plataforma.
                La facilidad de uso e interactividad es uno de los más importante.
                Por otro lado, se podrá llevar a cabo un seguimiento por parte de cada usuario.
                Los feriados no se te pasarán, podrás saber qué días la Institución permanecerá cerrada a causa de fechas patrias, para poder proyectar con antelación cualquier inconveniente.
              </p>
            </div>
            <div className="image-content">
              <img src={img1} alt="Niños y libros" className="section-image" />
            </div>
          </div>
        </section>

        <section id="registro" className="section">
          <div className="container-Form">
            <h2>Regístrese!</h2>
            <p className="Parrafos">No dudes en registrarte y obtener los beneficios de un sistema ideado para tu comodidad, tranquilidad y supervisión de desempeño escolar.</p>
            <Link to="/register">
              <button className="button" id="btn-reg">Click aquí!</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
