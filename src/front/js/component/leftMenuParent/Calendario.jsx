import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../styles/Calendar.css";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import BoxDisplay from "./BoxDisplay.jsx";

const Calendario = ({ eventos }) => {
  const [value, setValue] = useState(new Date()); // Día seleccionado
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // Mes visible
  const [popoverInfo, setPopoverInfo] = useState({
    show: false,
    target: null,
    event: null,
  });
  const calendarRef = useRef(null);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);

    const today = new Date();
    if (
      today.getFullYear() === activeStartDate.getFullYear() &&
      today.getMonth() === activeStartDate.getMonth()
    ) {
      setValue(today);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];

      const matchingEvents = eventos.filter(
        evento => evento.date === formattedDate
      );

      if (matchingEvents.length > 0) {
        if (matchingEvents.some(evento => evento.holiday)) {
          return "highlight-holiday"; // Clase CSS para feriados y/o evaluaciones
        }
        return "highlight"; // Clase CSS para eventos regulares
      }
    }
    return null;
  };

  const handleDayClick = (value, event) => {
    const formattedDate = value.toISOString().split("T")[0];

    // Busca los eventos para este día
    const matchingEvents = eventos.filter(
      evento => evento.date === formattedDate
    );

    if (matchingEvents.length > 0) {
      // Muestra el popover con información del evento
      setPopoverInfo({
        show: true,
        target: event.target, // Elemento donde se mostrará el popover
        event: matchingEvents, // Muestra el primer evento del día (puedes ajustar esto si hay más eventos)
      });
    } else {
      // Oculta el popover si no hay eventos
      setPopoverInfo({ show: false, target: null, event: null });
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) && // Fuera del calendario
        popoverInfo.target &&
        !popoverInfo.target.contains(event.target) // Fuera del target del Popover
      ) {
        setPopoverInfo({ show: false, target: null, event: null }); // Ocultar Popover
        setValue(new Date())
      }
    };

    if (popoverInfo.show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverInfo]);

  return (
    <div ref={calendarRef} className="p-0 m-0">

      <BoxDisplay flex="row" >
        <Calendar
          onActiveStartDateChange={handleActiveStartDateChange}
          onClickDay={handleDayClick}
          onChange={setValue}
          tileClassName={tileClassName}
          value={value}
        />

        <Overlay
          show={popoverInfo.show}
          target={popoverInfo.target}
          placement="right"
          containerPadding={20}>
          <Popover id="popover-basic">
            <Popover.Header as="h3">

              {popoverInfo.event?.map((e) => e.holiday ? e.title : e.materia + ", ")}
            </Popover.Header>
            <Popover.Body>
              {popoverInfo.event?.map((e, index) => {
                if (e.holiday) {
                  return (
                    <div key={`holiday-${index}`}>
                      {e.title} <br /> {e.date}
                    </div>
                  );
                }

                return (
                  <p key={`event-${index}`}>
                    {e.title} - {e.materia} <br /> Grado: {e.grado}
                  </p>
                );
              })}
            </Popover.Body>
          </Popover>
        </Overlay>
      </BoxDisplay>
    </div>
  );
};

export default Calendario;
