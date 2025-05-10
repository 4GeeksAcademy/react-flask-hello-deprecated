import React, { useEffect, useState, useContext } from 'react'
import { Container } from '../ProfileForm.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext.js'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import ShowSubjectTests from '../ShowSubject.jsx'
import { get_student_avg } from '../../functions/clean_parent_data.js'

const Wrapper = styled.div`
margin: 0 auto;
width: 95%;
border: 1px solid white;
border-radius: 28px;
background-color: rgba(100, 149, 237, 0.4);
`

const InfoWrapper = styled.p`
border-radius: 15px;
padding: 1rem;
background: red;
`




const getBaseSubjectInfo = (calificaciones, subject_id) => {
    const minGrade = 10


    if (!calificaciones.length || !subject_id) {
        return {
            teacher: "",
            generalAvg: 0,
            totalTests: 0,
            approvedTests: 0,
            failedTests: 0

        }
    }

    let grades = calificaciones.filter(test => test.id_materia == subject_id).map((calificacion) => calificacion.nota)
    let avg = grades.reduce((a, b) => a + b, 0) / grades.length || 0
    let approved = grades.filter(nota => nota >= minGrade).length

    let teacher = calificaciones[0].profesor

    return {
        teacher: teacher,
        generalAvg: avg.toFixed(2),
        totalTests: grades.length,
        approvedTests: approved,
        failedTests: grades.length - approved

    }
}






const ParentReview = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { studentId, subject } = useParams()
    const [students, setStudents] = useState(null)
    const [studentData, setStudentData] = useState(null)
    const [selectsValue, setSelectsValue] = useState({
        estudiante: "",
        materia: ""
    })
    const [personalRecord, setPersonalRecord] = useState(null)
    const [filters, setFilters] = useState({
        type: "all"
    })
    const [globalAVGInfo, setGloablAVGInfo] = useState([])

    const handleFilterChange = (e) => {
        setFilters({
            type: e.target.name
        })
    }

    const filterTests = (tests) => {
        tests = tests.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

        if (filters.type == "all") {
            return tests
        }

        if (filters.type == "approved") {
            return tests.filter((test) => test.nota >= 10)
        }

        if (filters.type == "failed") {
            return tests.filter((test) => test.nota < 10)
        }
    }
    const handleSelect = (e) => {
        let selectInput = e.target
        let value = selectInput.value
        if (selectInput.name == "estudiante") {
            setStudentData(students.find((obj) => obj.id == value))
            navigate(`/dashboard/parent/review/${value}`);
            setSelectsValue({ ...selectsValue, [selectInput.name]: value, materia: "" })
            setPersonalRecord(null)
        } else {
            setSelectsValue({ ...selectsValue, [selectInput.name]: value })
            setFilters({ type: "all" })
            setPersonalRecord(getBaseSubjectInfo(studentData.calificaciones, value))
            navigate(`/dashboard/parent/review/${studentId}/${value}`)
        }


    }

    useEffect(() => {
        const studentsList = actions.getStudents();
        setStudents(studentsList);
        try {
            if (studentId) {
                let data = actions.getStudentData(studentId)
                setStudentData(data)
                setSelectsValue({ ...selectsValue, estudiante: studentId })
                if (subject) {
                    setSelectsValue({ estudiante: studentId, materia: subject })

                }

            }


        } catch (error) {
            console.error(error)

            Swal.fire({ title: "Ha ocurrido un error", icon: "error", text: error.message })
            setSelectsValue({ ...selectsValue, estudiante: "", materia: "" })
            navigate(`/dashboard/parent/review/`);
        }



    }, [studentId, subject, store.personalInfo])


    useEffect(() => {
        if (studentData) {
            setPersonalRecord(getBaseSubjectInfo(studentData.calificaciones, subject || selectsValue["materia"]))
        }
    }, [studentData, subject])

    useEffect(() => {
        if (students) {
            let promedios = students.map(get_student_avg);
            setGloablAVGInfo(promedios);
        }
    }, [students]);


    return (
        <Container className='container-fluid'>
            <div className='row'>
                <h1 className='text-center'>Revisión</h1>
                <hr className='dropdown-divider' />
            </div>
            <div className="row ">
                <div className="col-md-6 col-sm-12 ">
                    <div className='container-fluid m-0 ms-2 p-0'>
                        <div className="row mb-3">
                            <div className='col-12 mt-2'>
                                <label htmlFor="estudiante" className='ms-3'>Estudiante:</label>
                                <div className='container-fluid ps-3'>

                                    <select name="estudiante" id="selectEstudiante" className='custom-select rounded-pill w-100' value={selectsValue["estudiante"]} onChange={(e) => handleSelect(e)}>
                                        <option value="" disabled >Opciones...</option>
                                        {students ? students.map((estudiante) => (<option key={`${estudiante.nombre}-${estudiante.id}`} value={estudiante.id}>{estudiante.nombre}</option>)
                                        ) : ""}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                studentData ? (<div className='col-12 '>
                                    <div className='container-fluid m-0 p-0'>
                                        <div className='row m-2'>
                                            <div className="col-12">

                                                <div className="d-flex align-items-center">

                                                    <i className="fa-solid fa-graduation-cap"></i>
                                                    <p className='text-center fw-bold fs-5 m-0'>{studentData.nombre}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row fw-light m-2'>
                                            <div className="col-12">
                                                <div className='d-flex gap-2 mb-2'>
                                                    <i className="fa-solid fa-calendar"></i>
                                                    <p className="m-0"> <span className='fw-bold'>Fecha de inscripción:</span> {new Date(studentData.fecha_ingreso).toISOString().split("T")[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row fw-light m-2'>
                                            <div className="col-12">
                                                <div className='d-flex gap-2 mb-2'>
                                                    <i className="fa-regular fa-calendar"></i>
                                                    <p className="m-0"><span className='fw-bold'>Fecha de Nacimiento:</span> {new Date(studentData.fecha_nacimiento).toISOString().split("T")[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row fw-light m-2'>
                                            <div className="col-12">
                                                <div className='d-flex gap-2 mb-2'>
                                                    <i className="fa-solid fa-pen"></i>
                                                    <p className="m-0"> <span className='fw-bold'>Grado:</span> {studentData.grado}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>) : ""}

                        </div>


                    </div>
                </div>
                <div className="col-md-6 col-sm-12" style={{ borderLeft: "1px solid white" }}>
                    {studentData ?
                        (<div className="container-fluid">
                            <div className='row mb-3'>
                                <div className='col-5 mt-2'>
                                    <label htmlFor="materia" className='ms-2'>Materia:</label>
                                    <div className='container-fluid ps-0'>

                                        <select name="materia" id="selectEstudiante" className='custom-select rounded-pill' value={selectsValue["materia"]} onChange={(e) => handleSelect(e)}>
                                            <option value="" disabled >Opciones...</option>
                                            {studentData.materias.map((materia, index) => (<option value={materia[1]} key={`${materia}-${index}`}>{materia[0]}</option>))}
                                        </select>
                                    </div>
                                </div>
                                {personalRecord && (
                                    <div className="col-7 d-flex gap-2 mt-2 align-items-center justify-content-start">

                                        <i className="bi bi-award-fill fs-5" ></i><p className="m-0"> Profesor/a: <br /> {personalRecord.teacher}</p>
                                    </div>)
                                }
                            </div>
                        </div>
                        ) : ""}

                    <div className="row mb-3">

                        {personalRecord ?
                            <div className="col-12">
                                <div className='container-fluid'>
                                    <div className="row">
                                        <div className="col-5 d-flex gap-2 align-items-center">
                                            <i className="bi bi-calculator-fill fs-5"></i><p className="m-0">Promedio: <br /> {personalRecord.generalAvg}  / 10</p>
                                        </div>
                                        <div className="col-7 d-flex gap-2 justify-content-start align-items-center">
                                            <i className="bi bi-body-text fs-5"></i> <p className="m-0">Exámenes: <br /> {personalRecord.totalTests}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-4">

                                        <div className="col-5 d-flex justify-content-start gap-2 align-items-center">
                                            <i className="bi bi-check-circle-fill fs-5" style={{ color: "#37ff37" }}></i><p className="m-0">Exámenes <br />  Aprobados: {personalRecord.approvedTests}</p>
                                        </div>

                                        <div className="col-7 d-flex justify-content-start gap-2 align-items-center">
                                            <i className="bi bi-x-circle-fill text-danger fs-5"></i><p className="m-0">Exámenes <br />  reprobados: {personalRecord.failedTests}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""}
                    </div>
                </div>
                <hr className='dropdown-divider' />

            </div>

            {
                selectsValue["materia"] && personalRecord ? <>
                    {selectsValue["materia"] ? <div className='row'>
                        <div className="col-12 d-flex justify-content-center">

                            <div className='btn-group w-50 mt-3'>
                                <button name='all' className='btn btn-light' onClick={(e) => handleFilterChange(e)}>📊 Todos</button>
                                <button name='approved' className='btn btn-light' onClick={(e) => handleFilterChange(e)} >📈 Aprobados</button>
                                <button name='failed' className='btn btn-light' onClick={(e) => handleFilterChange(e)} >📉 Reprobados</button>
                            </div>
                        </div>
                    </div> : ""}


                    <Wrapper className='mb-4 mt-3'>
                        <div className='container-fluid'>

                            <div className='row d-flex justify-content-between m-3 fw-bold'>
                                <div className='col-4 text-truncate text-start'>Evaluación</div>
                                <div className='col-4 text-truncate text-center'>Avance</div>
                                <div className='col-4 text-truncate text-end'>Nota</div>
                            </div>

                            {
                                filterTests(studentData.calificaciones.filter((evaluacion) => evaluacion.id_materia == selectsValue["materia"]))?.map((test, index) => {
                                    return <div className="col-12" key={`${index}-${test.evaluacion}`}>
                                        <hr className='dropdown-divider' />
                                        <ShowSubjectTests name={test.evaluacion} grade={test.nota} date={test.fecha} description={test.descripcion} key={`${test.evaluacion}-${index}`} />
                                    </div>
                                })
                            }

                        </div>
                    </Wrapper>


                </> : ""
            }
        </Container >
    )
}

export default ParentReview