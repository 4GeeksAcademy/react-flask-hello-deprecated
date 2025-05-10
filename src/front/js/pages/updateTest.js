import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NavBar from "../component/Navbar.js";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import "../../styles/components.css";
import Swal from 'sweetalert2';

export const UpdateTest = () => {
    const { store, actions } = useContext(Context);
    const { testId } = useParams();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [currentTest, setCurrentTest] = useState({
        nombre: "",
        descripcion: "",
        date: "",
        finalizada: ""
    });

    useEffect(() => {
        actions.setTests();
    }, []);

    useEffect(() => {
        if (store.evaluaciones) {
            if (store.evaluaciones.length > 0 && testId) {
                let test = store.evaluaciones.find(test => test.id == testId);
                setCurrentTest(test);
            }
        }
    }, [testId, store.evaluaciones]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTest(prevState => ({ ...prevState, [name]: value }));

    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setCurrentTest(prevState => ({ ...prevState, date: date ? date.toISOString().split('T')[0] : '' }));
    };

    const updateTest = async () => {

        const updatedPayload = {
            nombre: currentTest.nombre,
            descripcion: currentTest.descripcion,
            fecha: currentTest.date,
            finalizada: currentTest.finalizada,
            materia_id: currentTest.materia_id
        };

        try {
            const newData = await actions.testsOperations('PUT', updatedPayload, testId);
            if (newData) {
                Swal.fire({
                    title: "Evaluación actualizada con éxito",
                    icon: "success",
                });
                navigate('/dashboard/teacher');
            }
        } catch (error) {
            console.error("Error updating teacher:", error.response || error.message);
            Swal.fire({
                title: "Error con la actualización",
                text: error.response ? error.response.data.msg : error.message,
                icon: "error",
            });
        }
    };

    return (
        <div className="container-fluid">
            <NavBar />
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col mt-5">
                        <div className="render-content mt-3" style={{ backgroundImage: `url(${backgroundForViews})`, backgroundSize: "cover" }}>
                            <div className="container container-welcome-teacher mt-3">
                                <h1 className="text-white text-center mb-4">Cambiar datos de la evaluación: {currentTest.nombre}</h1>

                                <div className="row g-5 justify-content-center mb-3">
                                    <div className="col-5">
                                        <label className="form-label text-form">Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTest.nombre}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-5">
                                        <label className="form-label text-form">Fecha de evaluación:</label> <br></br>
                                        <DatePicker selected={startDate} value={currentTest.date} onChange={handleDateChange} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                                    </div>
                                </div>
                                <div className="row g-5 justify-content-center mb-3">

                                    <div className="col-5">
                                        <label className="form-label text-form">Descripción:</label>
                                        <textarea
                                            type="text"
                                            name="descripcion"
                                            placeholder="Descripción del conocimiento que será evaluado..." rows="3"
                                            className="form-control teacher-description"
                                            required
                                            value={currentTest.descripcion}
                                            onChange={handleChange}>
                                        </textarea>
                                    </div>

                                    <div className="col-5 justify">
                                        <label className="form-label text-form me-3">Estado:</label>
                                        <div className="d-flex flex-column">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="active" value="pendiente" onChange={handleChange} />
                                                <label className="form-check-label text-form" htmlFor="active">Pendiente</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="finished" value="finalizada" onChange={handleChange} />
                                                <label className="form-check-label text-form" htmlFor="finished">Finalizada</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="d-flex justify-content-center mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-register me-5"
                                        onClick={() => updateTest()}
                                    >Registrar</button>
                                    <Link to="/dashboard/teacher">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-cancel"
                                        >Regresar</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

UpdateTest.propTypes = {
    match: PropTypes.object
};

export default UpdateTest;