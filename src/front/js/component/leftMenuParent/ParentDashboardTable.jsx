import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Collapse from 'react-bootstrap/Collapse';
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const calculateAVGMateria = arr =>
  arr.map(materia => ({
    nombre: materia.nombre,
    evaluaciones: materia.evaluaciones ?? 0,
    avg: materia.notas.length
      ? materia.notas.reduce((a, b) => a + b, 0) / materia.notas.length
      : 0,
  }));


export const StyledTable = styled.div`
position: relative;
  width: 90%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 0 2rem 0;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #ddd;
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: white;
  backdrop-filter: blur(2.9px);
`;

export const Column = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

const ParentDashboardTable = ({ materias, studentId }) => {
  const { store } = useContext(Context)
  const [info, setInfo] = useState(materias);
  const [openRows, setOpenRows] = useState({})
  const [studentInfo, setStudentInfo] = useState([])



  useEffect(() => {
    if (materias.length) {
      setInfo(materias);
      setStudentInfo(store.personalInfo.estudiantes.find(student => student.id == studentId))

    }
  }, [materias]);


  const handleToggle = (index) => {
    setOpenRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }


  const getMateriaInfo = (materia) => {
    let materiaInfo = studentInfo.calificaciones?.filter((calificacion) => calificacion.materia == materia[0])


    return materiaInfo.map((evaluacion) => (
      <StyledRow key={evaluacion.evaluacion}>
        <Column><i className="bi bi-file-text"></i> {evaluacion.evaluacion}</Column>
        <Column>{new Date(evaluacion.fecha).toISOString().split("T")[0]}</Column>
        <Column>{evaluacion.nota.toFixed(2)}</Column>
      </StyledRow>
    ))
  }



  return (
    <StyledTable>
      <StyledHeader>
        <Column>Materia</Column>
        <Column>Evaluaciones</Column>
        <Column>Promedio</Column>
        <Column><i className="bi bi-binoculars-fill fs-5"></i></Column>
      </StyledHeader>
      {info.length ? (
        info.map((materia, index) => (
          <div className="w-100 m-0 p-0" key={`table-info-${index}`}>
            <StyledRow key={index} onClick={() => handleToggle(index)}>
              <Column><i className={`bi bi-caret-${openRows[index] ? "up" : "down"}-fill me-1`}></i>{materia.materia[0]}</Column>
              <Column>{materia.evaluaciones}</Column>
              <Column>{materia.promedio.toFixed(2)}</Column>
              <Column>
                <Link to={`/dashboard/parent/review/${studentInfo.id}/${materia.materia[1]}`}>
                  <i className="bi bi-zoom-in fs-5 text-light"></i>
                </Link>
              </Column>
            </StyledRow>
            {
              studentInfo.calificaciones ?
                (<Collapse in={openRows[index]}>
                  <div className="w-100 m-0 p-0">
                    <hr className="dropdown-divider text-light" />

                    {getMateriaInfo(materia.materia)}
                    <hr className="dropdown-divider text-light" />
                  </div>
                </Collapse>) : ""
            }
          </div>
        ))
      ) : (
        <h1 className="text-center">Cargando contenido</h1>
      )}
    </StyledTable>
  );
};

export default ParentDashboardTable;
