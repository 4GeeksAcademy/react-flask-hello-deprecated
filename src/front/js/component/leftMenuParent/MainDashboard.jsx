import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Calendario from "./Calendario.jsx";
import BoxDisplay from "./BoxDisplay.jsx";
import ParentGaugeChart from "./GaugeChart.jsx";
import ParentDashboardTable from "./ParentDashboardTable.jsx";
import { Context } from "../../store/appContext.js";
import { Button, Carousel, Spinner } from "react-bootstrap";
import "../../../styles/MainDashboard.css";
import { get_student_avg } from "../../functions/clean_parent_data.js";

const format_schedule_data = obj => {
  let auxArr = [];
  Object.keys(obj).forEach(key => {
    auxArr.push(...obj[key]);
  });

  return auxArr;
};
const MainDashboard = ({ dataEvents, estudiantes }) => {
  const { store } = useContext(Context);
  const [studentSlide, setStudentSlide] = useState(0);
  const [avgSlide, setAvgSlide] = useState(0);
  const [avgInfo, setAvgInfo] = useState([]);

  const handlePrevSlide = (value, changeFunction) => {
    if (value > 0) {
      changeFunction(value - 1);
    }
  };

  const handleNextSlide = (value, count, changeFunction) => {
    if (value < count - 1) {
      changeFunction(value + 1);
    }
  };

  useEffect(() => {
    if (estudiantes) {
      let promedios = estudiantes.map(get_student_avg);
      setAvgInfo(promedios);
    }
  }, [estudiantes]);

  return (
    <Wrapper className="container-fluid">
      <div className="row d-flex">
        <div className="col-md-8 col-sm-12 ">
          <Calendario eventos={format_schedule_data(dataEvents)} />
        </div>
        <div className="col-md-4 col-sm-12 ">
          <BoxDisplay aspect="1/1" classname="align-items-center ">
            {estudiantes.length == 0 ? (
              <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt3">
                <Spinner animation="grow" variant="light" className="mt-2" />
                <h3 className="text-center text-light mt-0">Estamos cargando su información</h3>
                <h6 className="text-center text-light">Por favor espere un momento...</h6>
              </div>
            ) : (
              <>
                <div
                  className={
                    "d-flex gap-3 text-light text-center align-items-center"
                  }>
                  <h1>Promedio</h1>
                  <i className="bi bi-list-check fs-1"></i>
                </div>
                <Carousel
                  style={{ width: "100%" }}
                  interval={null}
                  indicators={false}
                  controls={false}
                  activeIndex={avgSlide}>
                  {avgInfo
                    ? avgInfo.map((student, index) => {
                      return (
                        <Carousel.Item
                          key={index}>
                          <ParentGaugeChart
                            max={10}
                            value={student.promedio}
                          />
                          <h5 className="mb-2 text-center text-light">
                            {" "}
                            <i className="bi bi-mortarboard-fill me-3"></i>
                            {student.nombre}
                          </h5>
                        </Carousel.Item>
                      );
                    })
                    : ""}
                </Carousel>
                <div className="d-flex gap-2 mb-2 w-100 justify-content-around">
                  <Button
                    variant="light"
                    className={`w-25 fadeInLeft`}
                    onClick={() => handlePrevSlide(avgSlide, setAvgSlide)}>
                    <i class="fa-solid fa-arrow-left"></i>
                  </Button>

                  <Button
                    variant="light"
                    className={`w-25 fadeInRight`}
                    onClick={() =>
                      handleNextSlide(avgSlide, estudiantes.length, setAvgSlide)
                    }>
                    <i class="fa-solid fa-arrow-right"></i>
                  </Button>
                </div>
              </>
            )}
          </BoxDisplay>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <BoxDisplay classname="align-items-center pt-3" flex="row" aspect="16/9">
            {estudiantes.length == 0 ? (
              <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt3">
                <Spinner animation="grow" variant="light" className="mt-2" />
                <h2 className="text-center text-light mt-0">Estamos cargando su información</h2>
                <h6 className="text-center text-light">Por favor espere un momento...</h6>
              </div>
            ) : (
              <>
                {studentSlide > 0 ? (
                  <Button
                    variant="light"
                    className={`ms-2 h-25 fadeInLeft`}
                    onClick={() =>
                      handlePrevSlide(studentSlide, setStudentSlide)
                    }>
                    <i class="fa-solid fa-arrow-left"></i>
                  </Button>
                ) : (
                  " "
                )}
                <Carousel
                  style={{ width: "100%" }}
                  interval={null}
                  indicators={false}
                  controls={false}
                  activeIndex={studentSlide}>
                  {estudiantes ? (
                    estudiantes.map((estudiante, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <TableWrapper>
                            <div className={"d-flex gap-3 text-light"}>
                              <h1 className="mb-3">{estudiante.nombre}</h1>
                            </div>
                            <ParentDashboardTable

                              materias={estudiante.materias}
                              studentId={estudiante.id}
                            />
                          </TableWrapper>
                        </Carousel.Item>
                      );
                    })
                  ) : (
                    <h1 className="text-center">Loading Info</h1>
                  )}
                </Carousel>
                {studentSlide < estudiantes.length - 1 ? (
                  <Button
                    variant="light"
                    className={`me-2 h-25 fadeInRight`}
                    onClick={() =>
                      handleNextSlide(
                        studentSlide,
                        estudiantes.length,
                        setStudentSlide
                      )
                    }>
                    <i class="fa-solid fa-arrow-right"></i>

                  </Button>
                ) : (
                  " "
                )}
              </>
            )}
          </BoxDisplay>
        </div>
      </div>
    </Wrapper>
  );
};

export default MainDashboard;

const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 100%;
  background: none;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  width: 100%;
`;
