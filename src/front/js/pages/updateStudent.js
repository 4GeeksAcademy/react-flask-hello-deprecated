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

export const UpdateStudent = props => {
    const { store, actions } = useContext(Context);
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [currentStudent, setCurrentStudent] = useState({
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        grado: {},
        grado_id: null
    });

    useEffect(() => {
        actions.setStudents();
        actions.getCourses();
    }, []);

    useEffect(() => {
        if (store.estudiantes) {
            if (store.estudiantes.length > 0 && studentId) {
                let student = store.estudiantes.find(student => student.id == studentId);
                setCurrentStudent(student);
                if (student.fecha_nacimiento) {
                    setStartDate(new Date(student.fecha_nacimiento));
                }
            }
        }
    }, [studentId, store.estudiantes]);

    const updateStudent = async () => {
        const { id, fecha_ingreso, direccion, grado, ...dataToUpdate } = currentStudent;

        const updatedPayload = {
            nombre: currentStudent.nombre,
            apellido: currentStudent.apellido,
            fecha_nacimiento: currentStudent.fecha_nacimiento,
            grado_id: currentStudent.grado_id,
        };

        try {
            const newData = await actions.studentsOperations('PUT', updatedPayload, studentId);
            if (newData) {
                Swal.fire({
                    title: "Estudiante actualizado con éxito",
                    icon: "success",
                });
                navigate('/dashboard/admin');
            }
        } catch (error) {
            console.error("Error updating student:", error.response || error.message);
            Swal.fire({
                title: "Error con la solicitud",
                text: error.response ? error.response.data.msg : error.message,
                icon: "error",
            });
        }
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setCurrentStudent(prevState => ({ ...prevState, fecha_nacimiento: date ? date.toISOString().split('T')[0] : '' }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent(prevState => ({ ...prevState, [name]: value }));
        if (name === "grado") {
            const gradoSelected = store.grados.find(grado => grado.id === parseInt(value));
            setCurrentStudent(prevState => ({ ...prevState, grado: gradoSelected, grado_id: gradoSelected.id }));
        } else {
            setCurrentStudent(prevState => ({ ...prevState, [name]: value }));
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
                                <h1 className="text-white text-center mb-4">Editar la información de {currentStudent.nombre} {currentStudent.apellido}</h1>

                                <div className="row g-5 justify-content-center mb-3">
                                    <div className="col-5">
                                        <label className="form-label text-form">Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentStudent.nombre}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-5">
                                        <label className="form-label text-form">Apellido:</label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentStudent.apellido}
                                            onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row g-5 justify-content-center mb-3">
                                    <div className="col-5">
                                        <label className="form-label text-form">Fecha de nacimiento:</label> <br></br>
                                        <DatePicker
                                            selected={startDate}
                                            name="fecha_nacimiento"
                                            onChange={handleDateChange}
                                            dateFormat="yyyy/MM/dd"
                                            className="form-control rounded-pill"
                                            required />
                                    </div>
                                    <div className="col-5 d-flex flex-column">
                                        <label className="form-label text-form">Asignar un grado:</label>
                                        <select
                                            className="custom-select rounded-pill"
                                            name="grado"
                                            id="inputGroupSelect04"
                                            onChange={handleChange}
                                            value={currentStudent.grado.nombre || ""}
                                        >
                                            <option value="" disabled selected>Opciones...</option>
                                            {store.grados.map(grado =>
                                                <option key={grado.id} value={grado.id}>{grado.nombre}</option>

                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="row g-5 mt-5">
                                        <div className="col">
                                            <button
                                                type="submit"
                                                className="btn btn-outline-register"
                                                onClick={() => updateStudent()}
                                            >Registrar</button>
                                        </div>
                                        <div className="col">
                                            <Link to="/dashboard/admin">
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
                </div>
            </div>
        </div>
    );
};

UpdateStudent.propTypes = {
    match: PropTypes.object
};

export default UpdateStudent;

