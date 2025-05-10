import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NavBar from "../component/Navbar.js";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import backgroundForViews from "../../img/background.jpg";
import "../../styles/components.css";
import Swal from 'sweetalert2';

export const UpdateTeacher = () => {
    const { store, actions } = useContext(Context);
    const { teacherId } = useParams();
    const navigate = useNavigate();
    const [currentTeacher, setCurrentTeacher] = useState({
        nombre: "",
        apellido: "",
        email: "",
        direccion: "",
        telefono: "",
        descripcion: ""
    });

    useEffect(() => {
        actions.setTeachers();
    }, []);

    useEffect(() => {
        if (store.profesores) {
            if (store.profesores.length > 0 && teacherId) {
                let teacher = store.profesores.find(teacher => teacher.id == teacherId);
                setCurrentTeacher(teacher);
            }
        }
    }, [teacherId, store.profesores]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTeacher(prevState => ({ ...prevState, [name]: value }));
        if (name === "grado") {
            const gradoSelected = store.grados.find(grado => grado.id === parseInt(value));
            setCurrentTeacher(prevState => ({ ...prevState, grado: gradoSelected, grado_id: gradoSelected.id }));
        } else {
            setCurrentTeacher(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const updateTeacher = async () => {

        const updatedPayload = {
            nombre: currentTeacher.nombre,
            apellido: currentTeacher.apellido,
            email: currentTeacher.email,
            direccion: currentTeacher.direccion,
            telefono: currentTeacher.telefono,
            descripcion: currentTeacher.descripcion
        };

        try {
            const newData = await actions.teachersOperations('PUT', updatedPayload, teacherId);
            if (newData) {
                Swal.fire({
                    title: "Profesor actualizado con éxito",
                    icon: "success",
                });
                navigate('/dashboard/admin');
            }
        } catch (error) {
            console.error("Error updating teacher:", error.response || error.message);
            Swal.fire({
                title: "Error con la solicitud",
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
                                <h1 className="text-white text-center mb-4">Editar la información de {currentTeacher.nombre} {currentTeacher.apellido}</h1>

                                <div className="row g-5 justify-content-center mb-3">
                                    <div className="col-5">
                                        <label className="form-label text-form">Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTeacher.nombre}
                                            onChange={handleChange} />
                                    </div>
                                    <div className="col-5">
                                        <label className="form-label text-form">Apellido:</label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTeacher.apellido}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row g-5 justify-content-center mb-3">

                                    <div className="col-5">
                                        <label className="form-label text-form">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTeacher.email}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="col-5">
                                        <label className="form-label text-form">Telefono:</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTeacher.telefono}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-3">
                                    <div className="col-10">
                                        <label className="form-label text-form">Direccion:</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            className="form-control rounded-pill"
                                            required
                                            value={currentTeacher.direccion}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-3">
                                    <div className="col-10">
                                        <label className="form-label text-form">Descripcion:</label>
                                        <textarea
                                            type="text"
                                            name="descripcion"
                                            className="form-control teacher-description" rows="3"
                                            required
                                            value={currentTeacher.descripcion}
                                            onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-register me-5"
                                        onClick={() => updateTeacher()}
                                    >Registrar</button>
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
        </div >
    );
};

UpdateTeacher.propTypes = {
    match: PropTypes.object
};

export default UpdateTeacher;