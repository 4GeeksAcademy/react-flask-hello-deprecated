import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, Route, Routes, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import imgWelcome from "../../img/wellcomeicon.png"
import "../../styles/components.css";
import Swal from 'sweetalert2';
import ChatComponent from "../component/chatComponent";
import ProfileForm from "./ProfileForm.jsx"


const FormCommon = ({ type }) => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTest, setSelectedTest] = useState('');
    const [grades, setGrades] = useState({});
    const [formBody, setFormBody] = useState({
        name: '',
        description: '',
        date: '',
        status: '',
        grade: ''
    });

    useEffect(() => {
        const initialGrades = {};
        store.calificaciones.forEach(score => {
            initialGrades[score.estudiante.id] = score.nota;
        });
        setGrades(initialGrades);
    }, [store.calificaciones]);

    useEffect(() => {
        if (type === 'updateEvaluation') {
            setSelectedCourse('');
            setSelectedSubject('');
        }
        if (type === 'updateTest') {
            setSelectedSubject('');
            setSelectedTest('');
        }
    }, [type]);

    const handleChange = (e, studentId) => {
        const { name, value } = e.target;
        setFormBody(prevState => ({ ...prevState, [name]: value }));
        if (name.startsWith('grade-')) {
            setGrades(prevGrades => ({
                ...prevGrades,
                [studentId]: value
            }))
        }

        if (name === 'evaluacion_id') {
            setSelectedTest(value);
            updateGradesForSelectedEvaluation(value);
        }

        if (name === 'grado_id') {
            setSelectedCourse(value);
            setSelectedSubject('');
            setFormBody(prevState => ({ ...prevState, materia_id: '' }));
        }
        if (name === 'materia_id') {
            setSelectedSubject(value);
        }
        if (name === 'evaluacion_id') {
            setSelectedTest(value);
        }
    };

    const filteredEvaluaciones = store.evaluaciones.filter(
        evaluacion => evaluacion.materia.id === parseInt(selectedSubject)
    );

    const updateGradesForSelectedEvaluation = (evaluacionId) => {
        const updatedGrades = {};
        store.calificaciones
            .filter(score => score.evaluacion.id === parseInt(evaluacionId))
            .forEach(score => {
                updatedGrades[score.estudiante.id] = score.nota;
            });

        setGrades(updatedGrades);
    };

    useEffect(() => {
        if (type === 'calificar') {
            actions.setTests();
            console.log('Selected Course:', selectedCourse);
            if (selectedCourse) {
                actions.setGradeStudents(selectedCourse);
            }
        }
        if (type === 'updateEvaluation') {
            actions.setTests();
        }
        if (type === 'updateTest') {
            actions.setScores();
        }
    }, [type, selectedCourse]);

    const handleDeleteScore = async (scoreId) => {
        await actions.scoreOperations('DELETE', ' ', scoreId);
        actions.setScores();
    };

    const handleDeleteTest = async (testId) => {
        await actions.testsOperations('DELETE', ' ', testId);
        actions.setTests();
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setFormBody(prevState => ({ ...prevState, date: date ? date.toISOString().split('T')[0] : '' }));
    };

    const submitFormData = async (event) => {
        event.preventDefault();

        try {
            if (type === 'crear') {
                await actions.testsOperations('POST', {
                    nombre: formBody.name,
                    descripcion: formBody.description,
                    "materia_id": formBody.materia_id,
                    fecha: formBody.date,
                    finalizada: formBody.status === 'finalizada'
                })
            }
            if (type === 'calificar') {
                const estudiantes_notas = store.estudiantes.map(student => ({
                    estudiante_id: parseInt(student.id, 10),
                    nota: parseFloat(grades[student.id]) || 0
                }));
                await actions.scoreOperations('POST', {
                    "materia_id": parseInt(formBody.materia_id, 10),
                    "evaluacion_id": parseInt(formBody.evaluacion_id, 10),
                    "estudiantes_notas": estudiantes_notas
                })
            }
            if (type === 'updateTest') {
                const updateScores = store.calificaciones.map(score => ({
                    estudiante_id: parseInt(score.estudiante.id, 10),
                    nota: parseFloat(grades[score.estudiante.id])
                }))
                await actions.scoreOperations('PUT', {
                    "materia_id": parseInt(formBody.materia_id, 10),
                    "evaluacion_id": parseInt(formBody.evaluacion_id, 10),
                    "estudiantes_notas": updateScores
                }, ' ');

            }
            await actions.setScores();
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormBody({
                name: '',
                description: '',
                date: '',
                status: '',
                grade: '',
                evaluacion_id: '',
                materia_id: ''
            });
            setGrades({});
            setSelectedSubject({});
            setSelectedCourse({});
            setStartDate(new Date());

        } catch (error) {
            console.error("Error submitting data", error)
            Swal.fire({
                title: "Error al registrar los datos",
                icon: "error"
            });
        }
    };

    return (
        <div className="container ms-2">

            <form onSubmit={(e) => submitFormData(e)} className="container-welcome-teacher">
                <h4 className="text-title d-flex justify-content-center mb-4">{`${type === 'crear' ? 'Crear' : type === 'calificar' ? 'Calificar' : type === 'updateEvaluation' ? 'Modificar' : type === 'updateTest' ? 'Actualizar la nota de la' : ''} evaluación`}</h4>

                {/* Formulario para crear evaluaciones */}

                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-form">Nombre:</label>
                    <input type="text" placeholder="Examen parcial..." name="name" className="form-control rounded-pill" required value={formBody.name} onChange={handleChange} />
                </div>}
                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Descripción:</label>
                        <textarea type="text" name="description" placeholder="Descripción del conocimiento que será evaluado..." rows="3" className="form-control teacher-description" required value={formBody.description} onChange={handleChange}></textarea>

                    </div>
                )}
                {type === 'crear' && <div className="mb-3">
                    <div className="d-flex row g-3">
                        <div className="d-flex flex-column col">
                            <label className="form-label text-form">Elige el curso:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill w-100"
                                    name="grado_id"
                                    id="inputGroupSelect04"
                                    onChange={handleChange}>

                                    <option value="" disabled selected>Opciones...</option>

                                    {store.profesorPersonalInfo.grados.map(grado =>
                                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex flex-column col">
                            <label className="form-label text-form">Elige la materia:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill  w-100"
                                    name="materia_id"
                                    id="inputGroupSelect04"
                                    onChange={handleChange}
                                    disabled={!selectedCourse}>

                                    <option value="" disabled selected>Opciones...</option>

                                    {store.profesorPersonalInfo.materias
                                        .filter(materia => materia.grado.id === parseInt(selectedCourse))
                                        .map(materia =>
                                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 col w-100">
                            <label className="form-label text-form">Fecha de evaluación:</label> <br></br>
                            <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                        </div>
                    </div>
                </div>}
                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form me-3">Estado:</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="active" value="pendiente" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="active">Pendiente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="finished" value="finalizada" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="finished">Finalizada</label>
                        </div>
                    </div>
                )}

                {/* Formulario para calificar las evaluaciones */}

                {type === 'calificar' && (
                    <div className="d-flex row g-3">
                        <div className="d-flex flex-column col">
                            <label className="form-label text-form">Elige el curso:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill w-100"
                                    name="grado_id"
                                    id="inputGroupSelect04"
                                    required
                                    onChange={handleChange}>

                                    <option value="" disabled selected>Opciones</option>

                                    {store.profesorPersonalInfo.grados.map(grado =>
                                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 col">
                            <label className="form-label text-form">Elige una materia:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select
                                    className="custom-select rounded-pill w-100"
                                    name="materia_id"
                                    required
                                    disabled={!selectedCourse}
                                    id="inputGroupSelect04">
                                    <option selected>Materia</option>
                                    {store.profesorPersonalInfo.materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 col">
                            <label className="form-label text-form">Selecciona una evaluación:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select
                                    className="custom-select rounded-pill w-100"
                                    name="evaluacion_id"
                                    id="inputGroupSelect04"
                                    required
                                    disabled={!selectedSubject}>
                                    <option selected>Pendientes</option>
                                    {filteredEvaluaciones.map(evaluacion =>
                                        <option key={evaluacion.id} value={evaluacion.id}>{evaluacion.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                    </div>
                )}
                {type === 'calificar' && (
                    <div className="table-styles mt-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.estudiantes.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.nombre}</td>
                                        <td>{student.apellido}</td>
                                        <td>
                                            <input
                                                required
                                                type="number"
                                                name={`grade-${student.id}`}
                                                className="form-control"
                                                value={grades[student.id] || ''}
                                                onChange={(e) => handleChange(e, student.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Formulario para modificar las evaluaciones */}

                {type === 'updateEvaluation' && (
                    <div>
                        <div className="mb-3">
                            <span className="text-white">Para ver la lista de calificaciones, primero selecciona un grado y la materia en las opciones a continuación:</span>
                        </div>
                        <div className="row g-3">
                            <div className="d-flex flex-column col">
                                <label className="form-label text-form">Elige el grado:</label>
                                <div className="input-group" required>
                                    <select
                                        className="custom-select rounded-pill w-100"
                                        name="grado_id"
                                        id="inputGroupSelect04"
                                        onChange={handleChange}>

                                        <option value="" disabled selected>Opciones...</option>

                                        {store.profesorPersonalInfo.grados.map(grado =>
                                            <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 col-6 ">
                                <label className="form-label text-form">Elige una materia:</label> <br></br>

                                <select
                                    className="custom-select rounded-pill w-100"
                                    name="materia_id"
                                    required
                                    disabled={!selectedCourse}
                                    onChange={handleChange}
                                    id="inputGroupSelect04">
                                    onChange={(e) => handleChange(e)}
                                    <option selected>Materia</option>
                                    {store.profesorPersonalInfo.materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>


                        {selectedCourse && selectedSubject && (

                            <div className="table-styles mt-3">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Evaluación</th>
                                            <th scope="col" className="text-center">Descripción</th>
                                            <th scope="col" className="text-center">Fecha</th>
                                            <th scope="col" className="text-center">Estado</th>
                                            <th scope="col" className="text-center">updateTest/Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.evaluaciones
                                            .filter((test) => test.materia.id === parseInt(selectedSubject))
                                            .map((test) => (
                                                <tr key={test.id}>
                                                    <td scope="row" className="w-25">{test.nombre}</td>
                                                    <td className="w-25">{test.descripcion}</td>
                                                    <td className="text-center">{test.fecha}</td>
                                                    <td className="text-center">{test.finalizada}</td>

                                                    <td className="d-flex justify-content-center">
                                                        <Link to={`/update-test/${test.id}`}>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-info me-3"
                                                            >
                                                                <i class="bi bi-pen"></i>
                                                            </button>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => handleDeleteTest(test.id)}>
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )
                }

                {/* Formulario para modificar las notas o calificaciones */}

                {
                    type === 'updateTest' && (
                        <div>
                            <div className="mb-3">
                                <span className="text-white">Para ver la lista de calificaciones, primero selecciona la materia y la evaluación en las opciones a continuación:</span>
                            </div>
                            <div className="row g-3">
                                <div className="mb-3 col-6 ">
                                    <label className="form-label text-form">Elige una materia:</label> <br></br>

                                    <select
                                        className="custom-select rounded-pill w-100"
                                        name="materia_id"
                                        required
                                        onChange={handleChange}
                                        id="inputGroupSelect04">
                                        onChange={(e) => handleChange(e)}
                                        <option selected>Materia</option>
                                        {store.profesorPersonalInfo.materias.map(materia =>
                                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="mb-3 col-6  ">
                                    <label className="form-label text-form me-3">Selecciona una evaluación:</label> <br></br>
                                    <select
                                        className="custom-select rounded-pill w-100"
                                        name="evaluacion_id"
                                        id="inputGroupSelect04"
                                        required
                                        onChange={handleChange}
                                        disabled={!selectedSubject}
                                    >
                                        <option selected>Pendientes</option>
                                        {store.calificaciones
                                            .filter((score) => score.evaluacion.materia.id === parseInt(selectedSubject))
                                            .map(score => score.evaluacion)
                                            .filter((evaluacion, index, self) => index === self.findIndex(e => e.nombre === evaluacion.nombre))
                                            .map(evaluacion =>
                                                <option key={evaluacion.id} value={evaluacion.id}>{evaluacion.nombre}</option>
                                            )}
                                    </select>
                                </div>
                            </div>

                            {selectedSubject && selectedTest && (
                                <div className="table-styles mt-3">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Apellido</th>
                                                <th scope="col" className="text-center">Calificación</th>
                                                <th scope="col" className="text-center">updateTest</th>
                                                <th scope="col" className="text-center">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store.calificaciones
                                                .filter((score) => score.evaluacion.id === parseInt(selectedTest))
                                                .map((score) => (
                                                    <tr key={score.id}>
                                                        <td scope="row" className="w-25">{score.estudiante.nombre}</td>
                                                        <td className="w-25">{score.estudiante.apellido}</td>
                                                        <td className="text-center">{score.nota}</td>
                                                        <td className="text-center w-25">
                                                            <input
                                                                required
                                                                type="number"
                                                                name={`grade-${score.id}`}
                                                                className="form-control text-center"
                                                                value={grades[score.estudiante.id] !== undefined ? grades[score.estudiante.id] : score.nota}
                                                                onChange={(e) => handleChange(e, score.estudiante.id)}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger"
                                                                onClick={() => handleDeleteScore(score.id)}>
                                                                <i class="bi bi-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )
                }

                <div className="d-flex justify-content-center mt-5">
                    {type !== 'updateEvaluation' && (
                        <button type="submit" className="btn btn-outline-register">Registrar</button>
                    )}
                </div>
            </form >
        </div >
    );
};

export const LeftMenuTeacher = () => {
    const location = useLocation()
    const [activeContent, setActiveContent] = useState(null);
    const { store, actions } = useContext(Context)
    const messagingDivRef = useRef(null);
    useEffect(() => {
        if (location.state?.scrollTo === "Mensajería" && messagingDivRef.current) {
            messagingDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const handleCreateEvaluation = () => {
        setActiveContent("crear");
    };

    const handleGradeEvaluation = () => {
        setActiveContent("calificar");
    };

    const handleUpdateEvaluation = () => {
        setActiveContent("updateEvaluation");
    };

    const handleEditGrades = () => {
        setActiveContent("updateTest");
    };

    const handleEditProfile = (edit = true) => {
        setActiveContent(edit ? "profile" : "");
    };

    const renderContent = () => {
        if (location.pathname.includes("profile")) {
            return (<Routes>
                <Route path={"/profile"} element={<ProfileForm user={store.profesorPersonalInfo} />} />
            </Routes>
            )
        }


        switch (activeContent) {
            case "crear":
                return <FormCommon type="crear" />;
            case "calificar":
                return <FormCommon type="calificar" />;
            case "updateEvaluation":
                return <FormCommon type="updateEvaluation" />;
            case "updateTest":
                return <FormCommon type="updateTest" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent mt-2">
                        <div className="container-welcome-teacher d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Siempre es un gusto tenerte de vuelta!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para ingresar o updateTest la información de los estudiantes.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            await actions.getTeacherInfo();

        };
        fetchData();
    }, []);




    return (
        <div className="mt-0">
            <div className="row flex-nowrap mt-5">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 mt-1 px-0 left-menu-background">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
                        <Link to="/dashboard/teacher" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ms-4">M e n ú</span>
                        </Link>
                        <ul className="nav nav-pills list-group flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="list-menu-item mt-4 mb-2 ms-5">
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-card-checklist"></i>
                                    <span className="ms-1 d-none d-sm-inline">Pruebas</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100  ">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleCreateEvaluation}>
                                            <i className="fs-4 bi-file-earmark-plus"></i>
                                            <span className="ms-2 d-none list-menu-item d-sm-inline" >Crear</span>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleGradeEvaluation}>
                                            <i className="fs-4 bi-file-earmark-check"></i>
                                            <span className="ms-2 list-menu-item d-none d-sm-inline" >Calificar</span>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                            <li className="list-menu-item ms-5">
                                <Link to="#submenuupdateTest" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white ">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Editar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenuupdateTest" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleUpdateEvaluation}>
                                            <i class="bi bi-file-earmark-medical"></i>
                                            <span className="ms-2 d-none list-menu-item d-sm-inline" >Pruebas</span>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleEditGrades}>
                                            <i class="bi bi-file-earmark-diff"></i>
                                            <span className="ms-2 list-menu-item d-none d-sm-inline" >Notas</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="list-menu-item">
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-calendar2-date"></i>
                                    <span className="ms-1 d-none d-sm-inline">Eventos</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100 list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline ">Reuniones</span>
                                        </Link>
                                    </li>
                                    <li className="list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline ">Salidas</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="list-menu-item">
                                <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-chat-left-text"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Chat</span>
                                </Link>
                            </li> */}
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="container-fluid render-content col py-3"
                    style={{ backgroundImage: `url(${backgroundForViews})` }}>
                    <div className="container-fluid d-flex flex-column w-100 gap-5">
                        {location.pathname.includes("profile") ? renderContent() :
                            <div className="welcome-message mt-4">
                                {renderContent()}
                            </div>
                        }
                        <div id="Mensajería" ref={messagingDivRef}>
                            {store.isChatVisible && <ChatComponent />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

