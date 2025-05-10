import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate, Route, Routes } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import imgWelcome from "../../img/wellcomeicon.png"
import "../../styles/components.css";
import Swal from 'sweetalert2';
import ChatComponent from "../component/chatComponent";
import ProfileForm from "./ProfileForm.jsx";


const FormCommon = ({ type }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { store, actions } = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
    const [formBody, setFormBody] = useState({
        name: '',
        lastName: '',
        date: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        description: '',
        classroomName: '',
        subjectName: '',
        subjectDescription: '',
        representante_id: ''
    });

    useEffect(() => {


        if (type === 'student') {
            actions.getCourses();
            actions.setAllUsers();
        }
        if (type === 'updateStudents') {
            actions.setStudents();
            actions.getCourses();
        }
        if (type === 'updateTeachers') {
            actions.setTeachers();
        }
        if (type === 'addSubject') {
            actions.getCourses();
        }
        if (type === 'assignSubject') {
            actions.setSubjects();
            actions.setTeachers();
        }
    }, [type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBody(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setFormBody(prevState => ({ ...prevState, date: date ? date.toISOString().split('T')[0] : '' }));
    };

    const handleDeleteStudent = async (studentId) => {
        await actions.studentsOperations('DELETE', ' ', studentId);
        actions.setStudents();
    };

    const handleDeleteTeacher = async (teacherId) => {
        await actions.teachersOperations('DELETE', ' ', teacherId);
        actions.setTeachers();
    };



    const submitFormData = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            if (type === 'student') {
                await actions.studentsOperations('POST', {
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "fecha_nacimiento": new Date(formBody.date),
                    "grado_id": formBody.grado_id,
                    "representante_id": formBody.representante_id
                })
            }
            if (type === 'teacher') {
                await actions.teachersOperations('POST', {
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "email": formBody.email,
                    "password": formBody.password,
                    "descripcion": formBody.description,
                    "direccion": formBody.address,
                    "foto": "abc"
                });
            }
            if (type === 'updateStudents') {
                await actions.studentsOperations('PUT', {
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "direccion": formBody.address,
                    "fecha_nacimiento": formBody.date,
                    "grado_id": formBody.grado_id
                }, " ");
            }
            if (type === 'updateTeachers') {
                await actions.teachersOperations('PUT', {
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "email": formBody.email,
                    "telefono": formBody.phone,
                    "descripcion": formBody.description,
                    "direccion": formBody.address,
                }, " ");
            }
            if (type === 'addClassroom') {
                let classroom = formBody.classroomName
                await actions.postCourse({ "nombre": classroom });
            }
            if (type === 'addSubject') {
                await actions.subjectsOperations('POST', {
                    nombre: formBody.subjectName,
                    "grado_id": formBody.grado_id,
                    descripcion: formBody.subjectDescription
                })
            }
            if (type == 'assignSubject') {
                const response = await actions.fetchRoute("docentes/materias", {
                    method: "POST",
                    body: { "id_docente": formBody.id_docente, "id_materia": formBody.id_materia },
                    isPrivate: true,
                    bluePrint: 'admin'
                })
            }
            if (type == 'authorizeUser') {
                await actions.userOperations('POST', { "email": formBody.email, "role_id": formBody.role_id })
            }
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormBody({
                name: '',
                lastName: '',
                date: '',
                email: '',
                password: '',
                address: '',
                description: '',
                phone: '',
                photo: null,
                classroomName: '',
                subjectName: '',
                subjectDescription: ''
            });


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
                <h4 className="text-title d-flex justify-content-center mb-4">{`Registrar ${type === 'student' ? 'estudiante nuevo' : type === 'teacher' ? 'profesor nuevo' : type === 'updateStudents' ? 'actualización de estudiantes' : type === 'updateTeachers' ? 'actualización de profesores' : type === 'addClassroom' ? 'grado nuevo' : type === 'addSubject' ? 'materia nueva' : type === 'assignSubject' ? 'asignación de materia' : type === 'authorizeUser' ? 'autorización de usuario' : ''}`}</h4>
                {/* Formulario con elementos comunes para crear profesor y estudiante */}

                {(type === 'student' || type === 'teacher') &&
                    <form className="row g-3 d-flex justify-content-between mb-3">
                        <div className="col">
                            <label className="form-label text-form">Nombre:</label>
                            <input type="text" name="name" placeholder="Juan" className="form-control rounded-pill" required value={formBody.name} onChange={handleChange} />
                        </div>
                        <div className="col">
                            <label className="form-label text-form">Apellido:</label>
                            <input type="text" name="lastName" placeholder="Pérez" className="form-control rounded-pill" required value={formBody.lastName} onChange={handleChange} />
                        </div>
                    </form>}


                {type === 'student' && <div className="mb-3 ">
                    <div className="row g-3 d-flex">
                        <div className="col-4">
                            <label className="form-label text-form">Fecha de nacimiento:</label> <br></br>
                            <DatePicker selected={startDate} name="date" onChange={handleDateChange} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                        </div>
                        <div className="col-4 d-flex flex-column">
                            <label className="form-label text-form">Asignar un grado:</label>
                            <select className="custom-select rounded-pill" name="grado_id" id="inputGroupSelect04" onChange={handleChange}>
                                <option value="" disabled selected>Opciones</option>
                                {store.grados.map(grado =>
                                    <option key={grado.id} value={grado.id}>{grado.nombre}</option>

                                )}
                            </select>
                        </div>
                        <div className="col-4 d-flex flex-column">
                            <label className="form-label text-form">Representante:</label>
                            <select className="custom-select rounded-pill" name="representante_id" id="inputGroupSelect05" onChange={handleChange}>
                                <option value="" disabled selected>Opciones</option>
                                {store.usuarios
                                    .filter(user => user.role_id === 3)
                                    .map(user =>
                                        <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>

                                    )}
                            </select>
                        </div>
                    </div>

                </div >}

                {/* Elementos específicos del formuario para crear profesor */}

                {
                    type === 'teacher' && (
                        <div className="row g-3 mb-3">
                            <div className="col">
                                <label className="form-label text-form">Contraseña:</label>
                                <input type="password" name="password" placeholder="Al12K09gmo" className="form-control rounded-pill" required value={formBody.password} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className="form-label text-form">Teléfono:</label>
                                <input type="text" name="phone" placeholder="099 278 256" className="form-control rounded-pill" required value={formBody.phone} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className="form-label text-form">Email:</label>
                                <input type="email" name="email" placeholder="mail@example.com" className="form-control rounded-pill" required value={formBody.email} onChange={handleChange} />
                            </div>
                        </div>
                    )
                }

                {
                    (type === 'teacher' || type === 'teacher') && <div className="mb-3">
                        <label className="form-label text-form">Dirección:</label>
                        <input type="text" name="address" placeholder="Calle 123 y los Álamos" className="form-control rounded-pill" required value={formBody.address} onChange={handleChange} />
                    </div>
                }

                {
                    type === 'teacher' && (
                        <div className="mb-3">
                            <label className="form-label text-form">Descripción:</label>
                            <textarea name="description" placeholder="Profesor de x con amplia experiencia académica y profesional." className="form-control teacher-description" rows="3" required value={formBody.description} onChange={handleChange}></textarea>
                        </div>
                    )
                }

                {/* Vista para editar estudiantes */}

                {
                    type === 'updateStudents' && (
                        <div className="table-styles mt-3">
                            <table className="table table-hover">
                                <thead >
                                    <tr >
                                        <th className="text-center">Nombre</th>
                                        <th className="text-center">Apellido</th>
                                        <th className="text-center">Grado</th>
                                        <th className="text-center">Fecha de nacimiento</th>
                                        <th className="text-center">Editar/Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.estudiantes.map(student => (
                                        <tr key={student.id}>
                                            <td className="text-center">{student.nombre}</td>
                                            <td className="text-center">{student.apellido}</td>
                                            <td className="text-center">{student.grado.nombre}</td>
                                            <td className="text-center">{student.fecha_nacimiento}</td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/update-student/${student.id}`}>
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
                                                    onClick={() => handleDeleteStudent(student.id)}>
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }


                {/* Vista para editar profesores */}

                {
                    type === 'updateTeachers' && (
                        <div className="table-styles mt-3">
                            <table className="table table-hover ">
                                <thead className="table-design">
                                    <tr>
                                        <th className="text-center">Nombre</th>
                                        <th className="text-center">Apellido</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Teléfono</th>
                                        <th className="text-center">Dirección</th>
                                        <th className="text-center">Descripción</th>
                                        <th className="text-center">Editar/Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody className="table-design">
                                    {store.profesores.map(profesor => (
                                        <tr key={profesor.id}>
                                            <td>{profesor.nombre}</td>
                                            <td>{profesor.apellido}</td>
                                            <td>{profesor.email}</td>
                                            <td>{profesor.telefono}</td>
                                            <td>{profesor.direccion}</td>
                                            <td>{profesor.descripcion}</td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/update-teacher/${profesor.id}`}>
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
                                                    onClick={() => handleDeleteTeacher(profesor.id)}>
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {/* Formulario para añadir grados */}

                {
                    type === "addClassroom" && (
                        <div className="mb-3">
                            <label className="form-label text-title">Ingresa un nombre para crear un nuevo grado:</label>
                            <input type="text" name="classroomName" className="form-control rounded-pill" required value={formBody.classroomName} placeholder="1er Grado..." onChange={(e) => handleChange(e)} />
                        </div>
                    )
                }

                {/* Formulario para añadir materias */}

                {
                    type === "addSubject" && (
                        <div className="row g-3 justify-content-center mb-3">
                            <div className="col-4 d-flex flex-column">
                                <label className="form-label text-title">Selecciona un grado:</label>
                                <select className="custom-select rounded-pill" name="grado_id" id="inputGroupSelect04" onChange={handleChange}>
                                    <option value="" disabled selected>Opciones...</option>
                                    {store.grados.map(grado =>
                                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>

                                    )}
                                </select>

                            </div>
                            <div className="col-6">
                                <label className="form-label text-title">Ingresa el nombre de la materia:</label>
                                <input type="text" name="subjectName" className="form-control rounded-pill" required value={formBody.subjectName} onChange={handleChange} />
                            </div>
                        </div>
                    )
                }

                {
                    type === "addSubject" && (

                        <div className="row justify-content-center mb-3">
                            <div className="col-10">
                                <label className="form-label text-title mt-3">Escribe una descripción simple para la materia:</label>
                                <textarea name="subjectDescription" className="form-control teacher-description" rows="5" required value={formBody.subjectDescription} onChange={(e) => handleChange(e)}></textarea>
                            </div>
                        </div>

                    )
                }

                {/* Formulario para asignar materias a profesores */}

                {
                    type === "assignSubject" && (
                        <div className="row g-3 justify-content-center mb-5">
                            <div className="col-5 d-flex flex-column">
                                <label className="form-label text-title">Selecciona un profesor:</label>
                                <select name="id_docente" required className="custom-select rounded-pill" id="inputGroupSelect04" onChange={handleChange}>
                                    <option value="" disabled selected>Opciones...</option>
                                    {store.profesores.map(profesor =>
                                        <option key={profesor.id} value={profesor.id}>{profesor.nombre + " " + profesor.apellido}</option>
                                    )}
                                </select>
                            </div>

                            <div className="col-5 d-flex flex-column">
                                <label className="form-label text-title">Selecciona una materia:</label>
                                <select name="id_materia" required className="custom-select rounded-pill" id="inputGroupSelect04" onChange={handleChange}>
                                    <option value="" disabled selected>Opciones...</option>
                                    {store.materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    )
                }

                {/* Formulario para autorizar usuarios */}

                {
                    type === "authorizeUser" && (
                        <div className="mb-3">
                            <div className="d-flex flex-column ms-4">
                                <label className="form-label text-title">Ingresa el correo del usuario:</label>
                                <input type="email" name="email" className="form-control rounded-pill" required value={formBody.email} onChange={handleChange} />
                            </div>
                        </div>
                    )
                }

                <div className="d-flex justify-content-center mt-5">
                    {type !== "updateStudents" && type !== "updateTeachers" && (
                        <button type="submit" className="btn btn-outline-register">Registrar</button>
                    )}
                </div>
            </form >
        </div >
    );
};

export const LeftMenuAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeContent, setActiveContent] = useState(null);
    const { store, actions } = useContext(Context)
    const messagingDivRef = useRef(null);
    useEffect(() => {
        if (location.state?.scrollTo === "Mensajería" && messagingDivRef.current) {
            messagingDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const handleStudentRegisterForm = () => {
        setActiveContent("estudiantes");
    };

    const handleTeacherRegisterForm = () => {
        setActiveContent("profesores");
    };

    const handleUpdateStudentForm = () => {
        setActiveContent("updateStudents");
    }

    const handleUpdateTeacherForm = () => {
        setActiveContent("updateTeachers");
    }

    const handleAddClassroomForm = () => {
        setActiveContent("addClassroom");
    };

    const handleAddSubjectForm = () => {
        setActiveContent("addSubject");
    };

    const handleAssignSubjectForm = () => {
        setActiveContent("assignSubject");
    }

    const handleAuthorizeUser = () => {
        setActiveContent("authorizeUser");
    }

    const renderContent = () => {
        if (location.pathname.includes("profile")) {
            return (<Routes>
                <Route path={"/profile"} element={<ProfileForm user={store.personalInfo} />} />
            </Routes>
            )
        }

        switch (activeContent) {
            case "estudiantes":
                return <FormCommon type="student" />;
            case "profesores":
                return <FormCommon type="teacher" />;
            case "updateStudents":
                return <FormCommon type="updateStudents" />;
            case "updateTeachers":
                return <FormCommon type="updateTeachers" />;
            case "addClassroom":
                return <FormCommon type="addClassroom" />;
            case "addSubject":
                return <FormCommon type="addSubject" />;
            case "assignSubject":
                return <FormCommon type="assignSubject" />;
            case "authorizeUser":
                return <FormCommon type="authorizeUser" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent">
                        <div className="container-welcome-teacher py-5 d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Qué bueno verte de regreso!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para editar la información de los estudiantes y el profesorado.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };


    useEffect(() => {
        const fetchPersonalData = async () => {
            await actions.getAdminInfo()

        }

        if (!store.personalInfo) {
            fetchPersonalData()
        }

    }, [store.personalInfo])


    useEffect(() => {

        if (location.pathname != "/dashboard/admin/") {
            navigate("/dashboard/admin/")
        }


    }, [activeContent])

    return (
        <div className="mt-0">
            <div className="row flex-nowrap mt-5" >
                <div className="col-auto col-md-3 col-xl-2 mt-1 px-sm-2 px-0 left-menu-background">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="list-menu-item">
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-save2"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Crear</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleStudentRegisterForm}>
                                            <i className="fs-4 bi-mortarboard"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleTeacherRegisterForm}>
                                            <i className="fs-4 bi-person-add"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-menu-item">
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Editar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenuEditar" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleUpdateStudentForm}>
                                            <i className="fs-4 bi-mortarboard" ></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" >Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleUpdateTeacherForm}>
                                            <i className="fs-4 bi-person-add" ></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-menu-item">
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-book"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Grados</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleAddClassroomForm}>
                                            <i className="fs-4 bi-plus-square"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Añadir</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleAddSubjectForm}>
                                            <i className="fs-4 bi-journal-plus"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Materias</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleAssignSubjectForm}>
                                            <i className="fs-4 bi-pin-angle"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Asignar</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-menu-item">
                                <Link to="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white" onClick={handleAuthorizeUser}>
                                    <i className="fs-4 bi-person-check"></i>
                                    <span className="ms-1 d-none d-sm-inline" >Validar</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="render-content container-fluid col py-3 "
                    style={{ backgroundImage: `url(${backgroundForViews})`, backgroundSize: "cover" }}>
                    <div className="container-fluid">
                        {location.pathname.includes("profile") ? renderContent() :
                            <div className="welcome-message mt-4 ms-auto me-auto ">
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

